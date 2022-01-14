import {container} from "tsyringe";
import {HttpJaiClientPutInterface} from "../client/http-jai-client-put.interface";
import {JaiApiKeyAuthenticator} from "../authentication/jai-api-key-authenticator.interface";
import {HttpJaiClientGetInterface} from "../client/http-jai-client-get.interface";
import {JaiHttpServiceImplementation} from "../client/JaiHttpServiceImplementation";
import {AxiosHttpClientAuthenticator} from "../authentication/authentication";

export class Initializer {
    static initializeInversionOfControl() {

        container.register<HttpJaiClientPutInterface>("ClientPutInterface",
            {useClass: JaiHttpServiceImplementation});

        container.register<HttpJaiClientGetInterface>("ClientGetInterface",
            {useClass: JaiHttpServiceImplementation});

        container.register<JaiApiKeyAuthenticator>("JaiApiKeyAuthenticator",
            {useClass: AxiosHttpClientAuthenticator});


    }
}
