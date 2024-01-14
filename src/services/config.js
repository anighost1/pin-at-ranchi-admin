import axios from "axios";
import http from "./http";
import { appServiceName } from "./http";

const getItems = (page = 1, limit = 10) => {
    return http.get(`/api/item?page=${page}&limit=${limit}`)
}

const addtems = (data) => {
    return http.post(`/api/item`, data)
}

const getItemById = (id) => {
    return http.get(`/api/item/${id}`)
}

const getImageByItemId = (id) => {
    return http.get(`/api/image/by-item/all/${id}`)
}

const addImage = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const result = await axios.post(`${appServiceName}/api/image`, data, config)
        console.log(result.data)
    } catch (err) {
        console.log(err)
    }
}

const getCategories = (page = 1, limit = 10) => {
    return http.get(`/api/category?page=${page}&limit=${limit}`)
}

const addCategory = (data) => {
    return http.post('/api/category', data)
}

const getCategoryById = (id) => {
    return http.get(`/api/category/${id}`)
}




const configServ = {
    getItems,
    addtems,
    getItemById,
    getImageByItemId,
    addImage,
    getCategories,
    addCategory,
    getCategoryById,
}

export default configServ;