import { useEffect, useState } from "react";
import api from "../api/apiConfig";
import { company } from "../types/company";

export const useFetchCompany = (id: string | undefined) => {
  const [companyData, setCompanyData] = useState<company | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/disponibilizadados/cliente");
        const cliente = response.data.clientes.find(
          (c: company) => c.codigo === Number(id)
        );
        if (cliente) {
          setCompanyData(cliente);
        }
      } catch (error) {
        setApiError("Erro ao carregar os dados. Tente novamente mais tarde.");
        console.error("Erro ao carregar os dados:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return { companyData, apiError };
};