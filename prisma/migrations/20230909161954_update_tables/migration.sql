/*
  Warnings:

  - You are about to drop the column `content` on the `Case` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ticket]` on the table `Case` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CLIENTE', 'ASESOR');

-- CreateEnum
CREATE TYPE "caseStatus" AS ENUM ('PENDIENTE', 'FINALIZADO');

-- CreateEnum
CREATE TYPE "caseType" AS ENUM ('FELICITACIONES', 'RECLAMOS', 'QUEJAS', 'SOLICITUDES');

-- AlterTable
ALTER TABLE "Case" DROP COLUMN "content",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "status" "caseStatus" NOT NULL,
ADD COLUMN     "ticket" TEXT NOT NULL,
ADD COLUMN     "type" "caseType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'CLIENTE';

-- CreateIndex
CREATE UNIQUE INDEX "Case_ticket_key" ON "Case"("ticket");
