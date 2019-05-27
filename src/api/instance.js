import axios from 'axios'

export const BASE_URL = 'https://whispering-temple-18802.herokuapp.com';

const instance = axios.create({
    baseURL: BASE_URL,
  });

export const authHeader = (token) => ({ Authorization: `JWT ${token}` })

export default instance;