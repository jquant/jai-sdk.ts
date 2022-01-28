import "reflect-metadata"
import {inject} from "tsyringe";

import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";

export type CheckInsertedDataMode = "simple" | "summarized" | "complete";

export class InsertedDataChecker {

    constructor(
        @inject("ClientGetInterface") private readonly client: HttpJaiClientGetInterface
    ) {
    }

    async check(databaseName: string, mode: CheckInsertedDataMode = "simple") {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        return await this.client.get(`setup/ids/${encodedDatabaseName}?mode=${mode}`);
    }
}
