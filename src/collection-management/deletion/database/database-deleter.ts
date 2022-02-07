import "reflect-metadata"
import {inject, injectable} from "tsyringe";

import {HttpJaiHttpJaiClientDeleteInterface} from "../../../client/http-jai-delete-client.interface";

@injectable()
export class DatabaseDeleter {

    constructor(
        @inject("HttpJaiClientPutInterface") private readonly client: HttpJaiHttpJaiClientDeleteInterface
    ) {
    }

    async delete(databaseName: string): Promise<void> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        await this.client.delete(`database/${encodedDatabaseName}`);
    }
}
