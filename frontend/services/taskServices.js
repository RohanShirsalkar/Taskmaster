import { axiosInstance } from "./config/axiosConfig";

const base = "/task";
export const getTaskList = async (projectId) => {
    const task = await axiosInstance.get(`/task/${projectId}`);
    return task;
}

export const createTask = async (body) => {
    return await axiosInstance.post("/task/add", body)
};

export const editTask = async (id, body) => {
    return await axiosInstance.put("/task/edit/" + id, body)
}

export const deleteTask = async (id) => {
    return await axiosInstance.delete("/task/delete/" + id)
}