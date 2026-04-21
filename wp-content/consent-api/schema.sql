-- Prefixo ajustado ao WordPress deste site (wpxi_).
-- Execute no phpMyAdmin, DBeaver ou cliente MySQL após backup.

CREATE TABLE IF NOT EXISTS `wpxi_ippenha_lgpd_consent` (
  `consent_token` char(64) NOT NULL,
  `consent_value` varchar(16) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`consent_token`),
  KEY `idx_updated` (`updated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
