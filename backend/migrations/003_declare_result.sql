-- Result declaration: 0 = hidden (default), 1 = declared / visible
ALTER TABLE `events`
  ADD COLUMN `declare_result` TINYINT(1) NOT NULL DEFAULT 0 AFTER `end_time`;

ALTER TABLE `category`
  ADD COLUMN `declare_result` TINYINT(1) NOT NULL DEFAULT 0 AFTER `show_nominee`;
