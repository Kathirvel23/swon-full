-- WorkBridge seed reference data — Database/SEED_DATA.md (DRAFT: owner to confirm lists)
-- Idempotent (ON DUPLICATE KEY UPDATE) — safe to re-run. No fake people/jobs (SEED §6).
-- Timestamp sorts after 0001_init; applied by `prisma migrate dev`.

-- ---------------------------------------------------------------------------
-- §3 Location reference — launch cities Coimbatore + Tiruppur (draft lists)
-- ---------------------------------------------------------------------------
INSERT INTO `area` (`public_id`, `city`, `name`, `sort_order`) VALUES
  ('area_cbe_singanallur',      'Coimbatore', 'Singanallur',        1),
  ('area_cbe_ganapathy',        'Coimbatore', 'Ganapathy',          2),
  ('area_cbe_peelamedu',        'Coimbatore', 'Peelamedu',          3),
  ('area_cbe_rs_puram',         'Coimbatore', 'R.S. Puram',         4),
  ('area_cbe_saibaba_colony',   'Coimbatore', 'Saibaba Colony',     5),
  ('area_cbe_kuniamuthur',      'Coimbatore', 'Kuniamuthur',        6),
  ('area_cbe_pollachi_road',    'Coimbatore', 'Pollachi Road',      7),
  ('area_cbe_sidco_kurichi',    'Coimbatore', 'SIDCO Kurichi',      8),
  ('area_cbe_vadavalli',        'Coimbatore', 'Vadavalli',          9),
  ('area_cbe_race_course',      'Coimbatore', 'Race Course',       10),
  ('area_cbe_gandhipuram',      'Coimbatore', 'Gandhipuram',       11),
  ('area_cbe_ukkadam',          'Coimbatore', 'Ukkadam',           12),
  ('area_cbe_kuniamuthur_idc',  'Coimbatore', 'Kuniamuthur IDC',   13),
  ('area_cbe_perur',            'Coimbatore', 'Perur',             14),
  ('area_cbe_sulur',            'Coimbatore', 'Sulur',             15),
  ('area_tup_avinashi',         'Tiruppur',   'Avinashi',           1),
  ('area_tup_kangayam_road',    'Tiruppur',   'Kangayam Road',      2),
  ('area_tup_nehru_nagar',      'Tiruppur',   'Nehru Nagar',        3),
  ('area_tup_thirumuruganpoondi', 'Tiruppur', 'Thirumuruganpoondi', 4),
  ('area_tup_palladam_road',    'Tiruppur',   'Palladam Road',      5),
  ('area_tup_porcupillai',      'Tiruppur',   'Porcupillai',        6),
  ('area_tup_mangalam',         'Tiruppur',   'Mangalam',           7),
  ('area_tup_udumalpet_road',   'Tiruppur',   'Udumalpet Road',     8),
  ('area_tup_kangeyam',         'Tiruppur',   'Kangeyam',           9),
  ('area_tup_dharapuram_road',  'Tiruppur',   'Dharapuram Road',   10)
ON DUPLICATE KEY UPDATE `sort_order` = VALUES(`sort_order`), `active` = TRUE;

-- ---------------------------------------------------------------------------
-- §1 Job categories — 12 parent domains
-- ---------------------------------------------------------------------------
INSERT INTO `job_category` (`public_id`, `code`, `name`, `sort_order`) VALUES
  ('cat_domain_event',          'EVENT',          'Events & Weddings',   1),
  ('cat_domain_hospitality',    'HOSPITALITY',    'Hotels & Catering',   2),
  ('cat_domain_retail',         'RETAIL',         'Retail & Showroom',   3),
  ('cat_domain_warehouse',      'WAREHOUSE',      'Warehouse & Loading', 4),
  ('cat_domain_logistics',      'LOGISTICS',      'Delivery & Logistics',5),
  ('cat_domain_construction',   'CONSTRUCTION',   'Construction & Labour', 6),
  ('cat_domain_manufacturing',  'MANUFACTURING',  'Manufacturing & Units', 7),
  ('cat_domain_housekeeping',   'HOUSEKEEPING',   'Housekeeping & Cleaning', 8),
  ('cat_domain_healthcare',     'HEALTHCARE_SUPPORT', 'Healthcare Support', 9),
  ('cat_domain_security',       'SECURITY',       'Security & Surveillance', 10),
  ('cat_domain_promotion',      'PROMOTION',      'Promotions & Field Sales', 11),
  ('cat_domain_transport',      'TRANSPORT',      'Drivers & Transport', 12)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `sort_order` = VALUES(`sort_order`);

