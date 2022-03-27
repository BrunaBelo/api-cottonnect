import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { AppError } from "../../errors/app-error";
import { User } from "../../model/user";
import { UserRepository } from "../../repository/user-repository";

class LoginUserService {
  private repository: UserRepository;

  constructor(private email, private password) {
    this.email = email;
    this.password = password;
    this.repository = getCustomRepository(UserRepository);
  }

  async run(): Promise<User> {
    const { repository, email, password } = this;
    const user = await repository.findOne({ where: { email: email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      user.token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );

      return user;
    }

    throw new AppError("Credenciais invalidas");
  }
}

export default LoginUserService;
