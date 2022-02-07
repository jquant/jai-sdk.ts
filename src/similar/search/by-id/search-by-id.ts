import "reflect-metadata"
import {inject, injectable} from "tsyringe";

import {HttpJaiHttpJaiClientPutInterface} from "../../../client/http-jai-client-put.interface";

@injectable()
export class SearchById {

    constructor(
        @inject("HttpJaiClientPutInterface") private readonly client: HttpJaiHttpJaiClientPutInterface
    ) {
    }

    /**
     * Perform ID similarity search in the vector representations of a database.
     * @param databaseName Target Database.
     * @param ids IDs to search for the most similar vectors.
     * @param topK Number of similar vectors to return for each ID. Default is 5.
     */
    async search(databaseName: string, ids: Array<number>, topK = 5): Promise<any> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        if (!topK)
            throw new Error('Parameter topK cannot be null');

        if (topK < 1)
            throw new Error('Parameter topK must be greater than 0');

        if (!ids || ids.length === 0)
            throw new Error('The ids are required to perform the search');

        if (ids.some(x => isNaN(x)) || ids.some(x => x == null || false))
            throw new Error('All the ids must be a number');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        return await this.client.put(`similar/id/${encodedDatabaseName}?top_k=${topK}`, ids);
    }
}
