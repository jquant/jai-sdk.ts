import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {HttpJaiHttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";

export interface GetTableFieldsClient {
    fields(databaseName: string): Promise<any>;
}

@injectable()
export class GetTableFields implements GetTableFieldsClient {

    constructor(
        @inject("HttpJaiClientGetInterface")
        private readonly client: HttpJaiHttpJaiClientGetInterface
    ) {
    }

    /**
     * Get the column names of a supervised/selfsupervised database.
     * @param databaseName Target Database.
     */
    async fields(databaseName: string) : Promise<any> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        return await this.client.get(`fields/${databaseName}`);
    }
}