-- Leaves per domain (parent_id resolved by join). Codes: <DOMAIN>_<LEAF>.
INSERT INTO `job_category` (`public_id`, `code`, `name`, `parent_id`, `sort_order`)
SELECT CONCAT('cat_leaf_', LOWER(x.code)), x.code, x.name, p.id, x.ord
FROM (
  SELECT 'EVENT_CATERING_SERVICE' AS code, 'Catering Service' AS name, 1 AS ord
  UNION ALL SELECT 'EVENT_WAITER_SERVICE', 'Waiter/Service', 2
  UNION ALL SELECT 'EVENT_DECORATION', 'Decoration', 3
  UNION ALL SELECT 'EVENT_SOUND_AV_HELPER', 'Sound/AV Helper', 4
  UNION ALL SELECT 'EVENT_PHOTOGRAPHY_HELPER', 'Photography Helper', 5
  UNION ALL SELECT 'EVENT_HOUSEKEEPING', 'Housekeeping (event)', 6
) x JOIN `job_category` p ON p.code = 'EVENT'
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `parent_id` = VALUES(`parent_id`);

INSERT INTO `job_category` (`public_id`, `code`, `name`, `parent_id`, `sort_order`)
SELECT CONCAT('cat_leaf_', LOWER(x.code)), x.code, x.name, p.id, x.ord
FROM (
  SELECT 'HOSPITALITY_KITCHEN_HELPER' AS code, 'Kitchen Helper' AS name, 1 AS ord
  UNION ALL SELECT 'HOSPITALITY_STEWARD', 'Steward', 2
  UNION ALL SELECT 'HOSPITALITY_ROOM_ATTENDANT', 'Room Attendant', 3
  UNION ALL SELECT 'HOSPITALITY_DISHWASHER', 'Dishwasher', 4
) x JOIN `job_category` p ON p.code = 'HOSPITALITY'
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `parent_id` = VALUES(`parent_id`);

INSERT INTO `job_category` (`public_id`, `code`, `name`, `parent_id`, `sort_order`)
SELECT CONCAT('cat_leaf_', LOWER(x.code)), x.code, x.name, p.id, x.ord
FROM (
  SELECT 'RETAIL_SALES_ASSISTANT' AS code, 'Sales Assistant' AS name, 1 AS ord
  UNION ALL SELECT 'RETAIL_PROMOTER', 'Promoter', 2
  UNION ALL SELECT 'RETAIL_CASHIER_HELPER', 'Cashier Helper', 3
  UNION ALL SELECT 'RETAIL_STOCK_COUNT', 'Stock Count', 4
) x JOIN `job_category` p ON p.code = 'RETAIL'
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `parent_id` = VALUES(`parent_id`);

INSERT INTO `job_category` (`public_id`, `code`, `name`, `parent_id`, `sort_order`)
SELECT CONCAT('cat_leaf_', LOWER(x.code)), x.code, x.name, p.id, x.ord
FROM (
  SELECT 'WAREHOUSE_LOADER_UNLOADER' AS code, 'Loader/Unloader' AS name, 1 AS ord
  UNION ALL SELECT 'WAREHOUSE_PACKER', 'Packer', 2
  UNION ALL SELECT 'WAREHOUSE_FORKLIFT_HELPER', 'Forklift Helper', 3
  UNION ALL SELECT 'WAREHOUSE_INVENTORY_COUNT', 'Inventory Count', 4
) x JOIN `job_category` p ON p.code = 'WAREHOUSE'
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `parent_id` = VALUES(`parent_id`);

