import connection from '../connection';
import { getRepository } from "typeorm";
import { Category } from '../../model/category';

async function PopulateCategories():Promise<void> {
  await connection.create()
  const repository = getRepository(Category)
  const categoriesList = ['Roupa', 'Acessório', 'Esporte', 'Eletronico', 'Jogo', 'Fitness', 'Casa', 'Livro',
  'Automóvel', 'Cosmético', 'Eletrodoméstico', 'Calçado']

  categoriesList.forEach(async(item) => {
    const category = await repository.findOne({where: {
      name: item
    }})
    if(!category){
      const newCategory = repository.create({name: item})
      await repository.save(newCategory)
    }
  })
}

PopulateCategories()
