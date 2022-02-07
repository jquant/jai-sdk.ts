// noinspection DuplicatedCode

import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";
import {VectorGetter} from "./vector-by.id";

const dummyCollectionName = 'my-collection-name';

class ClientSpy implements HttpJaiClientGetInterface {
    async get(url: string): Promise<any> {
        this.urlCalled = url;
        this.calls += 1;

        if (this.shouldThrow)
            throw new Error()

        return this.getDummyResult;
    }
    urlCalled = '';
    calls = 0;
    shouldThrow = false;
    getDummyResult:any;
}

const makeSut = () => {
    const client = new ClientSpy();
    const sut = new VectorGetter(client);

    return {client, sut};
}

describe('Vector', () => {

    test('should reject an empty collection name', async () => {

        const {sut} = makeSut();

        await expect(sut.getById('', []))
            .rejects
            .toThrow(Error)
    });

    test('should reject topK lesser than 1', async () => {

        const {sut} = makeSut();

        await expect(sut.getById('', []))
            .rejects
            .toThrow(Error)
    });

    test('should reject any non integer value - string', async () => {

        const {sut} = makeSut();
        const value: Array<any> = ['home'];

        await expect(sut.getById(dummyCollectionName, value))
            .rejects
            .toThrow(Error)
    });

    test('should reject any non integer value - null', async () => {

        const {sut} = makeSut();
        const value: Array<any> = [null];

        await expect(sut.getById(dummyCollectionName, value))
            .rejects
            .toThrow(Error)
    });

    test('should perform a request with the array id included and joint', async () => {
        const {sut, client} = makeSut();
        const value: Array<any> = [1];
        const jointValue = value.join(',');

        await sut.getById(dummyCollectionName, value);

        expect(client.urlCalled).toContain(`id=${jointValue}`);
    });

    test('should perform a request with the array id included, joint and encoded', async () => {
        const {sut, client} = makeSut();
        const value: Array<any> = [1];
        const jointValue = value.join(',');
        const encodedJointIds = encodeURIComponent(jointValue);

        await sut.getById(dummyCollectionName, value);

        expect(client.urlCalled).toContain(`id=${encodedJointIds}`);
    });


    test('should encode collection name', async () => {

        const {sut, client} = makeSut();
        const unencoded = 'mY_1 Unenc&%oded collection Nam3';
        const expected = encodeURIComponent(unencoded);

        await sut.getById(unencoded, [0]);

        expect(client.urlCalled).toContain(expected);
    });

    test('should perform a request once', async () => {
        const {sut, client} = makeSut();
        const value: Array<any> = [1, 2, 3];

        await sut.getById(dummyCollectionName, value);

        expect(client.calls).toBe(1);
    });

    test('should return client received data', async () => {
        const {sut, client} = makeSut();
        const value: Array<any> = [1, 2, 3];

        client.getDummyResult = [10,20,30];

        const received = await sut.getById(dummyCollectionName, value);

        expect(received).toEqual(client.getDummyResult);
    });

    test('should throw client\'s exception', async () => {
        const {sut, client} = makeSut();
        const value: Array<any> = [1, 2, 3];

        client.shouldThrow = true;

        await expect(sut.getById(dummyCollectionName, value))
            .rejects
            .toThrow();
    });
});
