// import {RequestParser} from "http-service-ts";
import {HttpJaiClientPutInterface} from "./http-jai-client-put.interface";

export class JaiHttpServiceImplementation implements HttpJaiClientPutInterface {

    async put(url: string, body: any): Promise<any> {

        console.debug(url);

        return [];

        // return this.client.request({
        //     url,
        //     method: "put",
        //     obj: body
        // });
    }
    //
    // private client: RequestParser = new RequestParser(this.rootUrl(), {
    //     headers: new Headers({
    //         Accept: 'application/json'
    //     }),
    //     appendSlash: true
    // });

    rootUrl(): string {
        return 'https://mycelia.azure-api.net/';
    }


}


