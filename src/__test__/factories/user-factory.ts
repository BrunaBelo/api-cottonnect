import { genericFactory } from "../utils/genericFactory";
import { User } from "../../model/user";
import { cityFactory } from "./city-factory";
import faker from 'faker/locale/pt_BR';
import { roleFactory } from "./role-factory";

interface IUserData {
  name?: string,
  email?: string,
  password?: string,
  phoneNumber?: string,
  cpf?: string,
  additionalInformation?: string,
  cityId?: string,
  roleId?: string
}

const fakeCpf = ():string => {
  const randomNumber = (n:number) => Math.floor(Math.random()*n).toString()
  const cpf = `${randomNumber(1000)}.${randomNumber(1000)}.${randomNumber(1000)}-${randomNumber(100)}`

  return cpf
}


export const userFactory = async(userData = {} as IUserData, save = true): Promise<User> => {
  const defaultUser =  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phoneNumber: faker.phone.phoneNumber(),
    cpf: fakeCpf(),
    additionalInformation: faker.lorem.paragraph(),
    cityId: null,
    roleId: null
  };

  if(!userData.cityId){
    const city = await cityFactory({});
    userData.cityId = city.id;
  }

  if(!userData.roleId){
    const role = await roleFactory();
    userData.roleId = role.id;
  }

  userData = {
    ...defaultUser,
    ...userData
  }

  const user = await genericFactory(User, userData, save);
  return user as User;
}
