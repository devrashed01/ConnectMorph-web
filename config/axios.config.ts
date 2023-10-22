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

export default axiosPrivate;
