import "reflect-metadata"
import {inject, injectable} from "tsyringe";

import {HttpJaiClientDeleteInterface} from "../../../client/http-jai-delete-client.interface";

@injectable()
export class EntityDeleter {

    constructor(
        @inject("HttpJaiClientPutInterface") private readonly client: HttpJaiClientDeleteInterface
    ) {
    }

    /**
     * Delete vectors from a given database according to the specified IDs. This is a dev method.
     * @param databaseName Target Database.
     * @param ids IDs to be removed from the database.
     */
    async delete(databaseName: string, ids: Array<number>): Promise<void> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        if (!ids || ids.length === 0)
            throw new Error('The ids are required to perform the search');

        if (ids.some(x => isNaN(x)) || ids.some(x => x == null || false))
            throw new Error('All the ids must be a number');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        await this.client.delete(`entity/${encodedDatabaseName}`, ids);
    }
}
