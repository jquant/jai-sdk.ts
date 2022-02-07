import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {HttpJaiClientGetInterface} from "../../../client/http-jai-client-get.interface";

@injectable()
export class KeyDownloader {

    constructor(
        @inject("HttpJaiClientGetInterface") private readonly client: HttpJaiClientGetInterface) {
    }

    /**
     * Get the url for the download of the vector file.
     * @param databaseName Target Database.
     */
    async downloadKey(databaseName: string): Promise<string> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        return await this.client.get(`key/${encodedDatabaseName}`);
    }
}
