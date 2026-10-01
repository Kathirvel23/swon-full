-- match_log joins the publicId convention (every entity is addressable
-- without exposing autoincrement ids). cuid() is generated client-side.
ALTER TABLE `match_log`
  ADD COLUMN `public_id` VARCHAR(64) NULL,
  ADD UNIQUE KEY `match_log_public_id_key` (`public_id`);
