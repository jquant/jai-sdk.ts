// noinspection DuplicatedCode

import "reflect-metadata"
import {HttpJaiClientPutInterface} from "../../../client/http-jai-client-put.interface";
import {SearchByData} from "./search-by-data";
import {GetTableFieldsClient} from "../../../collection-management/get-table-fields";

const dummyCollectionName = 'my-collection-name';

class SearchByDataClientSpy implements HttpJaiClientPutInterface {

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

        if(this.shouldThrow)
            throw new Error();

        return this.putDummyResult;
    }
}

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

const makeSut = () => {
    const client = new SearchByDataClientSpy();
    const getTableFieldsClient = new GetTableFieldsClientSpy();

    const sut = new SearchByData(getTableFieldsClient, client);

    return {client, sut, getTableFieldsClient: getTableFieldsClient};
}

const makeDummySearchCriteria = () => [{
    'id': 2,
    'title': 'Mr.'
}, {
    'id': 3,
    'firstname': 'John Doe'
}];

describe('similarity - search by data', () => {

    test('should reject an empty collection name', async () => {

        const {sut} = makeSut();

        await expect(sut.search('', []))
            .rejects
            .toThrow(Error)

    });

    test('should reject topK lesser than 1', async () => {

        const {sut} = makeSut();

        await expect(sut.search('', [], 0))
            .rejects
            .toThrow(Error)
    });

    test('should reject a negative topK', async () => {

        const {sut} = makeSut();

        await expect(sut.search('', [], -10))
            .rejects
            .toThrow(Error)
    });

    test('should reject null data', async () => {

        const {sut} = makeSut();
        const nullData: any = null;

        await expect(sut.search(dummyCollectionName, nullData))
            .rejects
            .toThrow(Error)
    });

    test('should reject number data', async () => {

        const {sut} = makeSut();

        const numberData: any = 56;

        await expect(sut.search(dummyCollectionName, numberData))
            .rejects
            .toThrow(Error)
    });

    test('should reject string', async () => {

        const {sut} = makeSut();

        const stringData: any = 'not an object';

        await expect(sut.search(dummyCollectionName, stringData))
            .rejects
            .toThrow(Error)
    });

    test('should reject object data', async () => {

        const {sut} = makeSut();

        const objectData: any = {};

        await expect(sut.search(dummyCollectionName, objectData))
            .rejects
            .toThrow(Error)
    });

    test('should call GetTableFieldsClient', async () => {

        const {sut, getTableFieldsClient} = makeSut();

        const dummySearchCriteria: Array<any> = [];

        await sut.search(dummyCollectionName, dummySearchCriteria);

        expect(getTableFieldsClient.calls).toBe(1);
    });

    test('should throw exception if fields don\'t match', async () => {

        const {sut} = makeSut();

        const dummySearchCriteria: Array<any> = [{
            'id': 2,
            'name': 'John Doe'
        }];

        await expect(sut.search(dummyCollectionName, dummySearchCriteria))
            .rejects
            .toThrow();
    });

    test('should not throw exception if fields match', async () => {

        const {sut} = makeSut();
        const dummySearchCriteria = makeDummySearchCriteria();

        await sut.search(dummyCollectionName, dummySearchCriteria);
    });

    test('should not call GetTableFieldsClient if field check is disabled', async () => {

        const {sut, getTableFieldsClient} = makeSut();

        const dummySearchCriteria: Array<any> = [];

        await sut
            .disableFieldCheck()
            .search(dummyCollectionName, dummySearchCriteria);

        expect(getTableFieldsClient.calls).toBe(0);
    });

    test('should call the expected url', async () => {

        const {sut, client} = makeSut();

        const dummySearchCriteria: Array<any> = makeDummySearchCriteria();

        await sut.search(dummyCollectionName, dummySearchCriteria);

        expect(client.urlCalled).toBe(`similar/data/${dummyCollectionName}?top_k=${5}`);
    });

    test('should call the expected url with custom topK', async () => {

        const {sut, client} = makeSut();

        const dummySearchCriteria: Array<any> = makeDummySearchCriteria();

        await sut.search(dummyCollectionName, dummySearchCriteria, 20);

        expect(client.urlCalled).toBe(`similar/data/${dummyCollectionName}?top_k=${20}`);
    });

    test('should call the expected body', async () => {

        const {sut, client} = makeSut();

        const dummySearchCriteria: Array<any> = makeDummySearchCriteria();

        await sut.search(dummyCollectionName, dummySearchCriteria, 20);

        expect(client.bodyCalled).toBe(dummySearchCriteria);
    });

    test('should throw clients exception', async () => {
        const {sut, client} = makeSut();
        const dummySearchCriteria: Array<any> = makeDummySearchCriteria();

        client.shouldThrow = true

        await expect(sut.search(dummyCollectionName, dummySearchCriteria))
            .rejects
            .toThrow();
    });

})
