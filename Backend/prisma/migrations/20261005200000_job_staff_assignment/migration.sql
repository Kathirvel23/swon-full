-- Event-scoped staff role (owner brief 2026-10-05).
-- A hired worker can be given ATTENDANCE_MANAGER for ONE job, and only that
-- job. Additive only: one new table, no existing table or row is touched.
CREATE TABLE `job_staff_assignment` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `job_id` BIGINT NOT NULL,
    `worker_profile_id` BIGINT NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'ATTENDANCE_MANAGER',
    `status` VARCHAR(191) NOT NULL DEFAULT 'ACTIVE',
    `assigned_by_account_id` BIGINT NULL,
    `incentive_pct` DECIMAL(5, 2) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `job_staff_assignment_worker_profile_id_status_idx`(`worker_profile_id`, `status`),
    INDEX `job_staff_assignment_job_id_status_idx`(`job_id`, `status`),
    UNIQUE INDEX `job_staff_assignment_public_id_key`(`public_id`),
    UNIQUE INDEX `job_staff_assignment_job_id_worker_profile_id_role_key`(`job_id`, `worker_profile_id`, `role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CHECK constraints (state machine + role guard mirrored in the service layer)
ALTER TABLE `job_staff_assignment`
    ADD CONSTRAINT `job_staff_assignment_role_ck` CHECK (`role` IN ('ATTENDANCE_MANAGER')),
    ADD CONSTRAINT `job_staff_assignment_status_ck` CHECK (`status` IN ('ACTIVE', 'REVOKED'));

ALTER TABLE `job_staff_assignment`
    ADD CONSTRAINT `job_staff_assignment_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    ADD CONSTRAINT `job_staff_assignment_worker_profile_id_fkey` FOREIGN KEY (`worker_profile_id`) REFERENCES `worker_profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
