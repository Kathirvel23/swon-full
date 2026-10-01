-- L7: a decided complaint may be reopened exactly once; the timestamp is
-- the proof (NULL = never reopened).
ALTER TABLE `complaint`
  ADD COLUMN `reopened_at` DATETIME(3) NULL;
