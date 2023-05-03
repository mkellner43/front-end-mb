import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    common: {
      Authorization: JSON.parse(sessionStorage.getItem('user')).token
    }
  },
  withCredentials: true
})