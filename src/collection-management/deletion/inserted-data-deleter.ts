import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {HttpJaiHttpJaiClientDeleteInterface} from "../../client/http-jai-delete-client.interface";

@injectable()
export class InsertedDataDeleter {

    constructor(
        @inject("HttpJaiClientDeleteInterface") private readonly client: HttpJaiHttpJaiClientDeleteInterface,
    ) {
    }

    async delete(databaseName: string) {
        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName =encodeURIComponent(databaseName);

        await this.client.delete(`data/${encodedDatabaseName}`)
    }
}
