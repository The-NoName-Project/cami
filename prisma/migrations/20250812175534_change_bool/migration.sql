/*
  Warnings:

  - Changed the type of `ability` on the `Tools` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Tools" DROP COLUMN "ability",
ADD COLUMN     "ability" BOOLEAN NOT NULL;
