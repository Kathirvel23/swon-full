-- complaint_event joins the publicId convention (case timeline entries are
-- addressable in the UI). cuid() is generated client-side.
ALTER TABLE `complaint_event`
  ADD COLUMN `public_id` VARCHAR(64) NULL,
  ADD UNIQUE KEY `complaint_event_public_id_key` (`public_id`);
