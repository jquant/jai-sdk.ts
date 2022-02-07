import "reflect-metadata"
import {inject, injectable} from "tsyringe";

import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";
import {CheckInsertedDataMode} from "../data-check/inserted-data-checker";

@injectable()
export class IdGetter {

    constructor(
        @inject("HttpJaiClientGetInterface") private readonly client: HttpJaiClientGetInterface
    ) {
    }

    /**
     * Get IDs info of a given database. Returns a list of integers or strings depending on the mode parameter definition.
     * @param databaseName Target Database.
     * @param mode mode IdReport (optional)
     */
    async getIds(databaseName: string, mode: CheckInsertedDataMode = "simple") : Promise<any> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        return await this.client.get(`id/${encodedDatabaseName}?mode=${mode}`);
    }
}
