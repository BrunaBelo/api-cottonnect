import { PasswordVerificationCode } from "../../model/password-verification-code";
import { genericFactory } from "../utils/genericFactory";
import { userFactory } from "./user-factory";

export const PasswordVerificationCodeFactory = async(data, save = true):Promise<PasswordVerificationCode> => {
  const defaultData =  {
    code: "akk78q56q15q",
    used: false,
    userId: null
  };

  if(!defaultData.userId) {
    const user = await userFactory({});
    defaultData.userId = user.id;
  }

  data = {
    ...defaultData,
    ...data
  }

  const passwordVerificationCode = await genericFactory(PasswordVerificationCode, data, save);

  return passwordVerificationCode as PasswordVerificationCode;
}
