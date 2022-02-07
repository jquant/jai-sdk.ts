import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {HttpJaiHttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";

@injectable()
export class VectorGetter {

    constructor(
        @inject("HttpJaiHttpJaiClientGetInterface") private readonly client: HttpJaiHttpJaiClientGetInterface
    ) {
    }

    /**
     * Get vectors according to the specified IDs.
     * @param databaseName Target Database.
     * @param ids List of IDs associated with the vectors we are interested in.
     */
    async getById(databaseName: string, ids: Array<number>): Promise<any> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        if (!ids || ids.length === 0)
            throw new Error('The ids are required to perform the search');

        if (ids.some(x => isNaN(x)) || ids.some(x => x == null || false))
            throw new Error('All the ids must be a number');

        const encodedDatabaseName = encodeURIComponent(databaseName);
        const joinedIds = ids.join(',');
        const encodedJoinedIds = encodeURIComponent(joinedIds);

        return await this.client.get(`vector/${encodedDatabaseName}?id=${encodedJoinedIds}`);
    }
}
