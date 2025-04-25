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
  nome: yup.string().required("O nome é obrigatório"),
  fone: yup.string().required("O telefone é obrigatório"),
});

const CompanyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();

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
        console.error("Erro ao carregar os dados:", error);
      }
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = (data: company) => {
    console.log("📦 Dados atualizados:", data);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Editar Empresa</h1>

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
              <input id={field} {...register(field as keyof company)} />
              {errors[field as keyof typeof errors] && (
                <p className="error">
                  {errors[field as keyof typeof errors]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <button type="submit" className="submit-button">
          Atualizar
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;
