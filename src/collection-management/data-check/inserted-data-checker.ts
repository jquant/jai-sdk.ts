import "reflect-metadata"
import {inject, injectable} from "tsyringe";

import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";

/**
 * complete: get ALL IDs
 * summarized: get groups of consecutive IDs.
 * simple: get the number of IDs and their min and max IDs as well.
 */
export type CheckInsertedDataMode = "simple" | "summarized" | "complete";

@injectable()
export class InsertedDataChecker {

    constructor(
        @inject("HttpJaiClientGetInterface") private readonly client: HttpJaiClientGetInterface
    ) {
    }

    async check(databaseName: string, mode: CheckInsertedDataMode = "simple") {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        return await this.client.get(`setup/ids/${encodedDatabaseName}?mode=${mode}`);
    }
}
