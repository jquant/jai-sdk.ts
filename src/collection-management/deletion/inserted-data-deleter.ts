import "reflect-metadata"
import {inject} from "tsyringe";
import {HttpJaiClientDeleteInterface} from "../../client/http-jai-delete-client.interface";

export class InsertedDataDeleter {

    constructor(
        @inject("ClientDeleteInterface") private readonly client: HttpJaiClientDeleteInterface,
    ) {
    }

    async delete(databaseName: string) {
        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName =encodeURIComponent(databaseName);

        await this.client.delete(`data/${encodedDatabaseName}`)
    }
}
