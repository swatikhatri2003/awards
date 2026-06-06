-- Category nominee visibility on LED: 0 = hidden (default), 1 = shown
ALTER TABLE `category`
  ADD COLUMN `show_nominee` TINYINT(1) NOT NULL DEFAULT 0 AFTER `event_id`;
