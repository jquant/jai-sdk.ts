// noinspection DuplicatedCode
import "reflect-metadata"
import {HttpJaiClientDeleteInterface} from "../../../client/http-jai-delete-client.interface";
import {DatabaseDeleter} from "./database-deleter";

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
    const sut = new DatabaseDeleter(client);

    return {client, sut};
}

describe('database delete', () => {

    test('should reject an empty collection name', async () => {

        const {sut} = makeSut();

        await expect(sut.delete(''))
            .rejects
            .toThrow(Error)

    });

    test('should perform a request with the database name', async () => {
        const {sut, client} = makeSut();

        await sut.delete(dummyCollectionName);

        expect(client.urlCalled).toContain(dummyCollectionName);
    });

    test('should encode collection name', async () => {

        const {sut, client} = makeSut();
        const unencoded = 'mY_1 Unenc&%oded collection Nam3';
        const expected = encodeURIComponent(unencoded);

        await sut.delete(unencoded);

        expect(client.urlCalled).toContain(expected);
    });

    test('should perform a request with body a null body', async () => {
        const {sut, client} = makeSut();

        await sut.delete(dummyCollectionName);

        expect(client.bodyCalled).toBeUndefined()
    });

    test('should perform a request once', async () => {
        const {sut, client} = makeSut();

        await sut.delete(dummyCollectionName);

        expect(client.calls).toBe(1);
    });

    test('should throw client\'s exception', async () => {
        const {sut, client} = makeSut();

        client.shouldThrow = true;

        await expect(sut.delete(dummyCollectionName))
            .rejects
            .toThrow();
    });
});
