import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";
import {DatabaseDescription} from "./types";

@injectable()
export class DatabaseDescriptor {

    constructor(
        @inject("HttpJaiClientGetInterface") private readonly client: HttpJaiClientGetInterface
    ) {
    }

    /**
     * Get description of a specific database in your Mycelia environment.
     * @param databaseName Target Database.
     */
    async describe(databaseName: string): Promise<DatabaseDescription> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        return await this.client.get(`describe/${encodedDatabaseName}`);
    }
}
