-- Event live flag: 0 = not live (default), 1 = live (public detail, voting, home listing)
ALTER TABLE `events`
  ADD COLUMN `is_live` TINYINT(1) NOT NULL DEFAULT 0 AFTER `declare_result`;
