"use client";

import React from "react";
import styles from "../../actions/led-kiosk.module.css";

function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

export function AdminModal(props: {
  title: string;
  titleId?: string;
  wide?: boolean;
  onClose: () => void;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { title, titleId = "admin-modal-title", wide, onClose, footer, children } = props;

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className={styles.adminModalBackdrop}
      role="presentation"
      onClick={onClose}
    >
      <div
        className={`${styles.adminModal} ${wide ? styles.adminModalWide : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.adminModalHead}>
          <h2 id={titleId} className={styles.adminModalTitle}>
            {title}
          </h2>
          <button type="button" className={styles.adminIconBtn} onClick={onClose} aria-label="Close">
            <IconX />
          </button>
        </div>
        {children}
        {footer ? <div className={styles.adminModalFooter}>{footer}</div> : null}
      </div>
    </div>
  );
}
