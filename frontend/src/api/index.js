import axios from "axios";

const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "http://j6c202.p.ssafy.io/api"
    : "http://127.0.0.1:8000/api";

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
