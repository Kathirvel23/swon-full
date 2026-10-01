-- CreateTable
CREATE TABLE `account` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING_VERIFICATION',
    `phone_verified_at` DATETIME(3) NULL,
    `last_login_at` DATETIME(3) NULL,
    `closed_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `account_public_id_key`(`public_id`),
    UNIQUE INDEX `account_phone_key`(`phone`),
    INDEX `account_role_status_idx`(`role`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `worker_profile` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `account_id` BIGINT NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `photo_storage_key` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `area_id` BIGINT NULL,
    `bio` VARCHAR(191) NULL,
    `experience_years` INTEGER NULL,
    `open_to_work` BOOLEAN NOT NULL DEFAULT false,
    `avg_rating_milli` INTEGER NOT NULL DEFAULT 0,
    `ratings_count` INTEGER NOT NULL DEFAULT 0,
    `jobs_done_count` INTEGER NOT NULL DEFAULT 0,
    `attendance_rate_milli` INTEGER NULL,
    `profile_complete_pct` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `worker_profile_public_id_key`(`public_id`),
    UNIQUE INDEX `worker_profile_account_id_key`(`account_id`),
    INDEX `worker_profile_area_id_idx`(`area_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employer_profile` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `account_id` BIGINT NOT NULL,
    `org_name` VARCHAR(191) NOT NULL,
    `org_type` VARCHAR(191) NOT NULL DEFAULT 'INDIVIDUAL',
    `contact_name` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `area_id` BIGINT NOT NULL,
    `address_line` VARCHAR(191) NOT NULL,
    `pan_ref` VARCHAR(191) NULL,
    `gstin` VARCHAR(191) NULL,
    `verification_status` VARCHAR(191) NOT NULL DEFAULT 'UNVERIFIED',
    `welfare_defaults` JSON NULL,
    `avg_rating_milli` INTEGER NOT NULL DEFAULT 0,
    `ratings_count` INTEGER NOT NULL DEFAULT 0,
    `jobs_posted_count` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `employer_profile_public_id_key`(`public_id`),
    UNIQUE INDEX `employer_profile_account_id_key`(`account_id`),
    INDEX `employer_profile_city_area_id_idx`(`city`, `area_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kyc_submission` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `account_id` BIGINT NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
    `id_type` VARCHAR(191) NOT NULL,
    `id_number_enc` LONGBLOB NOT NULL,
    `id_number_hash` VARCHAR(191) NOT NULL,
    `attempts` INTEGER NOT NULL DEFAULT 1,
    `rejection_reason` VARCHAR(191) NULL,
    `submitted_at` DATETIME(3) NULL,
    `decided_at` DATETIME(3) NULL,
    `decided_by_account_id` BIGINT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `kyc_submission_public_id_key`(`public_id`),
    INDEX `kyc_submission_status_created_at_idx`(`status`, `created_at`),
    UNIQUE INDEX `kyc_submission_account_id_id_number_hash_key`(`account_id`, `id_number_hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kyc_document` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `submission_id` BIGINT NOT NULL,
    `doc_type` VARCHAR(191) NOT NULL,
    `storage_key` VARCHAR(191) NOT NULL,
    `content_sha256` VARCHAR(191) NOT NULL,
    `mime` VARCHAR(191) NOT NULL,
    `size_bytes` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `kyc_document_submission_id_idx`(`submission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kyc_consent` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `submission_id` BIGINT NOT NULL,
    `consent_version` VARCHAR(191) NOT NULL,
    `granted_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ip_hash` VARCHAR(191) NULL,
    `text_snapshot` JSON NOT NULL,

    UNIQUE INDEX `kyc_consent_submission_id_key`(`submission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `document_access_log` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `document_id` BIGINT NOT NULL,
    `actor_account_id` BIGINT NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ip_hash` VARCHAR(191) NULL,

    INDEX `document_access_log_document_id_at_idx`(`document_id`, `at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `account_id` BIGINT NOT NULL,
    `refresh_token_hash` VARCHAR(191) NOT NULL,
    `family_id` VARCHAR(191) NOT NULL,
    `user_agent` VARCHAR(191) NULL,
    `ip_hash` VARCHAR(191) NULL,
    `issued_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires_at` DATETIME(3) NOT NULL,
    `revoked_at` DATETIME(3) NULL,
    `last_used_at` DATETIME(3) NULL,

    UNIQUE INDEX `session_public_id_key`(`public_id`),
    UNIQUE INDEX `session_refresh_token_hash_key`(`refresh_token_hash`),
    INDEX `session_account_id_revoked_at_idx`(`account_id`, `revoked_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otp_challenge` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `purpose` VARCHAR(191) NOT NULL DEFAULT 'LOGIN',
    `code_hash` VARCHAR(191) NOT NULL,
    `attempts` INTEGER NOT NULL DEFAULT 0,
    `max_attempts` INTEGER NOT NULL DEFAULT 5,
    `expires_at` DATETIME(3) NOT NULL,
    `cooldown_until` DATETIME(3) NULL,
    `consumed_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `otp_challenge_public_id_key`(`public_id`),
    INDEX `otp_challenge_phone_purpose_consumed_at_idx`(`phone`, `purpose`, `consumed_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `push_token` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `account_id` BIGINT NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `last_seen_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `push_token_account_id_token_key`(`account_id`, `token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `area` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `name_ta` VARCHAR(191) NULL,
    `lat` DECIMAL(10, 7) NULL,
    `lng` DECIMAL(10, 7) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `sort_order` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `area_public_id_key`(`public_id`),
    INDEX `area_city_idx`(`city`),
    UNIQUE INDEX `area_city_name_key`(`city`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_category` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `name_ta` VARCHAR(191) NULL,
    `parent_id` BIGINT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `suggested_pay_min_paise` BIGINT NULL,

    UNIQUE INDEX `job_category_public_id_key`(`public_id`),
    UNIQUE INDEX `job_category_code_key`(`code`),
    INDEX `job_category_parent_id_sort_order_idx`(`parent_id`, `sort_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skill` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `name_ta` VARCHAR(191) NULL,
    `category_id` BIGINT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `sort_order` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `skill_public_id_key`(`public_id`),
    UNIQUE INDEX `skill_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `welfare_item` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `label_ta` VARCHAR(191) NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `welfare_item_public_id_key`(`public_id`),
    UNIQUE INDEX `welfare_item_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `worker_skill` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `worker_profile_id` BIGINT NOT NULL,
    `skill_id` BIGINT NOT NULL,
    `years_hint` INTEGER NULL,

    UNIQUE INDEX `worker_skill_worker_profile_id_skill_id_key`(`worker_profile_id`, `skill_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `employer_profile_id` BIGINT NOT NULL,
    `title` VARCHAR(120) NOT NULL,
    `description` TEXT NOT NULL,
    `category_id` BIGINT NOT NULL,
    `city` VARCHAR(60) NOT NULL,
    `area_id` BIGINT NOT NULL,
    `address_line` VARCHAR(255) NOT NULL,
    `lat` DECIMAL(10, 7) NULL,
    `lng` DECIMAL(10, 7) NULL,
    `timezone` VARCHAR(191) NOT NULL DEFAULT 'Asia/Kolkata',
    `starts_on` DATE NOT NULL,
    `ends_on` DATE NOT NULL,
    `day_start_time` TIME(0) NOT NULL,
    `day_end_time` TIME(0) NOT NULL,
    `pay_type` VARCHAR(191) NOT NULL,
    `pay_amount_paise` BIGINT NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'INR',
    `headcount_required` INTEGER NOT NULL,
    `hired_count` INTEGER NOT NULL DEFAULT 0,
    `application_count` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
    `min_experience_years` INTEGER NULL,
    `requirements_note` VARCHAR(500) NULL,
    `published_at` DATETIME(3) NULL,
    `cancelled_at` DATETIME(3) NULL,
    `cancel_reason` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `job_public_id_key`(`public_id`),
    INDEX `job_status_category_id_city_area_id_starts_on_idx`(`status`, `category_id`, `city`, `area_id`, `starts_on`),
    INDEX `job_employer_profile_id_status_idx`(`employer_profile_id`, `status`),
    INDEX `job_status_ends_on_idx`(`status`, `ends_on`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_work_day` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `job_id` BIGINT NOT NULL,
    `work_date` DATE NOT NULL,
    `start_time` TIME(0) NOT NULL,
    `end_time` TIME(0) NOT NULL,
    `headcount` INTEGER NULL,

    UNIQUE INDEX `job_work_day_job_id_work_date_key`(`job_id`, `work_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_skill` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `job_id` BIGINT NOT NULL,
    `skill_id` BIGINT NOT NULL,

    UNIQUE INDEX `job_skill_job_id_skill_id_key`(`job_id`, `skill_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_welfare` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `job_id` BIGINT NOT NULL,
    `welfare_item_id` BIGINT NOT NULL,
    `note` VARCHAR(255) NULL,

    UNIQUE INDEX `job_welfare_job_id_welfare_item_id_key`(`job_id`, `welfare_item_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `application` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `job_id` BIGINT NOT NULL,
    `worker_profile_id` BIGINT NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'APPLIED',
    `source` VARCHAR(191) NOT NULL DEFAULT 'APPLY',
    `quick_match_offer_id` BIGINT NULL,
    `cover_note` VARCHAR(300) NULL,
    `decision_note` VARCHAR(255) NULL,
    `decided_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `application_public_id_key`(`public_id`),
    UNIQUE INDEX `application_quick_match_offer_id_key`(`quick_match_offer_id`),
    INDEX `application_job_id_status_idx`(`job_id`, `status`),
    INDEX `application_worker_profile_id_status_idx`(`worker_profile_id`, `status`),
    UNIQUE INDEX `application_job_id_worker_profile_id_key`(`job_id`, `worker_profile_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quick_match_offer` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `job_id` BIGINT NOT NULL,
    `worker_profile_id` BIGINT NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `wave_no` INTEGER NOT NULL DEFAULT 1,
    `required_headcount` INTEGER NOT NULL,
    `respond_by` DATETIME(3) NOT NULL,
    `responded_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `quick_match_offer_public_id_key`(`public_id`),
    INDEX `quick_match_offer_worker_profile_id_status_respond_by_idx`(`worker_profile_id`, `status`, `respond_by`),
    UNIQUE INDEX `quick_match_offer_job_id_worker_profile_id_key`(`job_id`, `worker_profile_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `crew_member` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `job_id` BIGINT NOT NULL,
    `application_id` BIGINT NOT NULL,
    `worker_profile_id` BIGINT NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'ACTIVE',
    `released_reason` VARCHAR(255) NULL,
    `hired_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `released_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `crew_member_public_id_key`(`public_id`),
    UNIQUE INDEX `crew_member_application_id_key`(`application_id`),
    INDEX `crew_member_job_id_status_idx`(`job_id`, `status`),
    UNIQUE INDEX `crew_member_job_id_worker_profile_id_key`(`job_id`, `worker_profile_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance_record` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `job_id` BIGINT NOT NULL,
    `work_day_id` BIGINT NOT NULL,
    `worker_profile_id` BIGINT NOT NULL,
    `crew_member_id` BIGINT NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'NOT_STARTED',
    `check_in_at` DATETIME(3) NULL,
    `check_out_at` DATETIME(3) NULL,
    `check_source` VARCHAR(191) NULL,
    `check_token_id` VARCHAR(191) NULL,
    `source_lat` DECIMAL(10, 7) NULL,
    `source_lng` DECIMAL(10, 7) NULL,
    `duration_minutes` INTEGER NULL,
    `correction_reason` VARCHAR(255) NULL,
    `corrected_by_account_id` BIGINT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `attendance_record_public_id_key`(`public_id`),
    INDEX `attendance_record_job_id_status_idx`(`job_id`, `status`),
    INDEX `attendance_record_work_day_id_status_idx`(`work_day_id`, `status`),
    UNIQUE INDEX `attendance_record_job_id_worker_profile_id_work_day_id_key`(`job_id`, `worker_profile_id`, `work_day_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `earning` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `job_id` BIGINT NOT NULL,
    `worker_profile_id` BIGINT NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `amount_paise` BIGINT NOT NULL DEFAULT 0,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'INR',
    `adjustment_paise` BIGINT NOT NULL DEFAULT 0,
    `adjustment_reason` VARCHAR(255) NULL,
    `hold_complaint_id` BIGINT NULL,
    `approved_at` DATETIME(3) NULL,
    `paid_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `earning_public_id_key`(`public_id`),
    INDEX `earning_job_id_status_idx`(`job_id`, `status`),
    INDEX `earning_worker_profile_id_status_idx`(`worker_profile_id`, `status`),
    UNIQUE INDEX `earning_job_id_worker_profile_id_key`(`job_id`, `worker_profile_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_transaction` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PROCESSING',
    `amount_paise` BIGINT NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'INR',
    `reference` VARCHAR(64) NOT NULL,
    `evidence_storage_key` VARCHAR(191) NULL,
    `recorded_by_account_id` BIGINT NULL,
    `paid_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `payment_transaction_public_id_key`(`public_id`),
    INDEX `payment_transaction_status_created_at_idx`(`status`, `created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_earning` (
    `earning_id` BIGINT NOT NULL,
    `payment_transaction_id` BIGINT NOT NULL,
    `amount_paise` BIGINT NOT NULL,

    PRIMARY KEY (`earning_id`, `payment_transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rating` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `job_id` BIGINT NOT NULL,
    `rater_account_id` BIGINT NOT NULL,
    `ratee_account_id` BIGINT NOT NULL,
    `rater_role` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL,
    `tags` JSON NULL,
    `comment` VARCHAR(300) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `rating_public_id_key`(`public_id`),
    INDEX `rating_ratee_account_id_idx`(`ratee_account_id`),
    UNIQUE INDEX `rating_job_id_rater_account_id_ratee_account_id_key`(`job_id`, `rater_account_id`, `ratee_account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `recipient_account_id` BIGINT NOT NULL,
    `event_key` VARCHAR(191) NOT NULL,
    `title_key` VARCHAR(191) NOT NULL,
    `body_params` JSON NULL,
    `context_type` VARCHAR(191) NULL,
    `context_public_id` VARCHAR(191) NULL,
    `read_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `notification_public_id_key`(`public_id`),
    INDEX `notification_recipient_account_id_read_at_created_at_idx`(`recipient_account_id`, `read_at`, `created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `complaint` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `submitter_account_id` BIGINT NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `severity` VARCHAR(191) NOT NULL DEFAULT 'MEDIUM',
    `status` VARCHAR(191) NOT NULL DEFAULT 'OPEN',
    `link_type` VARCHAR(191) NULL,
    `link_public_id` VARCHAR(191) NULL,
    `narrative` TEXT NOT NULL,
    `resolution_note` TEXT NULL,
    `resolved_by_account_id` BIGINT NULL,
    `resolved_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `complaint_public_id_key`(`public_id`),
    INDEX `complaint_status_severity_idx`(`status`, `severity`),
    INDEX `complaint_submitter_account_id_created_at_idx`(`submitter_account_id`, `created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `complaint_event` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `complaint_id` BIGINT NOT NULL,
    `actor_account_id` BIGINT NOT NULL,
    `kind` VARCHAR(191) NOT NULL,
    `body` TEXT NULL,
    `evidence_storage_key` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `complaint_event_complaint_id_created_at_idx`(`complaint_id`, `created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `availability_slot` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `worker_profile_id` BIGINT NOT NULL,
    `work_date` DATE NOT NULL,
    `from_time` TIME(0) NOT NULL,
    `to_time` TIME(0) NOT NULL,
    `area_id` BIGINT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'AVAILABLE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `availability_slot_work_date_area_id_idx`(`work_date`, `area_id`),
    UNIQUE INDEX `availability_slot_worker_profile_id_work_date_from_time_to_t_key`(`worker_profile_id`, `work_date`, `from_time`, `to_time`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification_outbox` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `event_key` VARCHAR(191) NOT NULL,
    `dedupe_key` VARCHAR(191) NOT NULL,
    `payload` JSON NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `attempts` INTEGER NOT NULL DEFAULT 0,
    `next_attempt_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `notification_outbox_dedupe_key_key`(`dedupe_key`),
    INDEX `notification_outbox_status_next_attempt_at_idx`(`status`, `next_attempt_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification_delivery` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `outbox_id` BIGINT NOT NULL,
    `recipient_account_id` BIGINT NOT NULL,
    `channel` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `provider_ref` VARCHAR(191) NULL,
    `error_code` VARCHAR(40) NULL,
    `attempted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `notification_delivery_outbox_id_channel_idx`(`outbox_id`, `channel`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification_pref` (
    `account_id` BIGINT NOT NULL,
    `push_enabled` BOOLEAN NOT NULL DEFAULT true,
    `sms_enabled` BOOLEAN NOT NULL DEFAULT true,
    `quiet_hours` VARCHAR(20) NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sms_log` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `phone_hash` VARCHAR(191) NOT NULL,
    `template_id` VARCHAR(191) NOT NULL,
    `purpose` VARCHAR(191) NOT NULL,
    `provider_ref` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `cost_paise` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `sms_log_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_log` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actor_account_id` BIGINT NULL,
    `actor_role` VARCHAR(191) NULL,
    `action` VARCHAR(80) NOT NULL,
    `entity_type` VARCHAR(40) NOT NULL,
    `entity_public_id` VARCHAR(30) NOT NULL,
    `before_json` JSON NULL,
    `after_json` JSON NULL,
    `request_id` VARCHAR(40) NULL,
    `ip_hash` VARCHAR(191) NULL,

    INDEX `audit_log_entity_type_entity_public_id_idx`(`entity_type`, `entity_public_id`),
    INDEX `audit_log_actor_account_id_at_idx`(`actor_account_id`, `at`),
    INDEX `audit_log_at_idx`(`at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sanction` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `account_id` BIGINT NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `reason` TEXT NOT NULL,
    `linked_complaint_id` BIGINT NULL,
    `issued_by_account_id` BIGINT NOT NULL,
    `starts_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ends_at` DATETIME(3) NULL,
    `lifted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `sanction_account_id_lifted_at_idx`(`account_id`, `lifted_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `platform_config` (
    `key` VARCHAR(191) NOT NULL,
    `value_json` JSON NOT NULL,
    `scope` VARCHAR(191) NOT NULL DEFAULT 'GLOBAL',
    `version` INTEGER NOT NULL DEFAULT 1,
    `updated_by_account_id` BIGINT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `idempotency_key` (
    `key` VARCHAR(191) NOT NULL,
    `account_id` BIGINT NOT NULL,
    `request_hash` VARCHAR(191) NOT NULL,
    `response_json` JSON NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'IN_PROGRESS',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires_at` DATETIME(3) NOT NULL,

    INDEX `idempotency_key_expires_at_idx`(`expires_at`),
    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `match_log` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `job_id` BIGINT NOT NULL,
    `requested_by_account_id` BIGINT NOT NULL,
    `candidates_json` JSON NOT NULL,
    `weights_version` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `match_log_job_id_created_at_idx`(`job_id`, `created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `worker_profile` ADD CONSTRAINT `worker_profile_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `worker_profile` ADD CONSTRAINT `worker_profile_area_id_fkey` FOREIGN KEY (`area_id`) REFERENCES `area`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employer_profile` ADD CONSTRAINT `employer_profile_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employer_profile` ADD CONSTRAINT `employer_profile_area_id_fkey` FOREIGN KEY (`area_id`) REFERENCES `area`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kyc_submission` ADD CONSTRAINT `kyc_submission_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kyc_submission` ADD CONSTRAINT `kyc_submission_decided_by_account_id_fkey` FOREIGN KEY (`decided_by_account_id`) REFERENCES `account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kyc_document` ADD CONSTRAINT `kyc_document_submission_id_fkey` FOREIGN KEY (`submission_id`) REFERENCES `kyc_submission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kyc_consent` ADD CONSTRAINT `kyc_consent_submission_id_fkey` FOREIGN KEY (`submission_id`) REFERENCES `kyc_submission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `document_access_log` ADD CONSTRAINT `document_access_log_document_id_fkey` FOREIGN KEY (`document_id`) REFERENCES `kyc_document`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `push_token` ADD CONSTRAINT `push_token_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_category` ADD CONSTRAINT `job_category_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `job_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skill` ADD CONSTRAINT `skill_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `job_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `worker_skill` ADD CONSTRAINT `worker_skill_worker_profile_id_fkey` FOREIGN KEY (`worker_profile_id`) REFERENCES `worker_profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `worker_skill` ADD CONSTRAINT `worker_skill_skill_id_fkey` FOREIGN KEY (`skill_id`) REFERENCES `skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job` ADD CONSTRAINT `job_employer_profile_id_fkey` FOREIGN KEY (`employer_profile_id`) REFERENCES `employer_profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job` ADD CONSTRAINT `job_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `job_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job` ADD CONSTRAINT `job_area_id_fkey` FOREIGN KEY (`area_id`) REFERENCES `area`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_work_day` ADD CONSTRAINT `job_work_day_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_skill` ADD CONSTRAINT `job_skill_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_skill` ADD CONSTRAINT `job_skill_skill_id_fkey` FOREIGN KEY (`skill_id`) REFERENCES `skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_welfare` ADD CONSTRAINT `job_welfare_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_welfare` ADD CONSTRAINT `job_welfare_welfare_item_id_fkey` FOREIGN KEY (`welfare_item_id`) REFERENCES `welfare_item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_worker_profile_id_fkey` FOREIGN KEY (`worker_profile_id`) REFERENCES `worker_profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_quick_match_offer_id_fkey` FOREIGN KEY (`quick_match_offer_id`) REFERENCES `quick_match_offer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quick_match_offer` ADD CONSTRAINT `quick_match_offer_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quick_match_offer` ADD CONSTRAINT `quick_match_offer_worker_profile_id_fkey` FOREIGN KEY (`worker_profile_id`) REFERENCES `worker_profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `crew_member` ADD CONSTRAINT `crew_member_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `crew_member` ADD CONSTRAINT `crew_member_application_id_fkey` FOREIGN KEY (`application_id`) REFERENCES `application`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `crew_member` ADD CONSTRAINT `crew_member_worker_profile_id_fkey` FOREIGN KEY (`worker_profile_id`) REFERENCES `worker_profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance_record` ADD CONSTRAINT `attendance_record_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance_record` ADD CONSTRAINT `attendance_record_work_day_id_fkey` FOREIGN KEY (`work_day_id`) REFERENCES `job_work_day`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance_record` ADD CONSTRAINT `attendance_record_worker_profile_id_fkey` FOREIGN KEY (`worker_profile_id`) REFERENCES `worker_profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance_record` ADD CONSTRAINT `attendance_record_crew_member_id_fkey` FOREIGN KEY (`crew_member_id`) REFERENCES `crew_member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `earning` ADD CONSTRAINT `earning_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `earning` ADD CONSTRAINT `earning_worker_profile_id_fkey` FOREIGN KEY (`worker_profile_id`) REFERENCES `worker_profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `earning` ADD CONSTRAINT `earning_hold_complaint_id_fkey` FOREIGN KEY (`hold_complaint_id`) REFERENCES `complaint`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_transaction` ADD CONSTRAINT `payment_transaction_recorded_by_account_id_fkey` FOREIGN KEY (`recorded_by_account_id`) REFERENCES `account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_earning` ADD CONSTRAINT `payment_earning_earning_id_fkey` FOREIGN KEY (`earning_id`) REFERENCES `earning`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_earning` ADD CONSTRAINT `payment_earning_payment_transaction_id_fkey` FOREIGN KEY (`payment_transaction_id`) REFERENCES `payment_transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `rating_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `rating_rater_account_id_fkey` FOREIGN KEY (`rater_account_id`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `rating_ratee_account_id_fkey` FOREIGN KEY (`ratee_account_id`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_recipient_account_id_fkey` FOREIGN KEY (`recipient_account_id`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `complaint` ADD CONSTRAINT `complaint_submitter_account_id_fkey` FOREIGN KEY (`submitter_account_id`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `complaint` ADD CONSTRAINT `complaint_resolved_by_account_id_fkey` FOREIGN KEY (`resolved_by_account_id`) REFERENCES `account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `complaint_event` ADD CONSTRAINT `complaint_event_complaint_id_fkey` FOREIGN KEY (`complaint_id`) REFERENCES `complaint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `complaint_event` ADD CONSTRAINT `complaint_event_actor_account_id_fkey` FOREIGN KEY (`actor_account_id`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `availability_slot` ADD CONSTRAINT `availability_slot_worker_profile_id_fkey` FOREIGN KEY (`worker_profile_id`) REFERENCES `worker_profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `availability_slot` ADD CONSTRAINT `availability_slot_area_id_fkey` FOREIGN KEY (`area_id`) REFERENCES `area`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification_delivery` ADD CONSTRAINT `notification_delivery_outbox_id_fkey` FOREIGN KEY (`outbox_id`) REFERENCES `notification_outbox`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification_pref` ADD CONSTRAINT `notification_pref_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_log` ADD CONSTRAINT `audit_log_actor_account_id_fkey` FOREIGN KEY (`actor_account_id`) REFERENCES `account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sanction` ADD CONSTRAINT `sanction_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sanction` ADD CONSTRAINT `sanction_issued_by_account_id_fkey` FOREIGN KEY (`issued_by_account_id`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sanction` ADD CONSTRAINT `sanction_linked_complaint_id_fkey` FOREIGN KEY (`linked_complaint_id`) REFERENCES `complaint`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `idempotency_key` ADD CONSTRAINT `idempotency_key_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_log` ADD CONSTRAINT `match_log_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_log` ADD CONSTRAINT `match_log_requested_by_account_id_fkey` FOREIGN KEY (`requested_by_account_id`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- ---------------------------------------------------------------------------
-- Post-SQL (Database/MIGRATION_PLAN.md §4) — CHECK constraints.
-- Prisma cannot express CHECK; the state machines (Database/STATE_MACHINES.md)
-- remain authoritative and these are the database backstop.
-- Applied inside 0001 per plan principle #3.
-- ---------------------------------------------------------------------------

ALTER TABLE `account` ADD CONSTRAINT `chk_account_role` CHECK (`role` IN ('worker','employer','admin'));
ALTER TABLE `account` ADD CONSTRAINT `chk_account_status` CHECK (`status` IN ('PENDING_VERIFICATION','ACTIVE','SUSPENDED','CLOSED'));
ALTER TABLE `employer_profile` ADD CONSTRAINT `chk_employer_profile_org_type` CHECK (`org_type` IN ('INDIVIDUAL','FIRM','COMPANY','GOVT','NGO'));
ALTER TABLE `kyc_submission` ADD CONSTRAINT `chk_kyc_submission_status` CHECK (`status` IN ('DRAFT','SUBMITTED','UNDER_REVIEW','VERIFIED','REJECTED'));
ALTER TABLE `kyc_submission` ADD CONSTRAINT `chk_kyc_submission_id_type` CHECK (`id_type` IN ('PAN','VOTER','DRIVING','PASSPORT'));
ALTER TABLE `kyc_document` ADD CONSTRAINT `chk_kyc_document_doc_type` CHECK (`doc_type` IN ('ID_FRONT','ID_BACK','SELFIE','ADDRESS_PROOF'));
ALTER TABLE `document_access_log` ADD CONSTRAINT `chk_document_access_log_action` CHECK (`action` IN ('VIEW','DOWNLOAD','DELETE'));
ALTER TABLE `otp_challenge` ADD CONSTRAINT `chk_otp_challenge_purpose` CHECK (`purpose` IN ('LOGIN','PHONE_CHANGE'));
ALTER TABLE `push_token` ADD CONSTRAINT `chk_push_token_platform` CHECK (`platform` IN ('ANDROID','IOS','WEB'));
ALTER TABLE `job` ADD CONSTRAINT `chk_job_dates` CHECK (`ends_on` >= `starts_on`);
ALTER TABLE `job` ADD CONSTRAINT `chk_job_pay_type` CHECK (`pay_type` IN ('HOUR','DAY','TOTAL'));
ALTER TABLE `job` ADD CONSTRAINT `chk_job_pay_amount` CHECK (`pay_amount_paise` > 0);
ALTER TABLE `job` ADD CONSTRAINT `chk_job_headcount` CHECK (`headcount_required` > 0);
ALTER TABLE `job` ADD CONSTRAINT `chk_job_status` CHECK (`status` IN ('DRAFT','OPEN','HIRING','FILLED','IN_PROGRESS','COMPLETED','CLOSED','CANCELLED','EXPIRED'));
ALTER TABLE `application` ADD CONSTRAINT `chk_application_status` CHECK (`status` IN ('APPLIED','SHORTLISTED','WAITLISTED','HIRED','REJECTED','WITHDRAWN','CANCELLED','EXPIRED'));
ALTER TABLE `application` ADD CONSTRAINT `chk_application_source` CHECK (`source` IN ('APPLY','QUICK_MATCH'));
ALTER TABLE `quick_match_offer` ADD CONSTRAINT `chk_quick_match_offer_status` CHECK (`status` IN ('PENDING','ACCEPTED','DECLINED','EXPIRED','CANCELLED'));
ALTER TABLE `crew_member` ADD CONSTRAINT `chk_crew_member_status` CHECK (`status` IN ('ACTIVE','COMPLETED','RELEASED','NO_SHOW'));
ALTER TABLE `attendance_record` ADD CONSTRAINT `chk_attendance_record_status` CHECK (`status` IN ('NOT_STARTED','CHECKED_IN','CHECKED_OUT','APPROVED','NO_SHOW'));
ALTER TABLE `attendance_record` ADD CONSTRAINT `chk_attendance_record_check_source` CHECK (`check_source` IS NULL OR `check_source` IN ('SCAN','EMPLOYER','CORRECTED'));
ALTER TABLE `earning` ADD CONSTRAINT `chk_earning_status` CHECK (`status` IN ('PENDING','ELIGIBLE','APPROVED','PROCESSING','PAID','FAILED','ON_HOLD','CANCELLED'));
ALTER TABLE `earning` ADD CONSTRAINT `chk_earning_currency` CHECK (`currency` = 'INR');
ALTER TABLE `payment_transaction` ADD CONSTRAINT `chk_payment_transaction_status` CHECK (`status` IN ('PROCESSING','PAID','FAILED'));
ALTER TABLE `rating` ADD CONSTRAINT `chk_rating_rater_role` CHECK (`rater_role` IN ('WORKER','EMPLOYER'));
ALTER TABLE `rating` ADD CONSTRAINT `chk_rating_score` CHECK (`score` BETWEEN 1 AND 5);
ALTER TABLE `complaint` ADD CONSTRAINT `chk_complaint_type` CHECK (`type` IN ('PAYMENT','SAFETY','HARASSMENT','NO_SHOW','FRAUD','OTHER'));
ALTER TABLE `complaint` ADD CONSTRAINT `chk_complaint_severity` CHECK (`severity` IN ('LOW','MEDIUM','HIGH'));
ALTER TABLE `complaint` ADD CONSTRAINT `chk_complaint_status` CHECK (`status` IN ('OPEN','UNDER_REVIEW','WAITING_ON_PARTY','RESOLVED','DISMISSED','CLOSED_TIMEOUT'));
ALTER TABLE `complaint` ADD CONSTRAINT `chk_complaint_link_type` CHECK (`link_type` IS NULL OR `link_type` IN ('JOB','APPLICATION','EARNING','ATTENDANCE','ACCOUNT'));
ALTER TABLE `complaint` ADD CONSTRAINT `chk_complaint_link_pair` CHECK ((`link_type` IS NULL AND `link_public_id` IS NULL) OR (`link_type` IS NOT NULL AND `link_public_id` IS NOT NULL));
ALTER TABLE `complaint_event` ADD CONSTRAINT `chk_complaint_event_kind` CHECK (`kind` IN ('NOTE','PARTY_REPLY','STATUS_CHANGE','EVIDENCE'));
ALTER TABLE `availability_slot` ADD CONSTRAINT `chk_availability_slot_status` CHECK (`status` IN ('AVAILABLE','BOOKED_HINT'));
ALTER TABLE `notification_outbox` ADD CONSTRAINT `chk_notification_outbox_status` CHECK (`status` IN ('PENDING','SENDING','SENT','FAILED','DEAD'));
ALTER TABLE `notification_delivery` ADD CONSTRAINT `chk_notification_delivery_channel` CHECK (`channel` IN ('INAPP','PUSH','SMS','EMAIL'));
ALTER TABLE `notification_delivery` ADD CONSTRAINT `chk_notification_delivery_status` CHECK (`status` IN ('PENDING','SENT','FAILED','SKIPPED'));
ALTER TABLE `sanction` ADD CONSTRAINT `chk_sanction_type` CHECK (`type` IN ('WARN','SUSPEND','BAN','PAYMENT_HOLD'));
ALTER TABLE `idempotency_key` ADD CONSTRAINT `chk_idempotency_key_status` CHECK (`status` IN ('IN_PROGRESS','DONE'));
