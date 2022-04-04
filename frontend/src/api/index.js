import axios from "axios";

<<<<<<< HEAD
const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "http://j6c202.p.ssafy.io/api"
    : "http://127.0.0.1:8000/api";

function apiInstance() {
  const instance = axios.create({
    baseURL: BACKEND_URL,
=======
export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "http://j6c202.p.ssafy.io"
    : "http://127.0.0.1:8000";

const BACKEND_API_URL = `${BACKEND_URL}/api`;

function apiInstance() {
  const instance = axios.create({
    baseURL: BACKEND_API_URL,
>>>>>>> ce45131251102bfaa7aa41d6ee6ac3b486443c22
    headers: {
      "Content-type": "application/json",
    },
  });

  return instance;
}

export { apiInstance };
