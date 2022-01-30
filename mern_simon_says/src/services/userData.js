import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/users'
const baseUrl = '/api/users'
let token = null

const setToken = newToken => {
    token = `bearer ${token}`
}

const update = async (id, newObject) => {
    const config = {
        headers: { Authorization: token }
    }
    console.log(id)
    const request = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return request.data
}

export default {
    update, setToken
}
