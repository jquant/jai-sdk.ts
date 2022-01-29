import {Creator} from "./creator";
import {HttpJaiHttpJaiClientPostInterface} from "../../client/http-jai-client-post-interface";

class PostDataClientSpy implements HttpJaiHttpJaiClientPostInterface {
    post(url: string, body: any): Promise<any> {

        if (this.shouldThrow)
            throw new Error('This is a test exception');

        this.calls++;
        this.urlCalled = url;
        this.postedData = body;
        return Promise.resolve({url, body});
    }

    calls = 0;
    urlCalled = '';
    postedData = {};
    shouldThrow = false;
}

describe('create collection', () => {

    const makeSut = () => {
        const client = new PostDataClientSpy();
        const sut = new Creator(client);

        return {sut, client}
    }

    const dummyCollectionName = 'my-collection-name';

    const makeDummyData = () => [{
        'id': 2,
        'title': 'Mr.',
        value1: 100,
        value2: 200,
    }, {
        'id': 3,
        value1: 100,
        value3: 321,
        'firstname': 'John Doe'
    }];

    test('should reject null collection name', async () => {

        const {sut} = makeSut();
        const nullCollectionName: any = null

        await expect(sut.insert(nullCollectionName, []))
            .rejects
            .toThrow()
    })

    test('should reject empty collection name', async () => {

        const {sut} = makeSut();
        const nullCollectionName: any = ''

        await expect(sut.insert(nullCollectionName, []))
            .rejects
            .toThrow()
    })

    test('should reject null data', async () => {

        const {sut} = makeSut();
        const nullData: any = null;

        await expect(sut.insert(dummyCollectionName, nullData))
            .rejects
            .toThrow(Error)
    });

    test('should reject number data', async () => {

        const {sut} = makeSut();

        const numberData: any = 56;

        await expect(sut.insert(dummyCollectionName, numberData))
            .rejects
            .toThrow(Error)
    });

    test('should reject string', async () => {

        const {sut} = makeSut();

        const stringData: any = 'not an object';

        await expect(sut.insert(dummyCollectionName, stringData))
            .rejects
            .toThrow(Error)
    });

    test('should reject object data', async () => {

        const {sut} = makeSut();

        const objectData: any = {};

        await expect(sut.insert(dummyCollectionName, objectData))
            .rejects
            .toThrow(Error)
    });

    test('should reject data without id field', async () => {

        const {sut} = makeSut();

        const objectData = [{
            key: 1,
            value1: 100
        }];

        await expect(sut.insert(dummyCollectionName, objectData))
            .rejects
            .toThrow(Error)
    });

    test('should reject data without non id field', async () => {

        const {sut} = makeSut();

        const objectData = [{
            id: 1,
            value1: 100
        }, {
            id: 2,
        }];

        await expect(sut.insert(dummyCollectionName, objectData))
            .rejects
            .toThrow(Error)
    });

    test('should call Post Client', async () => {

        const {sut, client} = makeSut();

        await sut.insert(dummyCollectionName, makeDummyData());

        expect(client.calls).toBe(1);
    });

    test('should call the expected url', async () => {

        const {sut, client} = makeSut();
        const dummyFilterName = '_my_filter_name';
        const dummyData = makeDummyData();

        await sut.insert(dummyCollectionName, dummyData, dummyFilterName);

        expect(client.urlCalled).toBe(`data/${dummyCollectionName}?filter_name=${dummyFilterName}`);
    });

    test('should encode filter_name', async () => {

        const {sut, client} = makeSut();
        const dummyData = makeDummyData();

        const dummyFilterName = '_Un Encoded my_filter_name';
        const expectedFilterName = encodeURIComponent(dummyFilterName);

        await sut.insert(dummyCollectionName, dummyData, dummyFilterName);

        expect(client.urlCalled).toContain(expectedFilterName);
    });

    test('should encode database name', async () => {

        const {sut, client} = makeSut();
        const dummyData = makeDummyData();

        const unencodedDataName = '_Un Encoded my_ ! collection _name';
        const expectedDatabaseName = encodeURIComponent(unencodedDataName);

        await sut.insert(unencodedDataName, dummyData);

        expect(client.urlCalled).toContain(expectedDatabaseName);
    });

    test('should post data', async () => {

        const {sut, client} = makeSut();
        const dummyData = makeDummyData();

        await sut.insert(dummyCollectionName, dummyData);

        expect(client.postedData).toBe(dummyData);
    });

    test('should throw clients exception', async () => {
        const {sut, client} = makeSut();
        const dummyData = makeDummyData();

        client.shouldThrow = true

        await expect(sut.insert(dummyCollectionName, dummyData))
            .rejects
            .toThrow();
    });

})
