-- Adds OTP columns expected by /api/admin/auth/forgot-password and sign-in.
-- Run if MySQL reports: Unknown column 'otp' or 'otp_expires_at' in 'field list'
-- Safe to run once; ignore "Duplicate column" if already applied.

ALTER TABLE `event_admin`
  ADD COLUMN `otp` varchar(6) DEFAULT NULL;

ALTER TABLE `event_admin`
  ADD COLUMN `otp_expires_at` datetime DEFAULT NULL;
