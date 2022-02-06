import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {HttpJaiHttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";

@injectable()
export class FilterGetter {

    constructor(
        @inject("HttpJaiClientGetInterface") private readonly client: HttpJaiHttpJaiClientGetInterface
    ) {
    }

    async getFilters(databaseName: string) : Promise<Array<string>> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        return await this.client.get(`describe/${encodedDatabaseName}`);
    }
}
