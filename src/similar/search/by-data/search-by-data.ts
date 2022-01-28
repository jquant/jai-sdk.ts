import "reflect-metadata"
import {inject, injectable} from "tsyringe";

import {HttpJaiClientPutInterface} from "../../../client/http-jai-client-put.interface";
import {GetTableFieldsClient} from "../../../collection-management/table-fields/get-table-fields";

@injectable()
export class SearchByData {

    constructor(
        @inject("GetTableFieldsClient") private readonly getTableFieldsClient: GetTableFieldsClient,
        @inject("ClientPutInterface") private readonly client: HttpJaiClientPutInterface,
    ) {
    }

    private fieldCheckEnabled = true;

    async search(databaseName: string, criteria: Array<any>, topK = 5): Promise<void> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        if (!topK)
            throw new Error('Parameter topK cannot be null');

        if (topK < 1)
            throw new Error('Parameter topK must be greater than 0');

        if (!criteria)
            throw new Error('Parameter data cannot be null');

        if (!Array.isArray(criteria))
            throw new Error('Parameter data must be an array');

        if (this.fieldCheckEnabled)
            await this.throwIfAnyUnknownField(databaseName, criteria);

        return await this.client.put(`similar/data/${databaseName}?top_k=${topK}`, criteria);
    }

    disableFieldCheck() {
        this.fieldCheckEnabled = false;
        return this;
    }

    private async throwIfAnyUnknownField(databaseName: string, criteria: any[]) {
        const collectionFields = await this.getTableFieldsClient.fields(databaseName);
        const collectionKeys = Object.keys(collectionFields);

        criteria.forEach(item => {
            Object.keys(item).forEach(key => {
                if (collectionKeys.every(x => x !== key))
                    throw new Error(`Field ${key} could not be found in table fields`);
            })
        })
    }
}
