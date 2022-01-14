import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {HttpJaiClientGetInterface} from "../client/http-jai-client-get.interface";

export interface GetTableFieldsClient {
    fields(collectionName: string): Promise<any>;
}

@injectable()
export class GetTableFields implements GetTableFieldsClient {

    constructor(
        @inject("ClientGetInterface")
        private readonly client: HttpJaiClientGetInterface
    ) {
    }

    async fields(collectionName: string) {

        if (!collectionName)
            throw new Error('You must provide e collectionName');

        return await this.client.get(`fields/${collectionName}`);
    }
}
