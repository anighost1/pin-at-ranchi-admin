import http from "./http";

const getItems = () => {
    return http.get('/api/item')
}

const getCategories = () => {
    return http.get('/api/category')
}

const addCategory = (data) => {
    return http.post('/api/category', data)
}

const getCategoryById = (id) => {
    return http.get(`/api/category/${id}`)
}




const configServ = {
    getItems,
    getCategories,
    addCategory,
    getCategoryById,
}

export default configServ;