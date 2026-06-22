"use client";

import React from "react";
import styles from "../../actions/led-kiosk.module.css";
import { adminAuthHeader } from "../../_lib/adminAuthSession";
import { Breadcrumb } from "../../_components/Breadcrumb";
import { useToast } from "../../_components/ToastProvider";
import { AdminModal } from "./AdminModal";

type AllowedMobile = {
  id: number;
  mobile: string;
  note?: string | null;
  created_at?: string | null;
  event_id?: number;
};

type MobileModalState = null | { mode: "add" } | { mode: "edit"; id: number };

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

function formatWhen(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString();
}

export function AllowedMobilesPanel(props: {
  eventId: number;
  eventTitle: string;
  apiBase: string;
  token: string;
  onBack: () => void;
  onGoList?: () => void;
}) {
  const { eventId, eventTitle, apiBase, token, onBack, onGoList } = props;
  const { toastError, toastSuccess } = useToast();

  const [rows, setRows] = React.useState<AllowedMobile[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [modal, setModal] = React.useState<MobileModalState>(null);
  const [mobileDraft, setMobileDraft] = React.useState("");
  const [noteDraft, setNoteDraft] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const loadRows = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/admin/events/${eventId}/allowed-mobiles`, {
        headers: { ...adminAuthHeader(token) },
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || data?.error || "LOAD_FAILED");
      setRows(Array.isArray(data?.allowed_mobiles) ? (data.allowed_mobiles as AllowedMobile[]) : []);
    } catch (e) {
      toastError(e instanceof Error ? e.message : "LOAD_FAILED");
    } finally {
      setLoading(false);
    }
  }, [apiBase, eventId, token]);

  React.useEffect(() => {
    void loadRows();
  }, [loadRows]);

  const filteredRows = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => {
      const mobile = (r.mobile || "").toLowerCase();
      const note = (r.note || "").toLowerCase();
      return mobile.includes(q) || note.includes(q);
    });
  }, [rows, searchQuery]);

  function openAddModal() {
    setMobileDraft("");
    setNoteDraft("");
    setModal({ mode: "add" });
  }

  function openEditModal(row: AllowedMobile) {
    setMobileDraft(row.mobile || "");
    setNoteDraft(row.note || "");
    setModal({ mode: "edit", id: row.id });
  }

  function closeModal() {
    setModal(null);
    setMobileDraft("");
    setNoteDraft("");
  }

  async function saveModal() {
    const mobile = mobileDraft.trim();
    if (!mobile) return;
    setLoading(true);
    try {
      if (modal?.mode === "add") {
        const res = await fetch(`${apiBase}/admin/events/${eventId}/allowed-mobiles`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
          body: JSON.stringify({ mobile, note: noteDraft.trim() || null }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.message || data?.error || "CREATE_FAILED");
      } else if (modal?.mode === "edit") {
        const res = await fetch(`${apiBase}/admin/events/${eventId}/allowed-mobiles/${modal.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...adminAuthHeader(token) },
          body: JSON.stringify({ mobile, note: noteDraft.trim() || null }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.message || data?.error || "UPDATE_FAILED");
      }
      closeModal();
      await loadRows();
    } catch (e) {
      toastError(e instanceof Error ? e.message : "SAVE_FAILED");
    } finally {
      setLoading(false);
    }
  }

  async function deleteRow(row: AllowedMobile) {
    const label = row.mobile || "this number";
    if (!window.confirm(`Remove ${label} from the allowlist?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/admin/events/${eventId}/allowed-mobiles/${row.id}`, {
        method: "DELETE",
        headers: { ...adminAuthHeader(token) },
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || data?.error || "DELETE_FAILED");
      if (modal?.mode === "edit" && modal.id === row.id) closeModal();
      await loadRows();
    } catch (e) {
      toastError(e instanceof Error ? e.message : "DELETE_FAILED");
    } finally {
      setLoading(false);
    }
  }

  async function uploadSpreadsheet(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${apiBase}/admin/events/${eventId}/allowed-mobiles/upload`, {
        method: "POST",
        headers: { ...adminAuthHeader(token) },
        body: fd,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || data?.error || "UPLOAD_FAILED");
      const inserted = Number(data?.inserted ?? 0);
      const skipped = Number(data?.skipped ?? 0);
      const invalid = Number(data?.invalid ?? 0);
      toastSuccess(`Import done: ${inserted} added, ${skipped} skipped, ${invalid} invalid.`);
      await loadRows();
    } catch (e) {
      toastError(e instanceof Error ? e.message : "UPLOAD_FAILED");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="panel" style={{ marginBottom: "2rem" }}>
      <div className="back-row" style={{ marginBottom: "1rem" }}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Your events", onClick: onGoList ?? onBack },
            { label: eventTitle, onClick: onBack },
            { label: "Allowed mobiles" },
          ]}
        />
      </div>

      <div className={styles.adminCatToolbar} style={{ marginBottom: 14 }}>
        <div>
          <div className="panel-title" style={{ marginBottom: 4 }}>Allowed mobiles</div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
            {eventTitle} — invite-only registration
          </p>
        </div>
        <span style={{ fontSize: 13, color: "var(--text-faint)" }}>
          {loading ? "Loading…" : `${filteredRows.length}${searchQuery.trim() ? ` of ${rows.length}` : ""} numbers`}
        </span>
      </div>

      <p className="hint" style={{ marginBottom: 12 }}>
        Only these mobile numbers can register for this private event. Upload Excel or CSV (mobile in column A, optional note in column B) or add numbers manually.
      </p>

      <div className={styles.adminNomineeToolbar} style={{ marginBottom: 14 }}>
        <input
          className={`input ${styles.adminNomineeToolbarSearch}`}
          type="search"
          placeholder="Search mobile or note…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search allowed mobiles"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void uploadSpreadsheet(file);
          }}
        />
        <button
          type="button"
          className="btn btn-ghost"
          disabled={loading || uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? "Importing…" : "Import Excel/CSV"}
        </button>
        <button
          type="button"
          className={`btn ${styles.adminNomineeToolbarAdd}`}
          onClick={openAddModal}
          disabled={loading || uploading}
        >
          Add mobile
        </button>
      </div>

      {filteredRows.length === 0 && !loading ? (
        <p className="hint" style={{ textAlign: "left", padding: "1rem 0" }}>
          {rows.length === 0
            ? "No allowed mobiles yet — import a spreadsheet or add manually."
            : "No numbers match your search."}
        </p>
      ) : (
        <div className={styles.adminCategoryList}>
          {filteredRows.map((row) => (
            <div key={row.id} className={styles.adminCategoryRow}>
              <div className={styles.adminCategoryRowMain}>
                <div className={styles.adminRowIconGroup}>
                  <button
                    type="button"
                    className={styles.adminIconBtnNeutral}
                    onClick={() => openEditModal(row)}
                    aria-label="Edit mobile"
                    title="Edit"
                  >
                    <IconPencil />
                  </button>
                  <button
                    type="button"
                    className={styles.adminIconBtnDanger}
                    onClick={() => void deleteRow(row)}
                    disabled={loading}
                    aria-label={`Remove ${row.mobile}`}
                    title="Remove"
                  >
                    <IconTrash />
                  </button>
                </div>
                <div className={styles.adminCategoryTitleWrap}>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{row.mobile}</span>
                  {row.note ? (
                    <span style={{ fontSize: 13, color: "var(--text-muted)", marginLeft: 10 }}>{row.note}</span>
                  ) : null}
                </div>
                {row.created_at ? (
                  <span style={{ fontSize: 12, color: "var(--text-faint)", whiteSpace: "nowrap" }}>
                    {formatWhen(row.created_at)}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}

      {modal ? (
        <AdminModal
          title={modal.mode === "add" ? "Add allowed mobile" : "Edit allowed mobile"}
          onClose={closeModal}
          footer={
            <>
              <button type="button" className="btn btn-ghost" disabled={loading} onClick={closeModal}>
                Cancel
              </button>
              <button type="button" className="btn" disabled={loading || !mobileDraft.trim()} onClick={() => void saveModal()}>
                {loading ? "Saving…" : "Save"}
              </button>
            </>
          }
        >
          <div className="field" style={{ marginBottom: 12 }}>
            <label className="label" htmlFor="allowed-mobile-input">Mobile</label>
            <input
              id="allowed-mobile-input"
              className="input"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="10-digit mobile"
              value={mobileDraft}
              onChange={(e) => setMobileDraft(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="allowed-mobile-note">Note (optional)</label>
            <input
              id="allowed-mobile-note"
              className="input"
              type="text"
              placeholder="Name or reference"
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              disabled={loading}
            />
          </div>
        </AdminModal>
      ) : null}
    </div>
  );
}
