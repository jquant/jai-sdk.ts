import "reflect-metadata"
import {inject, injectable} from "tsyringe";

import {HttpJaiClientDeleteInterface} from "../../../client/http-jai-delete-client.interface";

@injectable()
export class DatabaseDeleter {

    constructor(
        @inject("HttpJaiClientPutInterface") private readonly client: HttpJaiClientDeleteInterface
    ) {
    }

    /**
     * Delete everything relative to a specified database.
     * @param databaseName Database to be deleted.
     */
    async delete(databaseName: string): Promise<void> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        await this.client.delete(`database/${encodedDatabaseName}`);
    }
}
