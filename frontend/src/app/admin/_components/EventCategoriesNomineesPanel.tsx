"use client";

import React from "react";
import styles from "../../actions/led-kiosk.module.css";
import { adminAuthHeader } from "../../_lib/adminAuthSession";
import { resolveNomineePhotoUrl } from "../../_lib/resolveImageUrl";
import { Breadcrumb } from "../../_components/Breadcrumb";
import { AdminModal } from "./AdminModal";
import { AdminNomineeCard } from "./AdminNomineeCard";
import Box from "@mui/material/Box";

type Category = {
  category_id: number;
  name: string;
  winner_nominee_id: number | null;
  event_id?: number | null;
  show_nominee?: number | boolean | null;
  declare_result?: number | boolean | null;
};

function categoryShowsNominees(c: Category): boolean {
  return c.show_nominee === true || c.show_nominee === 1;
}

function categoryDeclaresResult(c: Category): boolean {
  return c.declare_result === true || c.declare_result === 1;
}

type Nominee = {
  nominee_id: number;
  photo: string;
  name: string;
  description?: string | null;
  category_id: number;
  votes: number;
  is_approved?: number | boolean | null;
};

function isApproved(n: Nominee): boolean {
  return n.is_approved === true || n.is_approved === 1;
}

function IconPencil(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconTrash(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 11v6M14 11v6" strokeLinecap="round" />
    </svg>
  );
}

type CategoryModalState = null | { mode: "add" } | { mode: "edit"; categoryId: number };
type NomineeModalState = null | { mode: "add" } | { mode: "edit"; nomineeId: number };

const emptyNomineeForm = () => ({
  name: "",
  photo: "",
  description: "",
  category_id: 0,
});

