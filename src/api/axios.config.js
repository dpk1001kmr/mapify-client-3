import axios from "axios";

const api = axios.create({
  baseURL: "https://mapify-server-3.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
