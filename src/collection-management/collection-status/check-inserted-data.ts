import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";

export type CheckInsertedDataMode = "simple" | "summarized" | "complete";

export class CheckInsertedData {

    constructor(
        private readonly client: HttpJaiClientGetInterface
    ) {

    }

    async check(databaseName: string, mode: CheckInsertedDataMode = "simple") {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        return await this.client.get(`setup/ids/${databaseName}?mode=${mode}`);

    }
}
