import { EntityRepository, Repository } from "typeorm";
import { User } from "../model/user";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async createAndSave(user: User): Promise<User> {
    const newUser = this.create(user);
    await this.save(newUser);
    return newUser;
  }

  async updateAndSave(userId: string, userParams: User): Promise<User> {
    const user = await this.findOne(userId as string);

    const userUpdated = await this.createQueryBuilder()
                                  .update({ ...user, ...userParams })
                                  .where('id = :id', { id: userId })
                                  .returning('*')
                                  .updateEntity(true)
                                  .execute();
    return userUpdated.raw[0];
  }
}

export { UserRepository };
