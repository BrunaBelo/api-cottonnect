import { DeepPartial, EntityTarget, getRepository } from "typeorm"

export async function genericFactory<Model>(model: EntityTarget<Model>, data: DeepPartial<Model>, save = true): Promise<Model> {
  const repository = getRepository(model)
  const newObj = repository.create(data)

  if(save){
    await repository.save(newObj as DeepPartial<Model>)
  }

  return newObj
}
