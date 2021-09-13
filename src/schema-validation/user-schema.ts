import * as yup from 'yup'

export const validateUser = async function (attrs: [], options = { abortEarly: false }) {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    phoneNumber: yup.string().notRequired(),
    personId: yup.string().required(),
    birthDay: yup.string().notRequired(),
    phoneVerified: yup.string().notRequired(),
    additionalInformation: yup.string().notRequired(),
    cityId: yup.string().required(),
    roleId: yup.string().required(),
  });
  return await schema.validate(attrs, options);
}
