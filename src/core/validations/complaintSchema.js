import * as Yup from "yup";

export const complaintSchema = Yup.object().shape({
  description: Yup.string()
    .required('Descrição é obrigatória')
    .max(5000, 'Descrição deve ter no máximo 5000 caracteres.'),
  location: Yup.object().shape({
    city: Yup.string()
      .required('Cidade é obrigatória')
      .max(30, 'Cidade deve ter no máximo 30 caracteres.'),
    state: Yup.string()
      .required('Estado é obrigatório')
      .max(2, 'Estado deve ter no máximo 2 caracteres. Exemplo: RS'),
    street: Yup.string()
      .required('Rua é obrigatória')
      .max(255, 'Rua deve ter no máximo 255 caracteres.'),
    neighborhood: Yup.string()
      .required('Bairro é obrigatório')
      .max(255, 'Bairro deve ter no máximo 255 caracteres.'),
    cep: Yup.string()
      .matches(/^\d{5}-\d{3}$/, 'CEP inválido')
      .max(9, 'CEP deve ter no máximo 9 caracteres. Exemplo: 12345-678'),
    number: Yup.string()
      .required('Número é obrigatório')
      .max(20, 'Número deve ter no máximo 20 caracteres. Exemplo: 1234A'),
  }),
});
