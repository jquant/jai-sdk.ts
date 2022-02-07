import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {HttpJaiClientPostInterface} from "../../client/http-jai-client-post-interface";

@injectable()
export class InsertedDataInterrupter {

    constructor(
        @inject("HttpJaiClientPostInterface") private readonly client: HttpJaiClientPostInterface,
    ) {
    }

    async interrupt(databaseName: string) {
        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        await this.client.post(`cancel/${encodedDatabaseName}`, {})
    }
}
