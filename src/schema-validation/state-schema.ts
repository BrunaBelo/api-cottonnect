import * as yup from 'yup'

export const validateState = async function (attrs: [], options = { abortEarly: false }) {
  const schema = yup.object().shape({
    name: yup.string().required(),
    ibge: yup.string().required(),
  });
  return await schema.validate(attrs, options);
}
