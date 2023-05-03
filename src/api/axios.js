import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(sessionStorage.getItem('user'))?.token
    if(token) {
      config.headers["Authorization"] = token
    }
    return config
  },
  (error) => Promise.reject(error)
)