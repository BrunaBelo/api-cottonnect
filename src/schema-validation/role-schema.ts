import * as yup from 'yup'

export const validateRole = async function (attrs: [], options = { abortEarly: false }) {
  const schema = yup.object().shape({
    name: yup.string().required(),
  });
  return await schema.validate(attrs, options);
}
