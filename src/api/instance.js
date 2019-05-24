import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
  });

export const authHeader = (token) => ({ Authorization: `JWT ${token}` })

export default instance;