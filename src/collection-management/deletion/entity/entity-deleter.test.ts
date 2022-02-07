// noinspection DuplicatedCode
import "reflect-metadata"
import {HttpJaiClientDeleteInterface} from "../../../client/http-jai-delete-client.interface";
import {EntityDeleter} from "./entity-deleter";

const dummyCollectionName = 'my-collection-name';

class ClientSpy implements HttpJaiClientDeleteInterface {

    urlCalled = ''
    bodyCalled = null
    calls = 0;
    shouldThrow = false

    async delete(url: string, body: any): Promise<any> {
        this.urlCalled = url;
        this.bodyCalled = body;
        this.calls += 1;

        if (this.shouldThrow)
            throw new Error()

        return Promise.resolve();
    }
}

const makeSut = () => {
    const client = new ClientSpy();
    const sut = new EntityDeleter(client);

    return {client, sut};
}

describe('entity delete', () => {

    test('should reject an empty collection name', async () => {

        const {sut} = makeSut();

        await expect(sut.delete('', []))
            .rejects
            .toThrow(Error)

    });

    test('should reject any non integer value - string', async () => {

        const {sut} = makeSut();
        const value: Array<any> = ['home'];

        await expect(sut.delete(dummyCollectionName, value))
            .rejects
            .toThrow(Error)
    });

    test('should reject any non integer value - null', async () => {

        const {sut} = makeSut();
        const value: Array<any> = [null];

        await expect(sut.delete(dummyCollectionName, value))
            .rejects
            .toThrow(Error)
    });

    test('should perform a request with the right url', async () => {
        const {sut, client} = makeSut();
        const value: Array<any> = [1, 2, 3];

        await sut.delete(dummyCollectionName, value);

        expect(client.urlCalled).toContain(dummyCollectionName);
    });

    test('should encode collection name', async () => {

        const {sut, client} = makeSut();
        const unencoded = 'mY_1 Unenc&%oded collection Nam3';
        const expected = encodeURIComponent(unencoded);

        await sut.delete(unencoded, [0]);

        expect(client.urlCalled).toContain(expected);
    });

    test('should perform a request with body as the same object', async () => {
        const {sut, client} = makeSut();
        const body: Array<any> = [1, 2, 3];

        await sut.delete(dummyCollectionName, body);

        expect(client.bodyCalled).toBe(body);
    });

    test('should perform a request with body unchanged', async () => {
        const {sut, client} = makeSut();
        const value: Array<any> = [1, 2, 3];
        const original: Array<any> = [1, 2, 3];

        await sut.delete(dummyCollectionName, value);

        expect(new Set(client.bodyCalled)).toEqual(new Set(original));
    });

    test('should perform a request once', async () => {
        const {sut, client} = makeSut();
        const value: Array<any> = [1, 2, 3];

        await sut.delete(dummyCollectionName, value);

        expect(client.calls).toBe(1);
    });

    test('should throw client\'s exception', async () => {
        const {sut, client} = makeSut();
        const value: Array<any> = [1, 2, 3];

        client.shouldThrow = true;

        await expect(sut.delete(dummyCollectionName, value))
            .rejects
            .toThrow();
    });
});
