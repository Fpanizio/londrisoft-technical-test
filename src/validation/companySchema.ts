import * as yup from "yup";

const schema = yup.object().shape({
  nome: yup
    .string()
    .required("O nome é obrigatório")
    .matches(
      /^[A-Za-zÀ-ÿ0-9\s.,;:!?-]+$/,
      "Apenas letras, números, espaços e pontuações são permitidos"
    ),

  fone: yup
    .string()
    .required("O telefone é obrigatório")
    .matches(/^\d+$/, "Use apenas números"),

  cpf: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .matches(/^\d+$/, "Use apenas números")
    .optional(),

  pessoa: yup
    .number()
    .transform((v) => (v === "" ? undefined : v))
    .typeError("Use apenas números")
    .optional(),

  ocupacao: yup
    .number()
    .transform((v) => (v === "" ? undefined : v))
    .typeError("Use apenas números")
    .optional(),

  nomocupacao: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "Use apenas letras")
    .optional(),

  empresa: yup
    .number()
    .transform((v) => (v === "" ? undefined : v))
    .typeError("Use apenas números")
    .optional(),

  cnpj: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .matches(/^\d+$/, "Use apenas números")
    .optional(),

  insestadual: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "Use apenas letras")
    .optional(),

  atividade: yup
    .number()
    .transform((v) => (v === "" ? undefined : v))
    .typeError("Use apenas números")
    .optional(),

  nomatividade: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "Use apenas letras")
    .optional(),

  endereco: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .matches(/^[A-Za-zÀ-ÿ0-9\s,.-]+$/, "Endereço inválido")
    .optional(),

  numero: yup
    .number()
    .transform((v) => (v === "" ? undefined : v))
    .typeError("Use apenas números")
    .optional(),

  complemento: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "Use apenas letras")
    .optional(),

  bairro: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "Use apenas letras")
    .optional(),

  cidade: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "Use apenas letras")
    .optional(),

  codcidade: yup
    .number()
    .transform((v) => (v === "" ? undefined : v))
    .typeError("Use apenas números")
    .optional(),

  estado: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "Use apenas letras")
    .optional(),

  cep: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .matches(/^\d+$/, "Use apenas números")
    .optional(),

  celular: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .matches(/^\d+$/, "Use apenas números")
    .optional(),

  email: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .email("Email inválido")
    .optional(),

  contato: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "Use apenas letras")
    .optional(),

  fantasia: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "Use apenas letras")
    .optional(),

  tipo: yup
    .number()
    .transform((v) => (v === "" ? undefined : v))
    .typeError("Use apenas números")
    .optional(),

  nomtipo: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "Use apenas letras")
    .optional(),

  status: yup
    .number()
    .transform((v) => (v === "" ? undefined : v))
    .typeError("Use apenas números")
    .optional(),

  vendedor: yup
    .number()
    .transform((v) => (v === "" ? undefined : v))
    .typeError("Use apenas números")
    .optional(),
});

export default schema;