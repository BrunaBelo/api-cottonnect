import * as yup from 'yup'

export const validateLogin = async function (attrs: [], options = { abortEarly: false }) {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  return await schema.validate(attrs, options);
}
