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
import {buildSearchByIdCommand} from "../similar/search/by-id/command-line-interface/command-builder";
import {buildSearchByDataCommand} from "../similar/search/by-data/command-line-interface/command-builder";
import {buildPredictCommand} from "../model-interface/command-line-interface/command-builder";
import {
    buildCollectionCreateCommand
} from "../collection-management/collection-creator/command-line-interface/command-builder";
import {
    buildCollectionCheckDataCommand
} from "../collection-management/data-check/command-line-interface/command-builder";
import {buildCollectionDeleteCommand} from "../collection-management/deletion/inserted-data/command-line-interface/command-builder";
import {buildCollectionSetupCommand} from "../collection-management/setup/command-line-interface/command-builder";
import {
    buildCollectionInterruptSetupCommand
} from "../collection-management/interrupter/command-line-interface/command-builder";
import {HttpJaiClientPatchInterface} from "../client/http-jai-client-patch.interface";
import {buildCollectionAddDataCommand} from "../collection-management/add-data/command-line-interface/command-builder";
import {
    buildCollectionDatabaseDescriptionCommand
} from "../collection-management/database-description/command-line-interface/command-builder";
import {
    buildCollectionDatabaseInfoCommand
} from "../collection-management/database-info/command-line-interface/command-builder";
import {buildCollectionGetFilterCommand} from "../collection-management/filters/command-line-interface/command-builder";

const commands = [
    buildPredictCommand(),
    buildSearchByIdCommand(),
    buildSearchByDataCommand(),
    buildCollectionCreateCommand(),
    buildCollectionCheckDataCommand(),
    buildCollectionDeleteCommand(),
    buildCollectionSetupCommand(),
    buildCollectionInterruptSetupCommand(),
    buildCollectionAddDataCommand(),
    buildCollectionDatabaseDescriptionCommand(),
    buildCollectionDatabaseInfoCommand(),
    buildCollectionGetFilterCommand(),
]

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
            useValue: commands
        })
    }
}
