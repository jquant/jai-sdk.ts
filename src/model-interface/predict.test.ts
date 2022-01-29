// noinspection DuplicatedCode

import {Predict} from "./predict";
import {HttpJaiClientPutInterface} from "../client/http-jai-client-put.interface";
import {GetTableFieldsClient} from "../collection-management/table-fields/get-table-fields";

class GetTableFieldsClientSpy implements GetTableFieldsClient {
    calledCollectionName = ''
    calls = 0;
    fieldsResult = {
        'id': 'number',
        'title': 'string',
        'firstname': 'string'
    }

    fields(databaseName: string): Promise<any> {
        this.calls++;
        this.calledCollectionName = databaseName;
        return Promise.resolve(this.fieldsResult);
    }
}

class PredictClientSpy implements HttpJaiClientPutInterface {

    urlCalled = ''
    bodyCalled = null
    calls = 0;
    shouldThrow = false

    putDummyResult = {
        super: true
    }

    async put(url: string, body: any): Promise<any> {
        this.urlCalled = url;
        this.bodyCalled = body;
        this.calls += 1;

        if (this.shouldThrow)
            throw new Error('Dummy Exception')

        return this.putDummyResult;
    }
}

const makeSut = () => {
    const getTableFieldsClient = new GetTableFieldsClientSpy();
    const client = new PredictClientSpy();
    const sut = new Predict(getTableFieldsClient, client);

    return {
        sut,
        client,
        getTableFieldsClient
    }
}

const makeDummyCriteria = () => [{
    'id': 2,
    'title': 'Mr.'
}, {
    'id': 3,
    'firstname': 'John Doe'
}];

const dummyCollectionName = 'my dummy collection name';

describe('predict by data', () => {
    test('should reject an empty collection name', async () => {

        const {sut} = makeSut();

        await expect(sut.predict('', []))
            .rejects
            .toThrow(Error)
    });

    test('should reject null data', async () => {

        const {sut} = makeSut();
        const nullData: any = null;

        await expect(sut.predict(dummyCollectionName, nullData))
            .rejects
            .toThrow(Error)
    });

    test('should reject number data', async () => {

        const {sut} = makeSut();

        const numberData: any = 56;

        await expect(sut.predict(dummyCollectionName, numberData))
            .rejects
            .toThrow(Error)
    });

    test('should reject string', async () => {

        const {sut} = makeSut();

        const stringData: any = 'not an object';

        await expect(sut.predict(dummyCollectionName, stringData))
            .rejects
            .toThrow(Error)
    });

    test('should reject object data', async () => {

        const {sut} = makeSut();

        const objectData: any = {};

        await expect(sut.predict(dummyCollectionName, objectData))
            .rejects
            .toThrow(Error)
    });

    test('should call GetTableFieldsClient', async () => {

        const {sut, getTableFieldsClient} = makeSut();

        const dummyCriteria: Array<any> = [];

        await sut.predict(dummyCollectionName, dummyCriteria);

        expect(getTableFieldsClient.calls).toBe(1);
    });

    test('should throw exception if fields don\'t match', async () => {

        const {sut} = makeSut();

        const dummyCriteria: Array<any> = [{
            'id': 2,
            'name': 'John Doe'
        }];

        await expect(sut.predict(dummyCollectionName, dummyCriteria))
            .rejects
            .toThrow();
    });

    test('should not throw exception if fields match', async () => {

        const {sut} = makeSut();
        const dummyCriteria = makeDummyCriteria();

        await sut.predict(dummyCollectionName, dummyCriteria);
    });

    test('should not call GetTableFieldsClient if field check is disabled', async () => {

        const {sut, getTableFieldsClient} = makeSut();

        const dummyCriteria: Array<any> = [];

        await sut
            .disableFieldCheck()
            .predict(dummyCollectionName, dummyCriteria);

        expect(getTableFieldsClient.calls).toBe(0);
    });

    test('should call the expected url - predict_proba=false', async () => {
        const {sut, client} = makeSut();
        const dummyCriteria: Array<any> = makeDummyCriteria();

        await sut.predict(dummyCollectionName, dummyCriteria);

        expect(client.urlCalled).toBe(`predict/${dummyCollectionName}?predict_proba=false`);
    });

    test('should call the expected url - predict_proba=true', async () => {
        const {sut, client} = makeSut();
        const dummyCriteria: Array<any> = makeDummyCriteria();

        await sut.predict(dummyCollectionName, dummyCriteria, true);

        expect(client.urlCalled).toBe(`predict/${dummyCollectionName}?predict_proba=true`);
    });

    test('should call the expected body', async () => {

        const {sut, client} = makeSut();

        const dummyCriteria: Array<any> = makeDummyCriteria();

        await sut.predict(dummyCollectionName, dummyCriteria, false);

        expect(client.bodyCalled).toBe(dummyCriteria);
    });

    test('should throw clients exception', async () => {
        const {sut, client} = makeSut();
        const dummyCriteria: Array<any> = makeDummyCriteria();

        client.shouldThrow = true

        await expect(sut.predict(dummyCollectionName, dummyCriteria))
            .rejects
            .toThrow();
    });

})
