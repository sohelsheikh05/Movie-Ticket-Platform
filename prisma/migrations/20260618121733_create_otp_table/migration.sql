-- CreateTable
CREATE TABLE `OTP` (
    `phone` INTEGER NOT NULL,
    `otp` INTEGER NOT NULL,

    UNIQUE INDEX `OTP_phone_otp_key`(`phone`, `otp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
