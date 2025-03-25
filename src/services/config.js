import axios from "axios";
import http from "./http";
import { appServiceName } from "./http";

const getItems = (page = 1, limit = 10, search = '', status = '', category = '') => {
    return http.get(`/api/item?page=${page}&limit=${limit}&search=${search}&status=${status}&category=${category}`)
}

const addtems = (data) => {
    return http.post(`/api/item`, data)
}

const updateItem = (data) => {
    return http.put(`/api/item`, data)
}

const itemStatusChange = (data) => {
    return http.put(`/api/item/status`, data)
}

const getItemById = (id) => {
    return http.get(`/api/item/${id}`)
}

const getImageByItemId = (id) => {
    return http.get(`/api/item/image/${id}`)
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
        // console.log(err)
        throw err
    }
}

const getCategories = (page, limit, search = '', status = '') => {
    return http.get(`/api/category?page=${page}&limit=${limit}&search=${search}&status=${status}`)
}

const addCategory = (data) => {
    return http.post('/api/category', data)
}

const updateCategory = (data) => {
    return http.put('/api/category', data)
}

const categoryStatusChange = (data) => {
    return http.put(`/api/category/status`, data)
}

const getCategoryById = (id) => {
    return http.get(`/api/category/${id}`)
}

const login = (data) => {
    return http.post(`/api/auth`, data)
}

const getAdminById = (id) => {
    return http.get(`/api/admin/${id}`)
}


const configServ = {
    getItems,
    addtems,
    updateItem,
    itemStatusChange,
    getItemById,
    getImageByItemId,
    addImage,
    getCategories,
    addCategory,
    categoryStatusChange,
    updateCategory,
    getCategoryById,
    login,
    getAdminById,
}

export default configServ;