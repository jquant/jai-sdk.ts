import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";

@injectable()
export class FilterGetter {

    constructor(
        @inject("HttpJaiClientGetInterface") private readonly client: HttpJaiClientGetInterface
    ) {
    }

    /**
     * Get the list of all existing filters in the database.
     * @param databaseName Target Database.
     */
    async getFilters(databaseName: string) : Promise<Array<string>> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        return await this.client.get(`describe/${encodedDatabaseName}`);
    }
}
