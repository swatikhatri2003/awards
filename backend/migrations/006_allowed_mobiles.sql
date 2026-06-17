-- Allowed mobiles for private (invite-only) events.
CREATE TABLE IF NOT EXISTS allowed_mobiles (
  id INT NOT NULL AUTO_INCREMENT,
  mobile VARCHAR(15) NOT NULL,
  note VARCHAR(255) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  event_id INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_allowed_mobiles_event_mobile (event_id, mobile),
  KEY idx_allowed_mobiles_event_id (event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
