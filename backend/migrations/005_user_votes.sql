-- Track which registered user voted for which nominee
CREATE TABLE IF NOT EXISTS `user_votes` (
  `vote_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `nominee_id` INT NOT NULL,
  PRIMARY KEY (`vote_id`),
  UNIQUE KEY `uniq_user_nominee` (`user_id`, `nominee_id`),
  KEY `idx_user_votes_user_id` (`user_id`),
  KEY `idx_user_votes_nominee_id` (`nominee_id`),
  CONSTRAINT `fk_user_votes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_votes_nominee` FOREIGN KEY (`nominee_id`) REFERENCES `nominee` (`nominee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Backfill from existing votes (one row per user + nominee)
INSERT IGNORE INTO `user_votes` (`user_id`, `nominee_id`)
SELECT `user_id`, `nominee_id` FROM `votes`;
