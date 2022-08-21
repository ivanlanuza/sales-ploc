-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `auth` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `nextActionId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActionType` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `visibleSequence` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Field` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `options` VARCHAR(191) NULL,
    `actiontypeId` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NULL DEFAULT '',
    `fieldType` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActionTypeOnStatus` (
    `id` VARCHAR(191) NOT NULL,
    `actionId` VARCHAR(191) NOT NULL,
    `statusId` VARCHAR(191) NOT NULL,
    `nextStatusId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `other_name` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `statusId` VARCHAR(191) NOT NULL,
    `segmentId` VARCHAR(191) NOT NULL,
    `sourceId` VARCHAR(191) NOT NULL,
    `businesstypeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `address` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Segment` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Source` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BusinessType` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `segmentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactInfo` (
    `id` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `mobile` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `role` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `isPrimary` BOOLEAN NOT NULL DEFAULT false,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `isObsolete` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Action` (
    `id` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actiontypeId` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `businessDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActionData` (
    `id` VARCHAR(191) NOT NULL,
    `actionId` VARCHAR(191) NOT NULL,
    `fieldId` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Field` ADD CONSTRAINT `Field_actiontypeId_fkey` FOREIGN KEY (`actiontypeId`) REFERENCES `ActionType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActionTypeOnStatus` ADD CONSTRAINT `ActionTypeOnStatus_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActionTypeOnStatus` ADD CONSTRAINT `ActionTypeOnStatus_actionId_fkey` FOREIGN KEY (`actionId`) REFERENCES `ActionType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_segmentId_fkey` FOREIGN KEY (`segmentId`) REFERENCES `Segment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_sourceId_fkey` FOREIGN KEY (`sourceId`) REFERENCES `Source`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_businesstypeId_fkey` FOREIGN KEY (`businesstypeId`) REFERENCES `BusinessType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BusinessType` ADD CONSTRAINT `BusinessType_segmentId_fkey` FOREIGN KEY (`segmentId`) REFERENCES `Segment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactInfo` ADD CONSTRAINT `ContactInfo_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Action` ADD CONSTRAINT `Action_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Action` ADD CONSTRAINT `Action_actiontypeId_fkey` FOREIGN KEY (`actiontypeId`) REFERENCES `ActionType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Action` ADD CONSTRAINT `Action_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActionData` ADD CONSTRAINT `ActionData_fieldId_fkey` FOREIGN KEY (`fieldId`) REFERENCES `Field`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActionData` ADD CONSTRAINT `ActionData_actionId_fkey` FOREIGN KEY (`actionId`) REFERENCES `Action`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
