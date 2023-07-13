import * as Yup from "yup";

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .max(255, "E-mail deve conter no máximo 255 caracteres")
    .email("E-mail inválido")
    .required("E-mail é requerido"),
  password: Yup.string()
    .required("Senha é requerida")
    .min(5, "A senha deve ter no mínimo 5 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      "A senha deve conter no mínimo: 1 número, 1 caractere especial, 1 letra maiúscula e 1 letra minúscula"
    ),
});
