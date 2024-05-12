import { axiosInstance } from "./config/axiosConfig";

const base = "project"

export const getProjectList = async () => {
    return await axiosInstance.get(`/${base}`);
};

export const getProjectById = async (id) => {
    return await axiosInstance.get(`/${base}/${id}`);
};

export const createProject = async (body) => {
    return await axiosInstance.post(`/${base}/add`, body);
}

export const editProject = async (id, body) => {
    return await axiosInstance.put(`/${base}/edit/${id}`, body);
}

export const deleteProject = async (id) => {
    return await axiosInstance.delete(`/${base}/delete/${id}`);
}