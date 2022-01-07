import {HttpJaiClientPutInterface} from "./http-jai-client-put.interface";
import axios from "axios";

export class JaiHttpServiceImplementation implements HttpJaiClientPutInterface {

    private readonly instance = axios.create({
        baseURL: this.rootUrl(),
        headers: {'Auth': 'd1cd1f0c532544699088cf4fad8e3222'}
    });

    async put(url: string, body: any): Promise<any> {
        const {data} = await this.instance.put(url, body);
        return data;
    }

    rootUrl(): string {
        return 'https://mycelia.azure-api.net/';
    }
}


