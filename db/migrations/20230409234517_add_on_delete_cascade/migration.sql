-- DropForeignKey
ALTER TABLE "EntityAttribute" DROP CONSTRAINT "EntityAttribute_attributeId_fkey";

-- AddForeignKey
ALTER TABLE "EntityAttribute" ADD CONSTRAINT "EntityAttribute_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
