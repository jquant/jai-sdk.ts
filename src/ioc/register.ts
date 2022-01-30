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
import {buildSearchByIdCommand} from "../similar/search/by-id/command-line-interface/command-builder";
import {buildSearchByDataCommand} from "../similar/search/by-data/command-line-interface/command-builder";
import {buildPredictCommand} from "../model-interface/command-line-interface/command-builder";
import {
    buildCollectionCreateCommand
} from "../collection-management/collection-creator/command-line-interface/command-builder";
import {
    buildCollectionCheckDataCommand
} from "../collection-management/data-check/command-line-interface/command-builder";
import {buildCollectionDeleteCommand} from "../collection-management/deletion/command-line-interface/command-builder";
import {buildCollectionSetupCommand} from "../collection-management/setup/command-line-interface/command-builder";
import {
    buildCollectionInterruptSetupCommand
} from "../collection-management/interrupter/command-line-interface/command-builder";

const commands = [
    buildPredictCommand(),
    buildSearchByIdCommand(),
    buildSearchByDataCommand(),
    buildCollectionCreateCommand(),
    buildCollectionCheckDataCommand(),
    buildCollectionDeleteCommand(),
    buildCollectionSetupCommand(),
    buildCollectionInterruptSetupCommand(),
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
