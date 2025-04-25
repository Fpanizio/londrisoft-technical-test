import React, { createContext, useContext, useState, ReactNode } from "react";
import { company } from "../types/company";

interface CompanyContextProps {
  companies: company[];
  setCompanies: React.Dispatch<React.SetStateAction<company[]>>;
  selectedCompany: company | null;
  setSelectedCompany: React.Dispatch<React.SetStateAction<company | null>>;
}

const CompanyContext = createContext<CompanyContextProps | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<company | null>(null);

  return (
    <CompanyContext.Provider value={{ companies, setCompanies, selectedCompany, setSelectedCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = (): CompanyContextProps => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompanyContext must be used within a CompanyProvider");
  }
  return context;
};