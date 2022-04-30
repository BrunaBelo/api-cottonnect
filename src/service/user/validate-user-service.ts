import { getCustomRepository } from "typeorm";
import { AppError } from "../../errors/app-error";
import { User } from "../../model/user";
import { UserRepository } from "../../repository/user-repository";

class ValidateUserService {
  private repository: UserRepository;

  constructor(private type: string, private value: string, private currentUserId: string){
    this.repository = getCustomRepository(UserRepository);
    this.type = type;
    this.value = value;
    this.currentUserId = currentUserId;
  }

  async run(): Promise<User> {
    const { type, value, repository, currentUserId } = this;
    let email = ""
    let phoneNumber = "";

    if(currentUserId != ""){
      const currentUser: User = await repository.findOne({ where: { id: currentUserId as string }});4
      email = currentUser.email;
      phoneNumber = currentUser.phoneNumber;
    }

    switch (type) {
      case 'email':
        return await repository.createQueryBuilder("user")
                               .where("email = :email AND email != :currenteUserEmail", { email: value, currenteUserEmail: email })
                               .getOne();
      case 'phoneNumber':
        return await repository.createQueryBuilder("user")
                               .where("user.phoneNumber = :phoneNumber AND user.phoneNumber != :currentePhoneNumber",
                                      { phoneNumber: value, currentePhoneNumber: phoneNumber })
                               .getOne();
      case 'cpf':
        return await repository.findOne({ where: { cpf: value }});
      default:
        throw new AppError("Atributo não encontrado");
    }
  }
}

export default ValidateUserService;
