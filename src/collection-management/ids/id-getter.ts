import "reflect-metadata"
import {inject, injectable} from "tsyringe";

import {HttpJaiHttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";
import {CheckInsertedDataMode} from "../data-check/inserted-data-checker";

@injectable()
export class IdGetter {

    constructor(
        @inject("HttpJaiClientGetInterface") private readonly client: HttpJaiHttpJaiClientGetInterface
    ) {
    }

    async getIds(databaseName: string, mode: CheckInsertedDataMode = "simple") {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        return await this.client.get(`id/${encodedDatabaseName}?mode=${mode}`);
    }
}
