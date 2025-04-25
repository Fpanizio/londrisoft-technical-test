import axios from "axios";

const api = axios.create({
  baseURL:
    "https://beta-api.serverlondrisoft.com:9000", // Substitua pela URL da sua API
  headers: {
    GatewayLS: "2e44bb6339e6aacd8faeca8fd4e8694e",
    identificacao: "04361421000107",
  },
});

export default api;
