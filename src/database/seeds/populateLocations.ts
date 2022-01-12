import axios from 'axios'
import { getRepository } from "typeorm";
import locations from '../../../alowedLocations';
import { City } from '../../model/city';
import { State } from '../../model/state';
import connection from '../connection';

const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

async function getLocations(url: string) {  
  const allowedStates = Object.keys(locations)
  
  await connection.create()
  
  const stateRepository = getRepository(State)
  
  const response = await axios.get(url)
  const states = response.data
  
  states.forEach(async stateInfo => {
    const { id, nome, sigla } = stateInfo
    if(allowedStates.includes(stateInfo.sigla)){
      let checkState = await stateRepository.findOne({ where: { ibge: stateInfo.id } })
      if(!checkState){
        const newState = stateRepository.create({name: nome.toUpperCase(), ibge: id})
        checkState =  await stateRepository.save(newState)
      }

      await populateCities(sigla.toUpperCase(), checkState.id)
    }
  });
}

async function populateCities(stateInitial: string, stateId: string) {
  const citiesUrl = `${url}/${stateInitial}/municipios`
  const { data: cities } = await axios.get(citiesUrl)

  const citiesOfState = locations[stateInitial]

  if(citiesOfState.includes('ALL')){
    cities.forEach(async city => {
      await createCity(city, stateId)
    });

  }else{
    cities.forEach(async city => {
      if(locations[stateInitial].includes(city.nome.toUpperCase())){
        await createCity(city, stateId)
      }
    });
  }
}

async function createCity(data, stateId: string): Promise<void> {
  const {nome, id: cityIbge} = data

  const cityRepository = getRepository(City)

  const checkCity = await cityRepository.findOne({ where: { ibge: cityIbge } })
  if(!checkCity){
    const newCity = cityRepository.create({name: nome.toUpperCase(), ibge: cityIbge, stateId})
    await cityRepository.save(newCity)
  }
}


getLocations(url)