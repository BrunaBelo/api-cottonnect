import { DeepPartial, EntityTarget, getRepository } from "typeorm"

export async function genericFactory<Model>(model: EntityTarget<Model>, data: DeepPartial<Model>): Promise<Model> {
  const repository = getRepository(model)
  const newObj = repository.create(data)
  await repository.save(newObj as DeepPartial<Model>)

  return newObj
}
