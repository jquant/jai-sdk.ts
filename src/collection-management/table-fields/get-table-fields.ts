import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";

export interface GetTableFieldsClient {
    fields(databaseName: string): Promise<any>;
}

@injectable()
export class GetTableFields implements GetTableFieldsClient {

    constructor(
        @inject("ClientGetInterface")
        private readonly client: HttpJaiClientGetInterface
    ) {
    }

    async fields(databaseName: string) {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        return await this.client.get(`fields/${databaseName}`);
    }
}
