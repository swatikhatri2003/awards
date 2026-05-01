-- One-time backfill: old rows may have event_id NULL. After API change, only rows
-- matching the requested event are returned. Set NULL rows to the correct event:
-- (change 1 to your main event’s event_id if different)

UPDATE `category` SET `event_id` = 1 WHERE `event_id` IS NULL;
