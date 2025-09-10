-- DropForeignKey
ALTER TABLE "public"."Quote" DROP CONSTRAINT "Quote_tool_id_fkey";

-- AlterTable
ALTER TABLE "public"."Quote" ADD COLUMN     "project_id" TEXT,
ALTER COLUMN "tool_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Quote" ADD CONSTRAINT "Quote_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "public"."Tools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Quote" ADD CONSTRAINT "Quote_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."Projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
