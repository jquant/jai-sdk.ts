import {container} from "tsyringe";
import {JaiApiKeyAuthenticator} from "../authentication/jai-api-key-authenticator.interface";

import {HttpJaiHttpJaiClientPutInterface} from "../client/http-jai-client-put.interface";
import {HttpJaiHttpJaiClientGetInterface} from "../client/http-jai-client-get.interface";
import {HttpJaiHttpJaiClientPostInterface} from "../client/http-jai-client-post-interface";
import {HttpJaiHttpJaiClientDeleteInterface} from "../client/http-jai-delete-client.interface";
import {HttpJaiClientInterface} from "../client/http-jai-client.interface";

import {JaiHttpServiceImplementation} from "../client/JaiHttpServiceImplementation";
import {AxiosHttpClientAuthenticator} from "../authentication/authentication";
import {GetTableFields, GetTableFieldsClient} from "../collection-management/table-fields/get-table-fields";
import {YargsCommandSettings} from "../command-line-interface/builders/types";
import {buildSearchByIdCommand} from "../command-line-interface/builders/similarity/search-by-id";
import {buildSearchByDataCommand} from "../command-line-interface/builders/similarity/search-by-data";
import {buildPredictCommand} from "../command-line-interface/builders/model-interface/predict";

const commands = [
    buildPredictCommand(),
    buildSearchByIdCommand(),
    buildSearchByDataCommand(),
]

export class Initializer {

    static initializeInversionOfControl() {

        container.register<HttpJaiHttpJaiClientPutInterface>("HttpJaiClientPutInterface",
            {useClass: JaiHttpServiceImplementation});

        container.register<HttpJaiHttpJaiClientGetInterface>("HttpJaiClientGetInterface",
            {useClass: JaiHttpServiceImplementation});

        container.register<HttpJaiHttpJaiClientPostInterface>("HttpJaiClientPostInterface",
            {useClass: JaiHttpServiceImplementation});

        container.register<HttpJaiHttpJaiClientDeleteInterface>("HttpJaiClientDeleteInterface",
            {useClass: JaiHttpServiceImplementation});

        container.register<HttpJaiClientInterface>("HttpJaiClientInterface",
            {useClass: JaiHttpServiceImplementation});

        container.register<GetTableFieldsClient>("GetTableFieldsClient",
            {useClass: GetTableFields});

        container.register<JaiApiKeyAuthenticator>("JaiApiKeyAuthenticator",
            {useClass: AxiosHttpClientAuthenticator});

        container.register<Array<YargsCommandSettings>>("commands", {
            useValue: commands
        })
    }
}
