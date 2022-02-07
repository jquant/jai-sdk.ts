import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";
import {DatabaseNameValidationResult} from "./types";

@injectable()
export class DatabaseNameValidator {

    constructor(
        @inject("HttpJaiClientGetInterface") private readonly client: HttpJaiClientGetInterface) {
    }

    /**
     * Check if a database name is valid.
     * @param databaseName Target Database.
     */
    async isDatabaseNameValid(databaseName: string): Promise<DatabaseNameValidationResult> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        return await this.client.get(`validation/${encodedDatabaseName}`);
    }
}