INSERT INTO `job_category` (`public_id`, `code`, `name`, `parent_id`, `sort_order`)
SELECT CONCAT('cat_leaf_', LOWER(x.code)), x.code, x.name, p.id, x.ord
FROM (
  SELECT 'LOGISTICS_DELIVERY_EXECUTIVE' AS code, 'Delivery Executive' AS name, 1 AS ord
  UNION ALL SELECT 'LOGISTICS_LOADER', 'Loader', 2
  UNION ALL SELECT 'LOGISTICS_VEHICLE_CLEANER', 'Vehicle Cleaner', 3
) x JOIN `job_category` p ON p.code = 'LOGISTICS'
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `parent_id` = VALUES(`parent_id`);

INSERT INTO `job_category` (`public_id`, `code`, `name`, `parent_id`, `sort_order`)
SELECT CONCAT('cat_leaf_', LOWER(x.code)), x.code, x.name, p.id, x.ord
FROM (
  SELECT 'CONSTRUCTION_MASON_HELPER' AS code, 'Mason Helper' AS name, 1 AS ord
  UNION ALL SELECT 'CONSTRUCTION_PAINTER_HELPER', 'Painter Helper', 2
  UNION ALL SELECT 'CONSTRUCTION_ELECTRICIAN_HELPER', 'Electrician Helper', 3
  UNION ALL SELECT 'CONSTRUCTION_PLUMBER_HELPER', 'Plumber Helper', 4
) x JOIN `job_category` p ON p.code = 'CONSTRUCTION'
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `parent_id` = VALUES(`parent_id`);

INSERT INTO `job_category` (`public_id`, `code`, `name`, `parent_id`, `sort_order`)
SELECT CONCAT('cat_leaf_', LOWER(x.code)), x.code, x.name, p.id, x.ord
FROM (
  SELECT 'MANUFACTURING_MACHINE_OPERATOR' AS code, 'Machine Operator' AS name, 1 AS ord
  UNION ALL SELECT 'MANUFACTURING_PACKING_OPERATOR', 'Packing Operator', 2
  UNION ALL SELECT 'MANUFACTURING_QUALITY_CHECKER', 'Quality Checker', 3
  UNION ALL SELECT 'MANUFACTURING_SHIFT_HELPER', 'Shift Helper', 4
) x JOIN `job_category` p ON p.code = 'MANUFACTURING'
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `parent_id` = VALUES(`parent_id`);

INSERT INTO `job_category` (`public_id`, `code`, `name`, `parent_id`, `sort_order`)
SELECT CONCAT('cat_leaf_', LOWER(x.code)), x.code, x.name, p.id, x.ord
FROM (
  SELECT 'HOUSEKEEPING_CLEANER' AS code, 'Cleaner' AS name, 1 AS ord
  UNION ALL SELECT 'HOUSEKEEPING_SANITATION_WORKER', 'Sanitation Worker', 2
  UNION ALL SELECT 'HOUSEKEEPING_OFFICE_BOY', 'Office Boy', 3
) x JOIN `job_category` p ON p.code = 'HOUSEKEEPING'
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `parent_id` = VALUES(`parent_id`);

INSERT INTO `job_category` (`public_id`, `code`, `name`, `parent_id`, `sort_order`)
SELECT CONCAT('cat_leaf_', LOWER(x.code)), x.code, x.name, p.id, x.ord
FROM (
  SELECT 'HEALTHCARE_SUPPORT_PATIENT_ATTENDANT' AS code, 'Patient Attendant' AS name, 1 AS ord
  UNION ALL SELECT 'HEALTHCARE_SUPPORT_WARD_HELPER', 'Ward Helper', 2
  UNION ALL SELECT 'HEALTHCARE_SUPPORT_AMBULANCE_HELPER', 'Ambulance Helper', 3
) x JOIN `job_category` p ON p.code = 'HEALTHCARE_SUPPORT'
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `parent_id` = VALUES(`parent_id`);

