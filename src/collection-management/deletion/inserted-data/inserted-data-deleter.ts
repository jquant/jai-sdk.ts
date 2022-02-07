import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {HttpJaiClientDeleteInterface} from "../../../client/http-jai-delete-client.interface";

@injectable()
export class InsertedDataDeleter {

    constructor(
        @inject("HttpJaiClientDeleteInterface") private readonly client: HttpJaiClientDeleteInterface,
    ) {
    }

    async delete(databaseName: string) {
        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName =encodeURIComponent(databaseName);

        await this.client.delete(`data/${encodedDatabaseName}`)
    }
}
