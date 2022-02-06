import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {HttpJaiHttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";

@injectable()
export class ReportGetter {

    constructor(
        @inject("HttpJaiClientGetInterface") private readonly client: HttpJaiHttpJaiClientGetInterface
    ) {
    }

    async getReport(databaseName: string) : Promise<any> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        const encodedDatabaseName = encodeURIComponent(databaseName);

        return await this.client.get(`report/${encodedDatabaseName}?verbose=2`);
    }
}
