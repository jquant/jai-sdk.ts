import "reflect-metadata"
import {inject} from "tsyringe";

import {GetTableFieldsClient} from "../collection-management/get-table-fields";
import {HttpJaiClientPutInterface} from "../client/http-jai-client-put.interface";

export class Predict {

    constructor(
        @inject("GetTableFieldsClient") private readonly getTableFieldsClient: GetTableFieldsClient,
        @inject("ClientPutInterface") private readonly client: HttpJaiClientPutInterface,
    ) {
    }

    private fieldCheckEnabled = true;

    async predict(collectionName: string, criteria: Array<any>, predictProbability = false) {
        if (!collectionName)
            throw new Error('You must provide e collectionName');

        if (!criteria)
            throw new Error('Parameter data cannot be null');

        if (!Array.isArray(criteria))
            throw new Error('Parameter data must be an array');

        if (this.fieldCheckEnabled)
            await this.throwIfAnyUnknownField(collectionName, criteria);

        return await this.client.put(`predict/${collectionName}?predict_proba=${predictProbability}`, criteria);
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
