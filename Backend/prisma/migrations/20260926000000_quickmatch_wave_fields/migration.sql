-- Quick Match wave details surfaced by the offer DTO (§14 row 13): the
-- requirement snapshot, the availability window the worker must show up in,
-- and the distance band label used in the UI (V1 label, not an exact pin).
ALTER TABLE `quick_match_offer`
  ADD COLUMN `requirement_snapshot` VARCHAR(255) NULL,
  ADD COLUMN `window_start` DATETIME(3) NULL,
  ADD COLUMN `window_end` DATETIME(3) NULL,
  ADD COLUMN `distance_band` VARCHAR(32) NOT NULL DEFAULT 'same-city';