export function EventCategoriesNomineesPanel(props: {
  mode: "categories" | "nominees";
  eventId: number;
  eventTitle: string;
  apiBase: string;
  apiOrigin: string;
  token: string;
  onBack: () => void;
  onGoList?: () => void;
  onGoCategories?: () => void;
  onEventDeclareResultChange?: (next: boolean) => void;
}) {
  const { mode, eventId, eventTitle, apiBase, apiOrigin, token, onBack, onGoList, onGoCategories, onEventDeclareResultChange } = props;

  const [adminCategories, setAdminCategories] = React.useState<Category[]>([]);
  const [adminNominees, setAdminNominees] = React.useState<Nominee[]>([]);
  const [adminLoading, setAdminLoading] = React.useState(false);
  const [adminError, setAdminError] = React.useState<string | null>(null);

  const [categoryModal, setCategoryModal] = React.useState<CategoryModalState>(null);
  const [categoryNameDraft, setCategoryNameDraft] = React.useState("");

  const [nomineeModal, setNomineeModal] = React.useState<NomineeModalState>(null);
  const [nomineeForm, setNomineeForm] = React.useState(emptyNomineeForm);

  const [filterCategoryId, setFilterCategoryId] = React.useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const [nomineePhotoBlobUrl, setNomineePhotoBlobUrl] = React.useState<string | null>(null);
  const [adminPhotoUploading, setAdminPhotoUploading] = React.useState(false);
  const [showNomineeSavingId, setShowNomineeSavingId] = React.useState<number | null>(null);
  const [declareResultSavingId, setDeclareResultSavingId] = React.useState<number | null>(null);

  const categoryById = React.useMemo(() => {
    const m = new Map<number, Category>();
    for (const c of adminCategories) m.set(c.category_id, c);
    return m;
  }, [adminCategories]);

  const loadAdminData = React.useCallback(async () => {
    setAdminLoading(true);
    setAdminError(null);
    try {
      const auth = adminAuthHeader(token);
      const [catsRes, nomsRes] = await Promise.all([
        fetch(`${apiBase}/categories?eventId=${eventId}`),
        fetch(`${apiBase}/nominees?eventId=${eventId}`, { headers: { ...auth } }),
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
  }, [eventId, apiBase, token]);

  React.useEffect(() => {
    void loadAdminData();
  }, [loadAdminData]);

  const filteredNominees = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return adminNominees
      .filter((n) => {
        if (filterCategoryId !== "all" && Number(n.category_id) !== filterCategoryId) return false;
        if (!q) return true;
        const catName = (categoryById.get(Number(n.category_id))?.name || "").toLowerCase();
        const name = (n.name || "").toLowerCase();
        const desc = (n.description || "").toLowerCase();
        return name.includes(q) || desc.includes(q) || catName.includes(q);
      })
      .slice()
      .sort((a, b) => Number(a.category_id) - Number(b.category_id) || Number(a.nominee_id) - Number(b.nominee_id));
  }, [adminNominees, filterCategoryId, searchQuery, categoryById]);

  const revokeNomineePhotoBlob = React.useCallback(() => {
    setNomineePhotoBlobUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }, []);

  React.useEffect(() => () => revokeNomineePhotoBlob(), [revokeNomineePhotoBlob]);

  function openAddCategoryModal() {
    setCategoryNameDraft("");
    setCategoryModal({ mode: "add" });
  }

  function openEditCategoryModal(c: Category) {
    setCategoryNameDraft(c.name || "");
    setCategoryModal({ mode: "edit", categoryId: c.category_id });
  }

  function closeCategoryModal() {
    setCategoryModal(null);
    setCategoryNameDraft("");
  }

  function openAddNomineeModal() {
    revokeNomineePhotoBlob();
    const firstCat = adminCategories[0]?.category_id ?? 0;
    setNomineeForm({ ...emptyNomineeForm(), category_id: firstCat });
    setNomineeModal({ mode: "add" });
  }

  function openEditNomineeModal(n: Nominee) {
    revokeNomineePhotoBlob();
    setNomineeForm({
      name: n.name || "",
      photo: n.photo || "",
      description: n.description || "",
      category_id: Number(n.category_id),
    });
    setNomineeModal({ mode: "edit", nomineeId: n.nominee_id });
  }

  function closeNomineeModal() {
    revokeNomineePhotoBlob();
    setNomineeModal(null);
    setNomineeForm(emptyNomineeForm());
  }

  async function saveCategoryModal() {
    const name = categoryNameDraft.trim();
    if (!name) return;
    setAdminLoading(true);
    setAdminError(null);
    try {
      if (categoryModal?.mode === "add") {
        const res = await fetch(`${apiBase}/admin/categories`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
          body: JSON.stringify({ name, eventId }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error || "CREATE_CATEGORY_FAILED");
      } else if (categoryModal?.mode === "edit") {
        const res = await fetch(`${apiBase}/admin/categories/${categoryModal.categoryId}?eventId=${eventId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
          body: JSON.stringify({ name }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error || "UPDATE_CATEGORY_FAILED");
      }
      closeCategoryModal();
      await loadAdminData();
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "SAVE_CATEGORY_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }

  async function adminDeleteCategory(categoryId: number, categoryName: string) {
    const label = categoryName.trim() || "this category";
    if (!window.confirm(`Delete "${label}" and all its nominees? This cannot be undone.`)) return;
    setAdminLoading(true);
    setAdminError(null);
    try {
      const res = await fetch(`${apiBase}/admin/categories/${categoryId}?eventId=${eventId}`, {
        method: "DELETE",
        headers: { ...adminAuthHeader(token) },
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "DELETE_CATEGORY_FAILED");
      if (categoryModal?.mode === "edit" && categoryModal.categoryId === categoryId) closeCategoryModal();
      await loadAdminData();
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "DELETE_CATEGORY_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }

  async function saveNomineeModal() {
    const name = nomineeForm.name.trim();
    if (!name || !nomineeForm.category_id) return;
    setAdminLoading(true);
    setAdminError(null);
    try {
      if (nomineeModal?.mode === "add") {
        const res = await fetch(`${apiBase}/admin/nominees?eventId=${eventId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
          body: JSON.stringify({
            name,
            photo: nomineeForm.photo.trim(),
            description: nomineeForm.description.trim() || undefined,
            category_id: nomineeForm.category_id,
          }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error || "SAVE_NOMINEE_FAILED");
      } else if (nomineeModal?.mode === "edit") {
        const res = await fetch(`${apiBase}/admin/nominees/${nomineeModal.nomineeId}?eventId=${eventId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
          body: JSON.stringify({
            name,
            photo: nomineeForm.photo.trim(),
            description: nomineeForm.description.trim() || null,
            category_id: nomineeForm.category_id,
          }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error || "SAVE_NOMINEE_FAILED");
      }
      closeNomineeModal();
      await loadAdminData();
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "SAVE_NOMINEE_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }

  async function adminDeleteNominee(nomineeId: number, nomineeName: string) {
    const label = nomineeName.trim() || "this nominee";
    if (!window.confirm(`Delete "${label}"? Votes for this nominee will be removed.`)) return;
    setAdminLoading(true);
    setAdminError(null);
    try {
      const res = await fetch(`${apiBase}/admin/nominees/${nomineeId}?eventId=${eventId}`, {
        method: "DELETE",
        headers: { ...adminAuthHeader(token) },
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "DELETE_NOMINEE_FAILED");
      if (nomineeModal?.mode === "edit" && nomineeModal.nomineeId === nomineeId) closeNomineeModal();
      await loadAdminData();
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "DELETE_NOMINEE_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }

  async function toggleCategoryShowNominee(c: Category, next: boolean) {
    setShowNomineeSavingId(c.category_id);
    setAdminError(null);
    try {
      const res = await fetch(`${apiBase}/admin/categories/${c.category_id}?eventId=${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
        body: JSON.stringify({ show_nominee: next ? 1 : 0 }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "UPDATE_CATEGORY_FAILED");
      setAdminCategories((prev) =>
        prev.map((cat) =>
          cat.category_id === c.category_id ? { ...cat, show_nominee: next ? 1 : 0 } : cat,
        ),
      );
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "UPDATE_CATEGORY_FAILED");
    } finally {
      setShowNomineeSavingId(null);
    }
  }

  async function toggleCategoryDeclareResult(c: Category, next: boolean) {
    setDeclareResultSavingId(c.category_id);
    setAdminError(null);
    try {
      const res = await fetch(`${apiBase}/admin/categories/${c.category_id}?eventId=${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
        body: JSON.stringify({ declare_result: next ? 1 : 0 }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "UPDATE_CATEGORY_FAILED");
      const updated = data?.category as Category | undefined;
      setAdminCategories((prev) =>
        prev.map((cat) =>
          cat.category_id === c.category_id
            ? updated
              ? { ...cat, ...updated }
              : { ...cat, declare_result: next ? 1 : 0, winner_nominee_id: next ? cat.winner_nominee_id : null }
            : cat,
        ),
      );
      if (!next) onEventDeclareResultChange?.(false);
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "UPDATE_CATEGORY_FAILED");
    } finally {
      setDeclareResultSavingId(null);
    }
  }

  async function toggleNomineeApproved(n: Nominee, nextApproved: boolean) {
    setAdminLoading(true);
    setAdminError(null);
    try {
      const res = await fetch(`${apiBase}/admin/nominees/${n.nominee_id}?eventId=${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
        body: JSON.stringify({ is_approved: nextApproved ? 1 : 0 }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "APPROVAL_UPDATE_FAILED");
      await loadAdminData();
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "APPROVAL_UPDATE_FAILED");
    } finally {
      setAdminLoading(false);
    }
  }

  async function adminUploadNomineePhoto(file: File) {
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
      revokeNomineePhotoBlob();
      setNomineeForm((p) => ({ ...p, photo: filename }));
    } catch (e) {
      setAdminError(e instanceof Error ? e.message : "PHOTO_UPLOAD_FAILED");
    } finally {
      setAdminPhotoUploading(false);
    }
  }

  const panelTitle = mode === "categories" ? "Categories" : "Nominees";

  const nomineeFormFields = (
    <>
      <div className="field" style={{ marginBottom: 12 }}>
        <div className="label">Category *</div>
        <select
          className="input"
          value={nomineeForm.category_id || ""}
          onChange={(e) => setNomineeForm((p) => ({ ...p, category_id: Number(e.target.value) }))}
          disabled={adminLoading || adminCategories.length === 0}
          required
        >
          {adminCategories.length === 0 ? (
            <option value="">No categories — add one first</option>
          ) : (
            adminCategories.map((c) => (
              <option key={c.category_id} value={c.category_id}>
                {c.name}
              </option>
            ))
          )}
        </select>
      </div>
      <div className="field" style={{ marginBottom: 12 }}>
        <div className="label">Name *</div>
        <input
          className="input"
          value={nomineeForm.name}
          onChange={(e) => setNomineeForm((p) => ({ ...p, name: e.target.value }))}
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
            void adminUploadNomineePhoto(f);
          }}
          disabled={adminLoading || adminPhotoUploading}
        />
        {adminPhotoUploading ? <p className="hint" style={{ marginTop: 8 }}>Uploading…</p> : null}
        {(() => {
          const serverSrc = nomineeForm.photo.trim()
            ? resolveNomineePhotoUrl(apiOrigin, nomineeForm.photo)
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
          value={nomineeForm.description}
          onChange={(e) => setNomineeForm((p) => ({ ...p, description: e.target.value }))}
          placeholder="Short description"
          style={{ minHeight: 88, resize: "vertical" }}
          disabled={adminLoading}
        />
      </div>
    </>
  );

  return (
    <div className="panel" style={{ marginBottom: "2rem" }}>
      <div className="back-row" style={{ marginBottom: "1rem" }}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Your events", onClick: onGoList ?? onBack },
            { label: eventTitle, onClick: onBack },
            { label: mode === "categories" ? "Categories" : "Nominees" },
          ]}
        />
      </div>

      <div className={styles.adminCatToolbar} style={{ marginBottom: 14 }}>
        <div>
          <div className="panel-title" style={{ marginBottom: 4 }}>{panelTitle}</div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>{eventTitle}</p>
        </div>
        <span style={{ fontSize: 13, color: "var(--text-faint)" }}>
          {adminLoading
            ? "Loading…"
            : mode === "categories"
              ? `${adminCategories.length} categories`
              : `${filteredNominees.length}${filterCategoryId !== "all" || searchQuery.trim() ? ` of ${adminNominees.length}` : ""} nominees`}
        </span>
      </div>

      {adminError ? <div className="error-box" style={{ marginBottom: 12 }}>{adminError}</div> : null}

      {mode === "categories" ? (
        <div className={styles.adminCategoriesBlock} style={{ marginTop: 0 }}>
          <div className={styles.adminCatToolbar}>
            <span className="section-title" style={{ marginBottom: 0, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
              All categories
            </span>
            <button type="button" className="btn" onClick={openAddCategoryModal} disabled={adminLoading}>
              Add category
            </button>
          </div>

          {adminCategories.length === 0 && !adminLoading ? (
            <p className="hint" style={{ textAlign: "left", padding: "1rem 0" }}>No categories yet — use Add category.</p>
          ) : null}

          <div className={styles.adminCategoryList}>
            {adminCategories.map((c) => (
              <div key={c.category_id} className={styles.adminCategoryRow}>
                <div className={styles.adminCategoryRowMain}>
                  <div className={styles.adminRowIconGroup}>
                    <button
                      type="button"
                      className={styles.adminIconBtnNeutral}
                      onClick={() => openEditCategoryModal(c)}
                      aria-label="Edit category"
                      title="Edit category"
                    >
                      <IconPencil />
                    </button>
                    <button
                      type="button"
                      className={styles.adminIconBtnDanger}
                      onClick={() => void adminDeleteCategory(c.category_id, c.name)}
                      disabled={adminLoading}
                      aria-label={`Delete ${c.name}`}
                      title="Delete category"
                    >
                      <IconTrash />
                    </button>
                  </div>
                  <div className={styles.adminCategoryTitleWrap}>
                    <span style={{ fontSize: 15, fontWeight: 600, whiteSpace: "normal" }}>{c.name}</span>
                    {c.winner_nominee_id ? (
                      <span className="event-badge badge-public" style={{ marginLeft: 8 }}>Winner set</span>
                    ) : null}
                  </div>
                  <label
                    className={styles.adminApproveSwitch}
                    title={categoryShowsNominees(c) ? "Nominees visible on screen" : "Nominees hidden on screen"}
                  >
                    <input
                      type="checkbox"
                      role="switch"
                      checked={categoryShowsNominees(c)}
                      disabled={showNomineeSavingId === c.category_id || adminLoading}
                      onChange={(e) => void toggleCategoryShowNominee(c, e.target.checked)}
                      aria-label={categoryShowsNominees(c) ? "Hide nominees on screen" : "Show nominees on screen"}
                    />
                    <span className={styles.adminApproveTrack} aria-hidden />
                    <span>Show nominee</span>
                  </label>
                  <label
                    className={styles.adminApproveSwitch}
                    title={
                      categoryDeclaresResult(c)
                        ? "Result declared"
                        : "Result not declared"
                    }
                  >
                    <input
                      type="checkbox"
                      role="switch"
                      checked={categoryDeclaresResult(c)}
                      disabled={declareResultSavingId === c.category_id || adminLoading}
                      onChange={(e) => void toggleCategoryDeclareResult(c, e.target.checked)}
                      aria-label={
                        categoryDeclaresResult(c)
                          ? "Undeclare category result"
                          : "Declare category result"
                      }
                    />
                    <span className={styles.adminApproveTrack} aria-hidden />
                    <span>Declare result</span>
                  </label>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.adminCategoriesBlock} style={{ marginTop: 0 }}>
          {adminCategories.length === 0 && !adminLoading ? (
            <div>
              <p className="hint" style={{ textAlign: "left", padding: "0.5rem 0 1rem" }}>
                Add categories first, then add nominees.
              </p>
              {onGoCategories ? (
                <button type="button" className="btn" onClick={onGoCategories}>
                  Go to categories
                </button>
              ) : null}
            </div>
          ) : (
            <>
              <div className={styles.adminNomineeToolbar}>
                <input
                  className={`input ${styles.adminNomineeToolbarSearch}`}
                  type="search"
                  placeholder="Search nominees…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search nominees"
                />
                <select
                  className={`input ${styles.adminNomineeToolbarSelect}`}
                  value={filterCategoryId === "all" ? "all" : String(filterCategoryId)}
                  onChange={(e) => {
                    const v = e.target.value;
                    setFilterCategoryId(v === "all" ? "all" : Number(v));
                  }}
                  aria-label="Filter by category"
                >
                  <option value="all">All categories</option>
                  {adminCategories.map((c) => (
                    <option key={c.category_id} value={c.category_id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className={`btn ${styles.adminNomineeToolbarAdd}`}
                  onClick={openAddNomineeModal}
                  disabled={adminLoading}
                >
                  Add nominee
                </button>
              </div>

              {filteredNominees.length === 0 && !adminLoading ? (
                <p className="hint" style={{ textAlign: "left", padding: "1rem 0" }}>
                  {adminNominees.length === 0
                    ? "No nominees yet — use Add nominee."
                    : "No nominees match your search or filter."}
                </p>
              ) : (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 2,
                  }}
                >
                  {filteredNominees.map((n) => {
                    const thumb = resolveNomineePhotoUrl(apiOrigin, n.photo);
                    const catName = categoryById.get(Number(n.category_id))?.name || "Category";
                    const approved = isApproved(n);
                    return (
                      <AdminNomineeCard
                        key={n.nominee_id}
                        name={n.name}
                        categoryName={catName}
                        description={n.description}
                        photoSrc={thumb}
                        approved={approved}
                        disabled={adminLoading}
                        onEdit={() => openEditNomineeModal(n)}
                        onDelete={() => void adminDeleteNominee(n.nominee_id, n.name)}
                        onApprovedChange={(next) => void toggleNomineeApproved(n, next)}
                      />
                    );
                  })}
                </Box>
              )}
            </>
          )}
        </div>
      )}

      {categoryModal ? (
        <AdminModal
          title={categoryModal.mode === "add" ? "Add category" : "Edit category"}
          onClose={closeCategoryModal}
          footer={
            <>
              <button type="button" className="btn btn-ghost" onClick={closeCategoryModal} disabled={adminLoading}>
                Cancel
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => void saveCategoryModal()}
                disabled={adminLoading || !categoryNameDraft.trim()}
              >
                {categoryModal.mode === "add" ? "Add category" : "Save changes"}
              </button>
            </>
          }
        >
          <div className="field" style={{ marginBottom: 0 }}>
            <div className="label">Category name *</div>
            <input
              className="input"
              value={categoryNameDraft}
              onChange={(e) => setCategoryNameDraft(e.target.value)}
              placeholder="Category name"
              disabled={adminLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter") void saveCategoryModal();
              }}
            />
          </div>
        </AdminModal>
      ) : null}

      {nomineeModal ? (
        <AdminModal
          wide
          title={nomineeModal.mode === "add" ? "Add nominee" : "Edit nominee"}
          onClose={closeNomineeModal}
          footer={
            <>
              <button type="button" className="btn btn-ghost" onClick={closeNomineeModal} disabled={adminLoading}>
                Cancel
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => void saveNomineeModal()}
                disabled={adminLoading || !nomineeForm.name.trim() || !nomineeForm.category_id}
              >
                {nomineeModal.mode === "add" ? "Add nominee" : "Save changes"}
              </button>
            </>
          }
        >
          {nomineeFormFields}
        </AdminModal>
      ) : null}
    </div>
  );
}
