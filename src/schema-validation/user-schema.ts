import * as yup from 'yup'

export const validateUser = async function (attrs: [], options = { abortEarly: false }) {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    phoneNumber: yup.string().required(),
    cpf: yup.string().required(),
    phoneVerified: yup.string().notRequired(),
    additionalInformation: yup.string().notRequired(),
    cityId: yup.string().required(),
    roleId: yup.string().notRequired(),
  });
  return await schema.validate(attrs, options);
}
