-- Nominee approval: 0 = unapproved (default), 1 = approved (visible for voting)
ALTER TABLE `nominee`
  ADD COLUMN `is_approved` TINYINT(1) NOT NULL DEFAULT 0 AFTER `votes`;
