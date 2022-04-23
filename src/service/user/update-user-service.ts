import bcrypt from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { AppError } from "../../errors/app-error";
import { User } from "../../model/user";
import { UserRepository } from "../../repository/user-repository";

class UpdateUserService {
  private repository: UserRepository;

  constructor(private userId: string, private user: User){
    this.userId = userId;
    this.user = user;
    this.repository = getCustomRepository(UserRepository);
  }

  async run(): Promise<User> {
    const { repository, user, userId } = this;

    const originalUser = await repository.findOne(userId);

    const existEmail = await repository.findOne({ where: { email: user.email } });
    const existPhoneNumber = await repository.findOne({ where: { phoneNumber: user.phoneNumber } });

    if (originalUser.email != user.email && existEmail) {
      throw new AppError(`O email ${user.email} já está em uso`);
    }

    if (originalUser.phoneNumber != user.phoneNumber && existPhoneNumber) {
      throw new AppError(`O número de telefone ${user.phoneNumber} já está em uso`);
    }

    user.password = await bcrypt.hash(user.password, 10);
    const newuser = repository.updateAndSave(userId, user);

    return newuser;
  }
}

export default UpdateUserService;
