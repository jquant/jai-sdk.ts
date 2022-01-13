import {inject} from "tsyringe";
import {HttpJaiClientPutInterface} from "../../../client/http-jai-client-put.interface";
import {GetTableFieldsClient} from "../../../collection-management/get-table-fields";

export class SearchByData {

    constructor(
        @inject("GetTableFieldsClient")
        private readonly getTableFieldsClient: GetTableFieldsClient,
        @inject("ClientPutInterface")
        private readonly client: HttpJaiClientPutInterface,
    ) {
    }

    private fieldCheckEnabled = true;

    async search(collectionName: string, criteria: Array<any>, topK = 5): Promise<void> {

        if (!collectionName)
            throw new Error('You must provide e collectionName');

        if (!topK)
            throw new Error('Parameter topK cannot be null');

        if (topK < 1)
            throw new Error('Parameter topK must be greater than 0');

        if (!criteria)
            throw new Error('Parameter data cannot be null');

        if (!Array.isArray(criteria))
            throw new Error('Parameter data must be an array');

        if (this.fieldCheckEnabled)
            await this.throwIfAnyUnknownField(collectionName, criteria);

        return await this.client.put(`similar/id/${collectionName}?top_k=${topK}`, criteria);
    }

    disableFieldCheck() {
        this.fieldCheckEnabled = false;
        return this;
    }

    private async throwIfAnyUnknownField(collectionName: string, criteria: any[]) {
        const collectionFields = await this.getTableFieldsClient.fields(collectionName);
        const collectionKeys = Object.keys(collectionFields);

        criteria.forEach(item => {
            Object.keys(item).forEach(key => {
                if (collectionKeys.every(x => x !== key))
                    throw new Error(`Field ${key} could not be found in table fields`);
            })
        })
    }
}
