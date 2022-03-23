import axios from "axios";

const BACKEND_URL = "http://localhost:8000";

function apiInstance() {
  const instance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
}

export { apiInstance };
