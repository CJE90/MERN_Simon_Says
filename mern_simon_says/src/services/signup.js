import axios from 'axios'
const basUrl = 'http://localhost:3001/api/users'

const signup = async credentials => {
    const response = await axios.post(basUrl, credentials)
    return response.data
}
export default { signup }