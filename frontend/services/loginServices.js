import { axiosInstance } from "./config/axiosConfig";

const base = "user";

export const login = async (body) => {
    return await axiosInstance.post(`/${base}/login`, body)
};

export const register = async (body) => {
    return await axiosInstance.post(`/${base}/register`, body)
};