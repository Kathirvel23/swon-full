-- Wave 1: availability_slot gains public_id like every other entity exposed
-- through the API (contracts availabilitySlotDtoSchema.publicId).
-- Table is empty at apply time; new rows get cuid() from Prisma client.
ALTER TABLE `availability_slot` ADD COLUMN `public_id` VARCHAR(191) NOT NULL;

CREATE UNIQUE INDEX `availability_slot_public_id_key` ON `availability_slot`(`public_id`);
