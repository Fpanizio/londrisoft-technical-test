import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../api/apiConfig";
import { company } from "../types/cliente";
import "./CompanyForm.css"; // Importando o CSS para estilização

// Validação com Yup (apenas nome e fone obrigatórios)
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

const CompanyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [apiError, setApiError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<company>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/disponibilizadados/cliente");
        const cliente = response.data.clientes.find(
          (c: company) => c.codigo === Number(id)
        );
        if (cliente) {
          Object.keys(cliente).forEach((key) => {
            setValue(key as keyof company, cliente[key as keyof company]);
          });
        }
      } catch (error) {
        setApiError("Erro ao carregar os dados. Tente novamente mais tarde.");
        console.error("Erro ao carregar os dados:", error);
      }
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data: company) => {
    setIsSubmitting(true);
    try {
      console.log("📦 Dados atualizados:", data);
      // Simule envio para API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowNotification(true); // Exibe a notificação
      setTimeout(() => setShowNotification(false), 3000); // Oculta após 3 segundos
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Editar Empresa</h1>
      {apiError ? (
        <p className="error">{apiError}</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-grid">
            {[
              "nome",
              "fone",
              "cpf",
              "pessoa",
              "ocupacao",
              "nomocupacao",
              "empresa",
              "cnpj",
              "insestadual",
              "atividade",
              "nomatividade",
              "endereco",
              "numero",
              "complemento",
              "bairro",
              "cidade",
              "codcidade",
              "estado",
              "cep",
              "celular",
              "email",
              "contato",
              "fantasia",
              "tipo",
              "nomtipo",
              "status",
              "vendedor",
            ].map((field) => (
              <div key={field} className="form-field">
                <label htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={field}
                  {...register(field as keyof company)}
                  className={
                    errors[field as keyof typeof errors] ? "error-border" : ""
                  }
                />
                {errors[field as keyof typeof errors] && (
                  <p className="error">
                    {errors[field as keyof typeof errors]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Atualizar"}
          </button>
        </form>
      )}
      {showNotification && (
        <div className="notification">
          Formulário enviado com sucesso! verifique o console para mais
          detalhes.
        </div>
      )}
    </div>
  );
};

export default CompanyForm;
