import axios from 'axios'
//const basUrl = 'http://localhost:3001/api/login'
const basUrl = '/api/login'

const login = async credentials => {
    const response = await axios.post(basUrl, credentials)

    return response.data
}
export default { login }