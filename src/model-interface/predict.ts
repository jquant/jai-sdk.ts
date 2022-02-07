import "reflect-metadata"
import {inject, injectable} from "tsyringe";

import {GetTableFieldsClient} from "../collection-management/table-fields/get-table-fields";
import {HttpJaiClientPutInterface} from "../client/http-jai-client-put.interface";

@injectable()
export class Predict {

    constructor(
        @inject("GetTableFieldsClient") private readonly getTableFieldsClient: GetTableFieldsClient,
        @inject("HttpJaiClientPutInterface") private readonly client: HttpJaiClientPutInterface,
    ) {
    }

    private fieldCheckEnabled = true;

    /**
     * Returns a prediction of the supervised model. Returns a list of dictionaries with keys "id" and "predict".
     * @param databaseName Target Database.
     * @param criteria Data to process and search for the most similar vectors.
     * @param predictProbability
     */
    async predict(databaseName: string, criteria: Array<any>, predictProbability = false) {
        if (!databaseName)
            throw new Error('You must provide e databaseName');

        if (!criteria)
            throw new Error('Parameter data cannot be null');

        if (!Array.isArray(criteria))
            throw new Error('Parameter data must be an array');

        if (this.fieldCheckEnabled)
            await this.throwIfAnyUnknownField(databaseName, criteria);

        const encodedDatabaseName = encodeURIComponent(databaseName);
        const checkedPredictProbability = !!predictProbability;

        const url = `predict/${encodedDatabaseName}?predict_proba=${checkedPredictProbability}`

        return await this.client.put(url, criteria);
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
