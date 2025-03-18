import axios, { AxiosInstance } from 'axios';


export default class Api {
    axios:  AxiosInstance
    constructor() {
        this.axios = axios.create({baseURL: `${process.env.BASE_URL}/api`, withCredentials: true, });
    }

    async getLanguages() {
        return await this.axios.get('languages');
    }

}