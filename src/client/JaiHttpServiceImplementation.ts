import axios from "axios";
import {HttpJaiClientPutInterface} from "./http-jai-client-put.interface";
import {HttpJaiClientGetInterface} from "./http-jai-client-get.interface";

export class JaiHttpServiceImplementation implements HttpJaiClientPutInterface, HttpJaiClientGetInterface {

    defaultBaseUrl(): string {
        return 'https://mycelia.azure-api.net/';
    }

    // private readonly instance = axios.create({
    //     baseURL: this.rootUrl(),
    //     headers: {'Auth': 'd1cd1f0c532544699088cf4fad8e3222'}
    // });

    constructor() {
        axios.defaults.baseURL = this.defaultBaseUrl();
    }

    async get(url: string): Promise<any> {
        const {data} = await axios.get(url);
        return data;
    }

    async put(url: string, body: any): Promise<any> {
        const {data} = await axios.put(url, body);
        return data;
    }

}


