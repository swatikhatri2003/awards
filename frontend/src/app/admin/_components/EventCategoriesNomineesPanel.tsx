"use client";

import React from "react";
import styles from "../../actions/led-kiosk.module.css";
import { adminAuthHeader } from "../../_lib/adminAuthSession";
import { resolveNomineePhotoUrl } from "../../_lib/resolveImageUrl";

type Category = {
  category_id: number;
  name: string;
  winner_nominee_id: number | null;
  event_id?: number | null;
};

type Nominee = {
  nominee_id: number;
  photo: string;
  name: string;
  description?: string | null;
  category_id: number;
  votes: number;
};

function IconPencil(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden {...props}>
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

export function EventCategoriesNomineesPanel(props: {
  mode: "categories" | "nominees";
  eventId: number;
  eventTitle: string;
  apiBase: string;
  apiOrigin: string;
  token: string;
  onBack: () => void;
  onGoCategories?: () => void;
}) {
  const { mode, eventId, eventTitle, apiBase, apiOrigin, token, onBack, onGoCategories } = props;

  const [adminCategories, setAdminCategories] = React.useState<Category[]>([]);
  const [adminNominees, setAdminNominees] = React.useState<Nominee[]>([]);
  const [adminLoading, setAdminLoading] = React.useState(false);
  const [adminError, setAdminError] = React.useState<string | null>(null);
  const [adminCategoryNameDraft, setAdminCategoryNameDraft] = React.useState("");
  const [adminNewCategoryName, setAdminNewCategoryName] = React.useState("");
  const [adminNomineeForm, setAdminNomineeForm] = React.useState({ name: "", photo: "", description: "" });
  const [adminCategoryEditId, setAdminCategoryEditId] = React.useState<number | null>(null);
  const [addCategoryOpen, setAddCategoryOpen] = React.useState(mode === "categories");
  const [nomineeModalCategoryId, setNomineeModalCategoryId] = React.useState<number | null>(null);
  const [viewNomineesCategoryId, setViewNomineesCategoryId] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (mode !== "nominees" || adminCategories.length === 0) return;
    setViewNomineesCategoryId((prev) => {
      if (prev != null && adminCategories.some((c) => c.category_id === prev)) return prev;
      return adminCategories[0]?.category_id ?? null;
    });
  }, [mode, adminCategories]);
  const [nomineeInlineEdit, setNomineeInlineEdit] = React.useState<{
    nominee_id: number;
    name: string;
    photo: string;
    description: string;
  } | null>(null);
  const [inlinePhotoBlobUrl, setInlinePhotoBlobUrl] = React.useState<string | null>(null);
  const [adminPhotoUploading, setAdminPhotoUploading] = React.useState(false);
  const [nomineePhotoBlobUrl, setNomineePhotoBlobUrl] = React.useState<string | null>(null);

  const loadAdminData = React.useCallback(async () => {
    setAdminLoading(true);
    setAdminError(null);
    try {
      const [catsRes, nomsRes] = await Promise.all([
        fetch(`${apiBase}/categories?eventId=${eventId}`),
        fetch(`${apiBase}/nominees?eventId=${eventId}`),
      ]);
      const catsData = await catsRes.json().catch(() => null);
      const nomsData = await nomsRes.json().catch(() => null);
      if (!catsRes.ok) throw new Error(catsData?.error || "CATEGORIES_FAILED");
      if (!nomsRes.ok) throw new Error(nomsData?.error || "NOMINEES_FAILED");

      const rawCats = Array.isArray(catsData?.categories) ? (catsData.categories as Category[]) : [];
      const hasEventCol = rawCats.some((c) => c?.event_id != null && Number.isFinite(Number(c.event_id)));
      const nextCats = hasEventCol ? rawCats.filter((c) => Number(c?.event_id) === eventId) : rawCats;
      setAdminCategories(nextCats);
      setAdminNominees(Array.isArray(nomsData?.nominees) ? (nomsData.nominees as Nominee[]) : []);
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "ADMIN_LOAD_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }, [eventId, apiBase]);

  React.useEffect(() => {
    void loadAdminData();
  }, [loadAdminData]);

  const adminCategoryBeingEdited = React.useMemo(
    () => (adminCategoryEditId ? adminCategories.find((c) => c.category_id === adminCategoryEditId) : undefined),
    [adminCategoryEditId, adminCategories],
  );

  const nomineesForCategory = React.useCallback(
    (categoryId: number) =>
      adminNominees
        .filter((n) => Number(n?.category_id) === categoryId)
        .slice()
        .sort((a, b) => Number(a.nominee_id) - Number(b.nominee_id)),
    [adminNominees],
  );

  React.useEffect(() => {
    if (!adminCategoryBeingEdited) return;
    setAdminCategoryNameDraft(adminCategoryBeingEdited.name || "");
  }, [adminCategoryBeingEdited]);

  const revokeNomineePhotoBlob = React.useCallback(() => {
    setNomineePhotoBlobUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }, []);

  React.useEffect(() => {
    return () => {
      setNomineePhotoBlobUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    };
  }, []);

  async function adminCreateCategory() {
    const name = adminNewCategoryName.trim();
    if (!name) return;
    setAdminLoading(true);
    setAdminError(null);
    try {
      const res = await fetch(`${apiBase}/admin/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
        body: JSON.stringify({ name, eventId }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "CREATE_CATEGORY_FAILED");
      setAdminNewCategoryName("");
      setAddCategoryOpen(false);
      await loadAdminData();
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "CREATE_CATEGORY_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }

  async function adminUpdateCategory() {
    if (!adminCategoryEditId) return;
    const name = adminCategoryNameDraft.trim();
    if (!name) return;
    const keepWinner = adminCategoryBeingEdited?.winner_nominee_id;
    const winnerVal =
      keepWinner != null && Number.isFinite(Number(keepWinner)) && Number(keepWinner) > 0
        ? Number(keepWinner)
        : null;
    setAdminLoading(true);
    setAdminError(null);
    try {
      const res = await fetch(`${apiBase}/admin/categories/${adminCategoryEditId}?eventId=${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
        body: JSON.stringify({ name, winner_nominee_id: winnerVal }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "UPDATE_CATEGORY_FAILED");
      setAdminCategoryEditId(null);
      await loadAdminData();
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "UPDATE_CATEGORY_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }

  function closeNomineeModal() {
    revokeNomineePhotoBlob();
    setNomineeModalCategoryId(null);
    setAdminNomineeForm({ name: "", photo: "", description: "" });
  }

  async function adminSaveNominee() {
    if (!nomineeModalCategoryId) return;
    const name = adminNomineeForm.name.trim();
    if (!name) return;
    setAdminLoading(true);
    setAdminError(null);
    try {
      const res = await fetch(`${apiBase}/admin/nominees?eventId=${eventId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
        body: JSON.stringify({
          name,
          photo: adminNomineeForm.photo.trim(),
          description: adminNomineeForm.description.trim() || undefined,
          category_id: nomineeModalCategoryId,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "SAVE_NOMINEE_FAILED");
      closeNomineeModal();
      await loadAdminData();
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "SAVE_NOMINEE_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }

  async function saveNomineeInline() {
    if (!nomineeInlineEdit) return;
    const name = nomineeInlineEdit.name.trim();
    if (!name) return;
    const cat = adminNominees.find((n) => n.nominee_id === nomineeInlineEdit.nominee_id);
    const category_id = cat ? Number(cat.category_id) : null;
    if (category_id == null || !Number.isFinite(category_id)) {
      setAdminError("SAVE_NOMINEE_FAILED");
      return;
    }
    setAdminLoading(true);
    setAdminError(null);
    try {
      const res = await fetch(`${apiBase}/admin/nominees/${nomineeInlineEdit.nominee_id}?eventId=${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
        body: JSON.stringify({
          name,
          photo: nomineeInlineEdit.photo.trim(),
          description: nomineeInlineEdit.description.trim() || null,
          category_id,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "SAVE_NOMINEE_FAILED");
      if (inlinePhotoBlobUrl) URL.revokeObjectURL(inlinePhotoBlobUrl);
      setInlinePhotoBlobUrl(null);
      setNomineeInlineEdit(null);
      await loadAdminData();
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "SAVE_NOMINEE_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }

  async function adminUploadNomineePhoto(file: File, uploadMode: "modal" | "inline" = "modal") {
    setAdminPhotoUploading(true);
    setAdminError(null);
    try {
      const fd = new FormData();
      fd.append("photo", file);
      const res = await fetch(`${apiBase}/uploads/nominee-photo`, { method: "POST", body: fd });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "PHOTO_UPLOAD_FAILED");
      const filename = String(data?.filename || "");
      if (!filename) throw new Error("PHOTO_UPLOAD_FAILED");
      if (uploadMode === "modal") {
        revokeNomineePhotoBlob();
        setAdminNomineeForm((p) => ({ ...p, photo: filename }));
      } else {
        setNomineeInlineEdit((p) => (p ? { ...p, photo: filename } : null));
      }
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "PHOTO_UPLOAD_FAILED");
    } finally {
      setAdminPhotoUploading(false);
    }
  }

  const panelTitle = mode === "categories" ? "Categories" : "Nominees";

  return (
    <div className="panel" style={{ marginBottom: "2rem" }}>
      <div className="back-row" style={{ marginBottom: "1rem" }}>
        <button type="button" className="back-link" onClick={onBack}>
          ← Event details
        </button>
      </div>

      <div className={styles.adminCatToolbar} style={{ marginBottom: 14 }}>
        <div>
          <div className="panel-title" style={{ marginBottom: 4 }}>{panelTitle}</div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>{eventTitle}</p>
        </div>
        <span style={{ fontSize: 13, color: "var(--text-faint)" }}>
          {adminLoading ? "Loading…" : mode === "categories" ? `${adminCategories.length} categories` : `${adminNominees.length} nominees`}
        </span>
      </div>

      {adminError ? <div className="error-box" style={{ marginBottom: 12 }}>{adminError}</div> : null}

      {mode === "categories" ? (
        <div className={styles.adminCategoriesBlock} style={{ marginTop: 0 }}>
          <div className={styles.adminCatToolbar}>
            <span className="section-title" style={{ marginBottom: 0, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
              All categories
            </span>
            <button
              type="button"
              className="btn"
              onClick={() => setAddCategoryOpen((o) => !o)}
              aria-expanded={addCategoryOpen}
            >
              {addCategoryOpen ? "Close" : "Add category"}
            </button>
          </div>

          {addCategoryOpen ? (
            <div className={styles.adminAddCategoryBar}>
              <input
                className={`input ${styles.inputGrow}`}
                value={adminNewCategoryName}
                placeholder="New category name"
                onChange={(e) => setAdminNewCategoryName(e.target.value)}
                disabled={adminLoading}
                aria-label="New category name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") void adminCreateCategory();
                }}
              />
              <button
                type="button"
                className={`${styles.adminIconBtn} ${styles.adminIconBtnPrimary}`}
                onClick={adminCreateCategory}
                disabled={adminLoading || !adminNewCategoryName.trim()}
                aria-label="Create category"
                title="Save category"
              >
                <IconCheck />
              </button>
            </div>
          ) : null}

          {adminCategories.length === 0 && !adminLoading ? (
            <p className="hint" style={{ textAlign: "left", padding: "1rem 0" }}>No categories yet — use Add category above.</p>
          ) : null}

          <div className={styles.adminCategoryList}>
            {adminCategories.map((c) => {
              const editingCat = adminCategoryEditId === c.category_id;
              return (
                <div key={c.category_id} className={styles.adminCategoryRow}>
                  {editingCat ? (
                    <div className={styles.adminCategoryEditBar}>
                      <input
                        className="input"
                        value={adminCategoryNameDraft}
                        onChange={(e) => setAdminCategoryNameDraft(e.target.value)}
                        placeholder="Category name"
                        disabled={adminLoading}
                      />
                      <button
                        type="button"
                        className={`${styles.adminIconBtn} ${styles.adminIconBtnPrimary}`}
                        onClick={adminUpdateCategory}
                        disabled={adminLoading}
                        aria-label="Save category"
                      >
                        <IconCheck />
                      </button>
                      <button
                        type="button"
                        className={styles.adminIconBtn}
                        onClick={() => setAdminCategoryEditId(null)}
                        disabled={adminLoading}
                        aria-label="Cancel"
                      >
                        <IconX />
                      </button>
                    </div>
                  ) : (
                    <div className={styles.adminCategoryRowMain}>
                      <div className={styles.adminCategoryTitleWrap}>
                        <span style={{ fontSize: 15, fontWeight: 600, whiteSpace: "normal" }}>{c.name}</span>
                        {c.winner_nominee_id ? (
                          <span className="event-badge badge-public" style={{ marginLeft: 8 }}>Winner set</span>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        className={styles.adminIconBtn}
                        onClick={() => setAdminCategoryEditId(c.category_id)}
                        aria-label="Edit category"
                        title="Edit category"
                      >
                        <IconPencil />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.adminCategoriesBlock} style={{ marginTop: 0 }}>
          {adminCategories.length === 0 && !adminLoading ? (
            <div>
              <p className="hint" style={{ textAlign: "left", padding: "0.5rem 0 1rem" }}>
                Add categories first, then add nominees under each category.
              </p>
              {onGoCategories ? (
                <button type="button" className="btn" onClick={onGoCategories}>
                  Go to categories
                </button>
              ) : null}
            </div>
          ) : (
            <div className={styles.adminCategoryList}>
              {adminCategories.map((c) => {
                const noms = nomineesForCategory(c.category_id);
                const viewOpen = viewNomineesCategoryId === c.category_id;
                return (
                  <div key={c.category_id} className={styles.adminCategoryRow}>
                    <div
                      className={styles.adminCategoryRowMain}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setViewNomineesCategoryId((id) => (id === c.category_id ? null : c.category_id));
                        setNomineeInlineEdit(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setViewNomineesCategoryId((id) => (id === c.category_id ? null : c.category_id));
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={viewOpen}
                    >
                      <div className={styles.adminCategoryTitleWrap}>
                        <span style={{ fontSize: 15, fontWeight: 600, whiteSpace: "normal" }}>{c.name}</span>
                        <span style={{ marginLeft: 8, fontSize: 12, color: "var(--text-faint)" }}>
                          {noms.length} nominee{noms.length === 1 ? "" : "s"}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="btn"
                        style={{ flexShrink: 0 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          revokeNomineePhotoBlob();
                          setAdminNomineeForm({ name: "", photo: "", description: "" });
                          setNomineeModalCategoryId(c.category_id);
                          setViewNomineesCategoryId(c.category_id);
                        }}
                      >
                        Add nominee
                      </button>
                    </div>

                    {viewOpen || noms.length > 0 ? (
                      <div className={styles.adminNomineeDropdown} role="region" aria-label={`Nominees in ${c.name}`}>
                        {noms.map((n) => {
                          const thumb = resolveNomineePhotoUrl(apiOrigin, n.photo);
                          const editing = nomineeInlineEdit?.nominee_id === n.nominee_id;
                          return (
                            <div key={n.nominee_id} className={styles.adminNomineeCard}>
                              {editing && nomineeInlineEdit ? (
                                <div className={styles.adminNomineeCardEdit}>
                                  <input
                                    className="input"
                                    value={nomineeInlineEdit.name}
                                    onChange={(e) =>
                                      setNomineeInlineEdit((p) => (p ? { ...p, name: e.target.value } : null))
                                    }
                                    placeholder="Name"
                                    disabled={adminLoading}
                                  />
                                  <textarea
                                    className="input"
                                    value={nomineeInlineEdit.description}
                                    onChange={(e) =>
                                      setNomineeInlineEdit((p) => (p ? { ...p, description: e.target.value } : null))
                                    }
                                    placeholder="Description"
                                    style={{ minHeight: 72, resize: "vertical" }}
                                    disabled={adminLoading}
                                  />
                                  <input
                                    className="input"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const f = e.currentTarget.files?.[0];
                                      if (!f) return;
                                      setInlinePhotoBlobUrl((prev) => {
                                        if (prev) URL.revokeObjectURL(prev);
                                        return URL.createObjectURL(f);
                                      });
                                      void adminUploadNomineePhoto(f, "inline");
                                    }}
                                    disabled={adminLoading || adminPhotoUploading}
                                  />
                                  {(() => {
                                    const serverSrc = nomineeInlineEdit.photo.trim()
                                      ? resolveNomineePhotoUrl(apiOrigin, nomineeInlineEdit.photo)
                                      : "";
                                    const previewSrc = inlinePhotoBlobUrl || serverSrc;
                                    return previewSrc ? (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img className={styles.adminNomineeCardPhoto} src={previewSrc} alt="" />
                                    ) : null;
                                  })()}
                                  <div className={styles.adminNomineeCardActions}>
                                    <button
                                      type="button"
                                      className={`${styles.adminIconBtn} ${styles.adminIconBtnPrimary}`}
                                      onClick={saveNomineeInline}
                                      disabled={adminLoading}
                                      aria-label="Save nominee"
                                    >
                                      <IconCheck />
                                    </button>
                                    <button
                                      type="button"
                                      className={styles.adminIconBtn}
                                      onClick={() => {
                                        setNomineeInlineEdit(null);
                                        if (inlinePhotoBlobUrl) {
                                          URL.revokeObjectURL(inlinePhotoBlobUrl);
                                          setInlinePhotoBlobUrl(null);
                                        }
                                      }}
                                      disabled={adminLoading}
                                      aria-label="Cancel"
                                    >
                                      <IconX />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className={styles.adminNomineeCardRead}>
                                  <div className={styles.adminNomineeCardLeft}>
                                    {thumb ? (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img className={styles.adminNomineeCardPhoto} src={thumb} alt="" />
                                    ) : (
                                      <div className={styles.adminNomineeCardPhotoPlaceholder} aria-hidden />
                                    )}
                                    <div className={styles.adminNomineeCardText}>
                                      <div style={{ fontSize: 15, fontWeight: 600, whiteSpace: "normal" }}>{n.name}</div>
                                      {n.description ? (
                                        <p className={styles.adminNomineeDesc}>{n.description}</p>
                                      ) : (
                                        <p className="hint" style={{ margin: "6px 0 0" }}>No description</p>
                                      )}
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    className={styles.adminIconBtn}
                                    onClick={() => {
                                      setNomineeInlineEdit({
                                        nominee_id: n.nominee_id,
                                        name: n.name || "",
                                        photo: n.photo || "",
                                        description: n.description || "",
                                      });
                                      setInlinePhotoBlobUrl((prev) => {
                                        if (prev) URL.revokeObjectURL(prev);
                                        return null;
                                      });
                                    }}
                                    aria-label={`Edit ${n.name}`}
                                    title="Edit nominee"
                                  >
                                    <IconPencil />
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="hint" style={{ padding: "0 14px 12px", margin: 0, fontSize: 12, textAlign: "left" }}>
                        No nominees in this category yet — use Add nominee.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {nomineeModalCategoryId !== null ? (
        <div
          className={styles.adminModalBackdrop}
          role="presentation"
          onClick={closeNomineeModal}
          onKeyDown={(e) => e.key === "Escape" && closeNomineeModal()}
        >
          <div
            className={styles.adminModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-add-nominee-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.adminModalHead}>
              <h2 id="admin-add-nominee-title" className={styles.adminModalTitle}>
                Add nominee
              </h2>
              <button type="button" className={styles.adminIconBtn} onClick={closeNomineeModal} aria-label="Close">
                <IconX />
              </button>
            </div>
            <div className="field" style={{ marginBottom: 12 }}>
              <div className="label">Name</div>
              <input
                className="input"
                value={adminNomineeForm.name}
                onChange={(e) => setAdminNomineeForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Nominee name"
                disabled={adminLoading}
              />
            </div>
            <div className="field" style={{ marginBottom: 12 }}>
              <div className="label">Photo</div>
              <input
                className="input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.currentTarget.files?.[0];
                  if (!f) return;
                  setNomineePhotoBlobUrl((prev) => {
                    if (prev) URL.revokeObjectURL(prev);
                    return URL.createObjectURL(f);
                  });
                  void adminUploadNomineePhoto(f, "modal");
                }}
                disabled={adminLoading || adminPhotoUploading}
              />
              {adminPhotoUploading ? (
                <p className="hint" style={{ marginTop: 8 }}>Uploading…</p>
              ) : null}
              {(() => {
                const serverSrc = adminNomineeForm.photo.trim()
                  ? resolveNomineePhotoUrl(apiOrigin, adminNomineeForm.photo)
                  : "";
                const previewSrc = nomineePhotoBlobUrl || serverSrc;
                return previewSrc ? (
                  <div style={{ marginTop: 10 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={styles.previewPhoto} src={previewSrc} alt="" />
                  </div>
                ) : null;
              })()}
            </div>
            <div className="field" style={{ marginBottom: 12 }}>
              <div className="label">Description (optional)</div>
              <textarea
                className="input"
                value={adminNomineeForm.description}
                onChange={(e) => setAdminNomineeForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="Short description"
                style={{ minHeight: 88, resize: "vertical" }}
                disabled={adminLoading}
              />
            </div>
            <div className={styles.adminModalFooter}>
              <button type="button" className="btn btn-ghost" onClick={closeNomineeModal} disabled={adminLoading}>
                Cancel
              </button>
              <button type="button" className="btn" onClick={adminSaveNominee} disabled={adminLoading}>
                Add nominee
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
