import "reflect-metadata"
import {inject, injectable} from "tsyringe";

import {HttpJaiClientDeleteInterface} from "../../../client/http-jai-delete-client.interface";

@injectable()
export class StatusDeleter {

    constructor(
        @inject("HttpJaiClientDeleteInterface") private readonly client: HttpJaiClientDeleteInterface
    ) {
    }

    /**
     * Delete vectors from a given database according to the specified IDs. This is a dev method.
     * @param databaseName Target Database.
     * @param ids IDs to be removed from the database.
     */
    async delete(databaseName: string): Promise<void> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        await this.client.delete(`status?db_name=${encodedDatabaseName}`);
    }
}
