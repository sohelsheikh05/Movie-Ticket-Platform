-- CreateTable
CREATE TABLE `Booking` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `bookingTime` DATETIME(3) NOT NULL,
    `totalAmount` DECIMAL(65, 30) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED') NOT NULL,
    `showId` VARCHAR(191) NOT NULL,

    INDEX `Booking_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookingSeat` (
    `id` VARCHAR(191) NOT NULL,
    `bookingId` VARCHAR(191) NOT NULL,
    `showSeatId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BookingSeat_showSeatId_key`(`showSeatId`),
    INDEX `BookingSeat_bookingId_idx`(`bookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShowSeat` (
    `id` VARCHAR(191) NOT NULL,
    `showId` VARCHAR(191) NOT NULL,
    `seatId` VARCHAR(191) NOT NULL,
    `status` ENUM('AVAILABLE', 'LOCKED', 'BOOKED') NOT NULL,

    INDEX `ShowSeat_showId_idx`(`showId`),
    UNIQUE INDEX `ShowSeat_showId_seatId_key`(`showId`, `seatId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Show` (
    `id` VARCHAR(191) NOT NULL,
    `movie_id` VARCHAR(191) NOT NULL,
    `screen_id` VARCHAR(191) NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,

    INDEX `Show_movie_id_idx`(`movie_id`),
    INDEX `Show_screen_id_idx`(`screen_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShowSeatPricing` (
    `id` VARCHAR(191) NOT NULL,
    `showId` VARCHAR(191) NOT NULL,
    `seatType` ENUM('STANDARD', 'PREMIUM', 'BALCONY') NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,

    UNIQUE INDEX `ShowSeatPricing_showId_seatType_key`(`showId`, `seatType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seat` (
    `id` VARCHAR(191) NOT NULL,
    `screenId` VARCHAR(191) NOT NULL,
    `seatNumber` VARCHAR(191) NOT NULL,
    `seatType` ENUM('STANDARD', 'PREMIUM', 'BALCONY') NOT NULL,

    UNIQUE INDEX `Seat_screenId_seatNumber_key`(`screenId`, `seatNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movie` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `releaseDate` DATETIME(3) NOT NULL,
    `rating` DECIMAL(65, 30) NOT NULL,
    `cast` VARCHAR(191) NOT NULL,
    `director` VARCHAR(191) NOT NULL,
    `producer` VARCHAR(191) NOT NULL,
    `durationMinutes` INTEGER NOT NULL,
    `language` VARCHAR(191) NOT NULL,

    INDEX `Movie_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Screen` (
    `id` VARCHAR(191) NOT NULL,
    `screenNumber` INTEGER NOT NULL,
    `theatreId` VARCHAR(191) NOT NULL,

    INDEX `Screen_theatreId_idx`(`theatreId`),
    UNIQUE INDEX `Screen_theatreId_screenNumber_key`(`theatreId`, `screenNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Theatre` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_showId_fkey` FOREIGN KEY (`showId`) REFERENCES `Show`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingSeat` ADD CONSTRAINT `BookingSeat_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingSeat` ADD CONSTRAINT `BookingSeat_showSeatId_fkey` FOREIGN KEY (`showSeatId`) REFERENCES `ShowSeat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShowSeat` ADD CONSTRAINT `ShowSeat_showId_fkey` FOREIGN KEY (`showId`) REFERENCES `Show`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShowSeat` ADD CONSTRAINT `ShowSeat_seatId_fkey` FOREIGN KEY (`seatId`) REFERENCES `Seat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Show` ADD CONSTRAINT `Show_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Show` ADD CONSTRAINT `Show_screen_id_fkey` FOREIGN KEY (`screen_id`) REFERENCES `Screen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShowSeatPricing` ADD CONSTRAINT `ShowSeatPricing_showId_fkey` FOREIGN KEY (`showId`) REFERENCES `Show`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_screenId_fkey` FOREIGN KEY (`screenId`) REFERENCES `Screen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Screen` ADD CONSTRAINT `Screen_theatreId_fkey` FOREIGN KEY (`theatreId`) REFERENCES `Theatre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
