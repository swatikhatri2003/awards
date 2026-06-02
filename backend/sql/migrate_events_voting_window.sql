-- Voting window: NULL start/end = voting always allowed; both set = only between those times (inclusive).
ALTER TABLE `events` ADD COLUMN `start_time` datetime DEFAULT NULL;
ALTER TABLE `events` ADD COLUMN `end_time` datetime DEFAULT NULL;
