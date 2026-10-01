-- Admin jobs moderation: hide/restore without destroying the job record.
ALTER TABLE `job` ADD COLUMN `hidden_at` DATETIME(3) NULL,
    ADD COLUMN `hidden_reason` VARCHAR(255) NULL;