INSERT INTO `job_category` (`public_id`, `code`, `name`, `parent_id`, `sort_order`)
SELECT CONCAT('cat_leaf_', LOWER(x.code)), x.code, x.name, p.id, x.ord
FROM (
  SELECT 'SECURITY_SECURITY_GUARD' AS code, 'Security Guard' AS name, 1 AS ord
  UNION ALL SELECT 'SECURITY_BOUNCER', 'Bouncer', 2
) x JOIN `job_category` p ON p.code = 'SECURITY'
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `parent_id` = VALUES(`parent_id`);

INSERT INTO `job_category` (`public_id`, `code`, `name`, `parent_id`, `sort_order`)
SELECT CONCAT('cat_leaf_', LOWER(x.code)), x.code, x.name, p.id, x.ord
FROM (
  SELECT 'PROMOTION_FLYER_DISTRIBUTOR' AS code, 'Flyer Distributor' AS name, 1 AS ord
  UNION ALL SELECT 'PROMOTION_BRAND_PROMOTER', 'Brand Promoter', 2
  UNION ALL SELECT 'PROMOTION_SURVEY_COLLECTOR', 'Survey Collector', 3
) x JOIN `job_category` p ON p.code = 'PROMOTION'
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `parent_id` = VALUES(`parent_id`);

INSERT INTO `job_category` (`public_id`, `code`, `name`, `parent_id`, `sort_order`)
SELECT CONCAT('cat_leaf_', LOWER(x.code)), x.code, x.name, p.id, x.ord
FROM (
  SELECT 'TRANSPORT_DELIVERY_DRIVER' AS code, 'Delivery Driver' AS name, 1 AS ord
  UNION ALL SELECT 'TRANSPORT_LOADER_DRIVER', 'Loader-driver', 2
  UNION ALL SELECT 'TRANSPORT_AUTO_TEMPO_HELPER', 'Auto/Tempo Helper', 3
) x JOIN `job_category` p ON p.code = 'TRANSPORT'
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `parent_id` = VALUES(`parent_id`);

-- ---------------------------------------------------------------------------
-- §4 Skills starter set (dedupes by code — ON DUPLICATE KEY)
-- ---------------------------------------------------------------------------
INSERT INTO `skill` (`public_id`, `code`, `name`) VALUES
  ('sk_catering_service', 'CATERING_SERVICE', 'Catering Service'),
  ('sk_waiter', 'WAITER', 'Waiter'),
  ('sk_kitchen_helper', 'KITCHEN_HELPER', 'Kitchen Helper'),
  ('sk_dishwasher', 'DISHWASHER', 'Dishwasher'),
  ('sk_housekeeping', 'HOUSEKEEPING', 'Housekeeping'),
  ('sk_cleaning', 'CLEANING', 'Cleaning'),
  ('sk_mopping', 'MOPPING', 'Mopping'),
  ('sk_decoration', 'DECORATION', 'Decoration'),
  ('sk_sound_av', 'SOUND_AV', 'Sound/AV'),
  ('sk_photography_helper', 'PHOTOGRAPHY_HELPER', 'Photography Helper'),
  ('sk_loading', 'LOADING', 'Loading'),
  ('sk_unloading', 'UNLOADING', 'Unloading'),
  ('sk_packing', 'PACKING', 'Packing'),
  ('sk_packer', 'PACKER', 'Packer'),
  ('sk_forklift_helper', 'FORKLIFT_HELPER', 'Forklift Helper'),
  ('sk_sales', 'SALES', 'Sales'),
  ('sk_promoter', 'PROMOTER', 'Promoter'),
  ('sk_flyer_distribution', 'FLYER_DISTRIBUTION', 'Flyer Distribution'),
  ('sk_survey', 'SURVEY', 'Survey'),
  ('sk_mason_helper', 'MASON_HELPER', 'Mason Helper'),
  ('sk_painter_helper', 'PAINTER_HELPER', 'Painter Helper'),
  ('sk_electrician_helper', 'ELECTRICIAN_HELPER', 'Electrician Helper'),
  ('sk_plumber_helper', 'PLUMBER_HELPER', 'Plumber Helper'),
  ('sk_machine_operator', 'MACHINE_OPERATOR', 'Machine Operator'),
  ('sk_quality_check', 'QUALITY_CHECK', 'Quality Check'),
  ('sk_packing_operator', 'PACKING_OPERATOR', 'Packing Operator'),
  ('sk_security_guard', 'SECURITY_GUARD', 'Security Guard'),
  ('sk_bouncer', 'BOUNCER', 'Bouncer'),
  ('sk_patient_attendant', 'PATIENT_ATTENDANT', 'Patient Attendant'),
  ('sk_delivery', 'DELIVERY', 'Delivery'),
  ('sk_driving_lmv', 'DRIVING_LMV', 'Driving (LMV)'),
  ('sk_steward', 'STEWARD', 'Steward'),
  ('sk_room_attendant', 'ROOM_ATTENDANT', 'Room Attendant'),
  ('sk_inventory_count', 'INVENTORY_COUNT', 'Inventory Count'),
  ('sk_cashier', 'CASHIER', 'Cashier'),
  ('sk_data_entry_helper', 'DATA_ENTRY_HELPER', 'Data-entry Helper'),
  ('sk_office_boy', 'OFFICE_BOY', 'Office Boy')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- ---------------------------------------------------------------------------
