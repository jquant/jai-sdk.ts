import axios from "axios";
import {HttpJaiClientInterface} from "./http-jai-client.interface";

export class JaiHttpServiceImplementation implements HttpJaiClientInterface {

    defaultBaseUrl(): string {
        return 'https://mycelia.azure-api.net/';
    }

    constructor() {
        axios.defaults.baseURL = this.defaultBaseUrl();
    }

    async get(url: string): Promise<any> {
        const {data} = await axios.get(url);
        return data;
    }

    async delete(url: string, body: any): Promise<void> {

        if (body) {
            await axios.delete(url, {data: body});
            return;
        }

        await axios.delete(url);
    }

    async post(url: string, body: any): Promise<any> {
        return await axios.post(url, body);
    }

    async put(url: string, body: any): Promise<any> {
        const {data} = await axios.put(url, body);
        return data;
    }

    async patch(url: string, body: any): Promise<any> {
        const {data} = await axios.put(url, body);
        return data;
    }
}


