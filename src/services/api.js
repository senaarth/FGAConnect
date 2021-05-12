import axios from "axios";

const isDevelopment = false;

export const api = axios.create({
    baseURL: isDevelopment ? "http://localhost:2000/" : "https://fgaconnect.herokuapp.com/"
});