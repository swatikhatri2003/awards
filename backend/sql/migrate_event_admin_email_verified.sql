-- Admin registration requires verified email before sign-in.
-- Safe to run once; ignore "Duplicate column" if already applied.

ALTER TABLE `event_admin`
  ADD COLUMN `email_verified` tinyint(1) NOT NULL DEFAULT 0;

-- Existing admins can sign in without re-verifying
UPDATE `event_admin` SET `email_verified` = 1;
