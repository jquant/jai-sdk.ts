import "reflect-metadata"
import {inject, injectable} from "tsyringe";

import {HttpJaiClientPutInterface} from "../../../client/http-jai-client-put.interface";

@injectable()
export class SearchById {

    constructor(
        @inject("ClientPutInterface") private readonly client: HttpJaiClientPutInterface
    ) {
    }

    async search(databaseName: string, ids: Array<number>, topK = 5): Promise<void> {

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

        return await this.client.put(`similar/id/${databaseName}?top_k=${topK}`, ids);
    }
}
