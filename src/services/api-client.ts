import axios, { CanceledError } from "axios";

export default axios.create({
    baseURL: 'http://localhost:3001'
})

export { CanceledError };