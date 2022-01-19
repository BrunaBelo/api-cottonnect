import connection from '../connection';
import { getRepository } from "typeorm";
import { Role } from '../../model/role';

async function PopulateRole():Promise<void> {
  await connection.create()
  const repository = getRepository(Role)

  const adminRole = repository.create({name: 'admin'})
  const userRole = repository.create({name: 'user'})

  await repository.save(adminRole)
  await repository.save(userRole)
}

PopulateRole()
