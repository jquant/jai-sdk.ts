import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {HttpJaiHttpJaiClientGetInterface} from "../../../client/http-jai-client-get.interface";

@injectable()
export class KeyDownloader {

    constructor(
        @inject("HttpJaiClientGetInterface") private readonly client: HttpJaiHttpJaiClientGetInterface) {
    }

    async downloadKey(databaseName: string): Promise<string> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        return await this.client.get(`key/${encodedDatabaseName}`);
    }
}
