// noinspection DuplicatedCode

import {RecommendationById} from "./recommendation-by-id";
import {HttpJaiClientPutInterface} from "../../client/http-jai-client-put.interface";

const dummyCollectionName = 'my-collection-name';

class ClientSpy implements HttpJaiClientPutInterface {

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
            throw new Error()

        return this.putDummyResult;
    }
}

const makeSut = () => {
    const client = new ClientSpy();
    const sut = new RecommendationById(client);

    return {client, sut};
}

describe('recommendation - search by id', () => {

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

    test('should reject any non integer value - string', async () => {

        const {sut} = makeSut();
        const value: Array<any> = ['home'];

        await expect(sut.search(dummyCollectionName, value))
            .rejects
            .toThrow(Error)
    });

    test('should reject any non integer value - null', async () => {

        const {sut} = makeSut();
        const value: Array<any> = [null];

        await expect(sut.search(dummyCollectionName, value))
            .rejects
            .toThrow(Error)
    });

    test('should perform a request with the right url', async () => {
        const {sut, client} = makeSut();
        const value: Array<any> = [1, 2, 3];
        const topK = 123;

        await sut.search(dummyCollectionName, value, topK);

        expect(client.urlCalled).toBe(`recommendation/id/${dummyCollectionName}?top_k=${topK}`);
    });

    test('should encode collection name', async () => {

        const {sut, client} = makeSut();
        const unencoded = 'mY_1 Unenc&%oded collection Nam3';
        const expected = encodeURIComponent(unencoded);

        await sut.search(unencoded, [0]);

        expect(client.urlCalled).toContain(expected);
    });

    test('should perform a request with body as the same object', async () => {
        const {sut, client} = makeSut();
        const value: Array<any> = [1, 2, 3];
        const topK = 123;

        await sut.search(dummyCollectionName, value, topK);

        expect(client.bodyCalled).toBe(value);
    });

    test('should perform a request with body unchanged', async () => {
        const {sut, client} = makeSut();
        const value: Array<any> = [1, 2, 3];
        const original: Array<any> = [1, 2, 3];
        const topK = 123;

        await sut.search(dummyCollectionName, value, topK);

        expect(new Set(client.bodyCalled)).toEqual(new Set(original));
    });

    test('should perform a request once', async () => {
        const {sut, client} = makeSut();
        const value: Array<any> = [1, 2, 3];

        await sut.search(dummyCollectionName, value);

        expect(client.calls).toBe(1);
    });

    test('should return client received data', async () => {
        const {sut, client} = makeSut();
        const value: Array<any> = [1, 2, 3];

        const received = await sut.search(dummyCollectionName, value);

        expect(received).toEqual(client.putDummyResult);
    });

    test('should throw client\'s exception', async () => {
        const {sut, client} = makeSut();
        const value: Array<any> = [1, 2, 3];

        client.shouldThrow = true;

        await expect(sut.search(dummyCollectionName, value))
            .rejects
            .toThrow();
    });
});
