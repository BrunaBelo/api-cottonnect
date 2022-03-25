import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { AppError } from "../errors/app-error";
import { validateUser } from "../schema-validation/user-schema";
import { validateLogin } from "../schema-validation/login-schema";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/user-repository";

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);
    const {
      name,
      email,
      password,
      phoneNumber,
      cpf,
      phoneVerified,
      moreInfo: additionalInformation,
      cityId,
    } = request.body;

    try {
      await validateUser(request.body);

      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await userRepository.createAndSave({
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        phoneNumber,
        cpf,
        phoneVerified,
        additionalInformation,
        cityId,
      });

      return response.status(201).json(user);
    } catch (error) {
      throw new AppError(`Erro ao criar usuário: ${error.errors}`);
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);
    const { email, password } = request.body;

    try {
      await validateLogin(request.body);
    } catch (error) {
      throw new AppError(`Erro ao logar: ${error.message}`);
    }

    const user = await userRepository.findByEmail(email);

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

  async validateUser(request: Request, response: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);
    const { type, value } = request.query;

    let result;

    switch (type) {
      case 'email':
        result = await userRepository.findByEmail(value as string)
      case 'phoneNumber':
        result = await userRepository.findByPhoneNumber(value as string)
      case 'cpf':
        result = await userRepository.findByCpf(value as string)
      default:
        false;
    }

    return response.status(200).json({result: result ? false : true});
  }

  async tokenRenewal(request: Request, response: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(request["user"].id)

    user.token = jwt.sign(
      { user_id: user.id, email: user.email },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );

    return response.status(200).json({ token: user.token });
   }
}

export { UserController };
