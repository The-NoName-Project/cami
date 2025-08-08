/*
  Warnings:

  - Added the required column `tool_id` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Quote" ADD COLUMN     "tool_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Quote" ADD CONSTRAINT "Quote_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "public"."Tools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
