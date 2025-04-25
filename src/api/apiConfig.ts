import axios from "axios";

const api = axios.create({
  baseURL: "https://beta-api.serverlondrisoft.com:9000",
  headers: {
    GatewayLS: "2e44bb6339e6aacd8faeca8fd4e8694e",
    identificacao: "04361421000107",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Erro na resposta da API:", error.response.data);
      return Promise.reject(
        error.response.data.message || "Erro ao buscar os dados da API."
      );
    } else if (error.request) {
      console.error("Erro na requisição:", error.request);
      return Promise.reject("Não foi possível conectar ao servidor.");
    } else {
      console.error("Erro desconhecido:", error.message);
      return Promise.reject("Ocorreu um erro inesperado ao buscar os dados.");
    }
  }
);

export default api;
