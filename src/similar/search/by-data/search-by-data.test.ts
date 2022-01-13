import "reflect-metadata"
import {HttpJaiClientPutInterface} from "../../../client/http-jai-client-put.interface";
import {SearchByData} from "./search-by-data";

const dummyCollectionName = 'my-collection-name';

class ClientSpy implements HttpJaiClientPutInterface {

    urlCalled = ''
    bodyCalled = null
    calls = 0;

    putDummyResult = {
        super: true
    }

    async put(url: string, body: any): Promise<any> {
        this.urlCalled = url;
        this.bodyCalled = body;
        this.calls += 1;

        return this.putDummyResult;
    }
}

const makeSut = () => {
    const client = new ClientSpy();
    const sut = new SearchByData(client);

    return {client, sut};
}

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
})
