import axios, { AxiosInstance } from 'axios';
export default class Api {
    axios:  AxiosInstance
    constructor() {
        this.axios = axios.create({baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`, withCredentials: true, });
    }

    async getLanguages() {
        console.log();
        
        return await this.axios.get('/user/languages');
    }

}