-- §2 Welfare taxonomy (M5 — fixed codes)
-- ---------------------------------------------------------------------------
INSERT INTO `welfare_item` (`public_id`, `code`, `label`, `sort_order`) VALUES
  ('wf_meal_provided',    'MEAL_PROVIDED',      'Meal provided',              1),
  ('wf_drinking_water',   'DRINKING_WATER',     'Drinking water provided',    2),
  ('wf_rest_area',        'REST_AREA',          'Rest area available',        3),
  ('wf_first_aid',        'FIRST_AID',          'First-aid available',        4),
  ('wf_safe_transport',   'SAFE_TRANSPORT',     'Safe transport home (late shift)', 5),
  ('wf_shoe_glove',       'SHOE_GLOVE_REQUIRED','Safety shoes/gloves required (given)', 6),
  ('wf_posh_aware',       'POSH_AWARE',         'Workplace conduct rules displayed', 7),
  ('wf_shade_break',      'SHADE_BREAK',        'Shade + regular breaks (outdoor work)', 8),
  ('wf_pay_day_info',     'PAY_DAY_INFO',       'Pay day clearly stated',     9)
ON DUPLICATE KEY UPDATE `label` = VALUES(`label`), `sort_order` = VALUES(`sort_order`);

-- ---------------------------------------------------------------------------
-- §5 Platform config seeds (owner sign-off at gate for MATCH_WEIGHTS)
-- ---------------------------------------------------------------------------
INSERT INTO `platform_config` (`key`, `value_json`, `updated_at`) VALUES
  ('MATCH_WEIGHTS', '{"location":30,"availability":25,"skills":20,"rating":15,"reliability":10}', NOW()),
  ('QUICKMATCH_EXPIRY_SEC', '1800', NOW()),
  ('QUICKMATCH_WAVE_MULTIPLIER', '{"value":2,"cap":10}', NOW()),
  ('OTP_MAX_ATTEMPTS', '5', NOW()),
  ('OTP_TTL_SEC', '120', NOW()),
  ('OTP_COOLDOWN_SEC', '60', NOW()),
  ('KYC_ATTEMPT_CAP', '3', NOW()),
  ('RATING_WINDOW_DAYS', '14', NOW()),
  ('GRACE_DAYS_CLOSE', '7', NOW()),
  ('ATTENDANCE_TOKEN_TTL_SEC', '60', NOW()),
  ('ATTENDANCE_AUTO_CLOSE_GRACE_MIN', '30', NOW()),
  ('COMPLAINT_PARTY_TIMEOUT_DAYS', '7', NOW())
ON DUPLICATE KEY UPDATE `value_json` = VALUES(`value_json`), `updated_at` = NOW();
