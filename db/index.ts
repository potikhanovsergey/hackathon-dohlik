import { enhancePrisma } from "blitz"
import { Attribute, PrismaClient } from "@prisma/client"

const EnhancedPrisma = enhancePrisma(PrismaClient)

export * from "@prisma/client"
const db = new EnhancedPrisma()

// Этот Middleware создает дополнительные поля для каждого объекта при добавлении атрибута
db.$use(async (params, next) => {
  if (
    params.model == "Attribute" &&
    params.action == "upsert" &&
    params.args?.data?.parent === "entity"
  ) {
    const attribute = (await next(params)) as Attribute | null
    console.log("PARAMS", params)

    if (attribute) {
      const entities = await db.entity.findMany({})
      await db.entityAttribute.deleteMany({ where: { attributeId: attribute.id } })
      await db.entityAttribute.createMany({
        data: entities.map((e) => ({
          entityId: e.id,
          attributeId: attribute.id,
          value: attribute.autoFill ? attribute.defaultValue : undefined,
        })),
      })
    }

    return attribute
  }
  return next(params)
})
export default db
