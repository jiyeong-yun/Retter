import axios from "axios";

const BACKEND_URL = "http://127.0.0.1:8000/";

function apiInstance() {
  const instance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      "Content-type": "application/json",
    },
  });

  return instance;
}

export { apiInstance };
