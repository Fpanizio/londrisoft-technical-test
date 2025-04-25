import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFetchCompany } from "../hooks/useFetchCompany";
import { useNotification } from "../hooks/useNotification";
import { company } from "../types/company";
import schema from "../validation/companySchema";
import "./CompanyForm.css";

const CompanyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { companyData, apiError } = useFetchCompany(id);
  const { showNotification, triggerNotification } = useNotification();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<company>({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (companyData) {
      Object.keys(companyData).forEach((key) => {
        setValue(key as keyof company, companyData[key as keyof company]);
      });
    }
  }, [companyData, setValue]);

  const onSubmit = async (data: company) => {
    try {
      console.log("📦 Dados atualizados:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      triggerNotification();
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
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
            {["nome", "fone", "cpf", "pessoa", "ocupacao", "nomocupacao", "empresa", "cnpj", "insestadual", "atividade", "nomatividade", "endereco", "numero", "complemento", "bairro", "cidade", "codcidade", "estado", "cep", "celular", "email", "contato", "fantasia", "tipo", "nomtipo", "status", "vendedor"].map((field) => (
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
          <button type="submit" className="submit-button">
            Atualizar
          </button>
        </form>
      )}
      {showNotification && (
        <div className="notification">
          Formulário enviado com sucesso! Verifique o console para mais detalhes.
        </div>
      )}
    </div>
  );
};

export default CompanyForm;
