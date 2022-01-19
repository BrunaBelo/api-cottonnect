import { Request, Response } from "express";
import { AppError } from "../errors/app-error";
import { validateUser } from "../schema-validation/user-schema";
import { validateLogin } from "../schema-validation/login-schema";
import { UserUseCase } from "../use-cases/user-use-case";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      phoneNumber,
      cpf,
      phoneVerified,
      additionalInformation,
      cityId,
      roleId,
    } = request.body;

    try {
      await validateUser(request.body);
      const useCase = new UserUseCase();
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await useCase.create({
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        phoneNumber,
        cpf,
        phoneVerified,
        additionalInformation,
        cityId,
        roleId,
      });
      return response.status(201).json(user);
    } catch (error) {
      throw new AppError(`Erro ao criar usuário: ${error.errors}`);
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    const useCase = new UserUseCase();
    const { email, password } = request.body;

    try {
      await validateLogin(request.body);
    } catch (error) {
      throw new AppError(`Erro ao logar: ${error.message}`);
    }

    const user = await useCase.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      user.token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );

      return response.status(200).json(user);
    }

    return response.status(400).send("Login ou Senha inválido(s)");
  }
}

export { UserController };
