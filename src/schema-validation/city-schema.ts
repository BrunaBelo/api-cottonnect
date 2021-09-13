import * as yup from 'yup'

export const validateCity = async function (attrs: [], options = { abortEarly: false }) {
  const schema = yup.object().shape({
    name: yup.string().required(),
    ibge: yup.string().required(),
    stateId: yup.string().required(),
  });
  return await schema.validate(attrs, options);
}
