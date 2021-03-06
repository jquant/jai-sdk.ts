import {container} from "tsyringe";
import {JaiApiKeyAuthenticator} from "../authentication/jai-api-key-authenticator.interface";

import {HttpJaiClientPutInterface} from "../client/http-jai-client-put.interface";
import {HttpJaiClientGetInterface} from "../client/http-jai-client-get.interface";
import {HttpJaiClientPostInterface} from "../client/http-jai-client-post-interface";
import {HttpJaiClientDeleteInterface} from "../client/http-jai-delete-client.interface";
import {HttpJaiClientInterface} from "../client/http-jai-client.interface";

import {JaiHttpServiceImplementation} from "../client/JaiHttpServiceImplementation";
import {AxiosHttpClientAuthenticator} from "../authentication/authentication";
import {GetTableFields, GetTableFieldsClient} from "../collection-management/table-fields/get-table-fields";
import {YargsCommandSettings} from "../command-line-interface/builders/types";
import {HttpJaiClientPatchInterface} from "../client/http-jai-client-patch.interface";

import buildCommands from "./commands";

export class Initializer {

    static initializeInversionOfControl() {

        container.register<HttpJaiClientPutInterface>("HttpJaiClientPutInterface",
            {useClass: JaiHttpServiceImplementation});

        container.register<HttpJaiClientGetInterface>("HttpJaiClientGetInterface",
            {useClass: JaiHttpServiceImplementation});

        container.register<HttpJaiClientPostInterface>("HttpJaiClientPostInterface",
            {useClass: JaiHttpServiceImplementation});

        container.register<HttpJaiClientDeleteInterface>("HttpJaiClientDeleteInterface",
            {useClass: JaiHttpServiceImplementation});

        container.register<HttpJaiClientPatchInterface>("HttpJaiClientPatchInterface",
            {useClass: JaiHttpServiceImplementation});

        container.register<HttpJaiClientInterface>("HttpJaiClientInterface",
            {useClass: JaiHttpServiceImplementation});

        container.register<GetTableFieldsClient>("GetTableFieldsClient",
            {useClass: GetTableFields});

        container.register<JaiApiKeyAuthenticator>("JaiApiKeyAuthenticator",
            {useClass: AxiosHttpClientAuthenticator});

        container.register<Array<YargsCommandSettings>>("commands", {
            useValue: buildCommands()
        })
    }
}
