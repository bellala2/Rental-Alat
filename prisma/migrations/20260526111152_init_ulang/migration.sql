-- CreateTable
CREATE TABLE `penyewa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `no_hp` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Penyewa_nohp_key`(`no_hp`),
    UNIQUE INDEX `Penyewa_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_alat` VARCHAR(191) NOT NULL,
    `harga_sewa` INTEGER NOT NULL,
    `stok` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peminjaman` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `penyewaId` INTEGER NOT NULL,
    `alatId` INTEGER NOT NULL,
    `lama_sewa` INTEGER NOT NULL,
    `total_harga` INTEGER NOT NULL,
    `tanggalPinjam` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tanggalKembali` DATETIME(3) NULL,
    `status` ENUM('DISEWA', 'DIKEMBALIKAN') NOT NULL DEFAULT 'DISEWA',

    INDEX `Peminjaman_alatId_fkey`(`alatId`),
    INDEX `Peminjaman_penyewaId_fkey`(`penyewaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengembalian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `peminjamanId` INTEGER NOT NULL,
    `tanggalKembali` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `totalDenda` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Pengembalian_peminjamanId_key`(`peminjamanId`),
    INDEX `Pengembalian_peminjamanId_idx`(`peminjamanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'PETUGAS', 'PEMBELI') NOT NULL DEFAULT 'PEMBELI',
    `penyewaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_penyewaId_key`(`penyewaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `Peminjaman_alatId_fkey` FOREIGN KEY (`alatId`) REFERENCES `alat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `Peminjaman_penyewaId_fkey` FOREIGN KEY (`penyewaId`) REFERENCES `penyewa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengembalian` ADD CONSTRAINT `Pengembalian_peminjamanId_fkey` FOREIGN KEY (`peminjamanId`) REFERENCES `peminjaman`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `User_penyewaId_fkey` FOREIGN KEY (`penyewaId`) REFERENCES `penyewa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
