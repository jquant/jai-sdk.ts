import "reflect-metadata"
import {inject} from "tsyringe";
import {HttpJaiHttpJaiClientPostInterface} from "../../client/http-jai-client-post-interface";

export class InsertedDataInterrupter {

    constructor(
        @inject("HttpJaiClientPostInterface") private readonly client: HttpJaiHttpJaiClientPostInterface,
    ) {
    }

    async interrupt(databaseName: string) {
        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        await this.client.post(`cancel/${encodedDatabaseName}`, {})
    }
}
