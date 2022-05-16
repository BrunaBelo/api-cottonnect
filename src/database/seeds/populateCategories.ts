import connection from '../connection';
import { getRepository } from "typeorm";
import { Category } from '../../model/category';

async function PopulateCategories():Promise<void> {
  await connection.create()
  const repository = getRepository(Category)
  const categoriesList = ['Tecnologia',
                          'Casa e Móveis',
                          'Eletrodomésticos',
                          'Esportes e Fitness',
                          'Fitness',
                          'Ferramentas',
                          'Construção',
                          'Indústria e Comércio',
                          'Saúde',
                          'Accessórios para Veículos',
                          'Beleza e Cuidado Pessoal',
                          'Moda',
                          'Brinquedos',
                          'Imóveis'
                        ]

  categoriesList.forEach(async(item) => {
    const category = await repository.findOne({ where: {
      name: item
    }})
    if(!category){
      const newCategory = repository.create({ name: item })
      await repository.save(newCategory)
    }
  });
}

PopulateCategories()
