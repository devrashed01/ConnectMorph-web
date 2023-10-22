import { AxiosInstance } from "axios";

const axios = require("axios");
const cookie = require("js-cookie");

const axiosPrivate: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${cookie.get("access_token")}`,
  },
});

axiosPrivate.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async function (error: any) {
    if (error.response.status === 401) {
      cookie.remove("access_token");
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export const axiosPublic: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosPrivate;
