import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiConfig";
import { company } from "../types/cliente";
import "./CompanyList.css";

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<company[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/disponibilizadados/cliente/?cnpjCpf=04361421000107")
      .then((response) => {
        if (response.data && Array.isArray(response.data.clientes)) {
          const uniqueCompanies = response.data.clientes.filter(
            (company: company, index: number, self: company[]) =>
              index === self.findIndex((c) => c.codigo === company.codigo)
          );
          setCompanies(uniqueCompanies);
        } else {
          setApiError("A resposta da API não contém a lista de clientes.");
          console.error(
            "API response does not contain 'clientes' array:",
            response.data
          );
        }
      })
      .catch((error) => {
        setApiError("Erro ao buscar as empresas. Tente novamente mais tarde.");
        console.error("Error fetching companies:", error);
      });
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/edit-company/${id}`);
  };

  return (
    <div className="list-container">
      <h1>Lista de Empresas</h1>
      {apiError ? (
        <p className="error">{apiError}</p>
      ) : companies.length > 0 ? (
        <>
          <ul className="company-list">
            {companies.map((company) => (
              <li key={company.codigo}>
                <span>{company.nome}</span>
                <button onClick={() => handleEdit(company.codigo)}>
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="no-companies">Nenhuma empresa encontrada.</p>
      )}
    </div>
  );
};

export default CompanyList;
