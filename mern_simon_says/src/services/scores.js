import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/highscores'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token }
    }
    const request = await axios.post(baseUrl, newObject, config)
    return request.data
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    const request = await axios.delete(`${baseUrl}/${id}`, config)
    return request.data
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    setToken: setToken,
    remove: remove
}
