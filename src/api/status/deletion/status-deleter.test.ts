
import {StatusDeleter} from "./status-deleter";
import {HttpJaiClientDeleteInterface} from "../../../client/http-jai-delete-client.interface";

class GetClientSpy implements HttpJaiClientDeleteInterface {
    delete(url: string): Promise<any> {
        this.urlCalled = url;
        this.urlCalls++;
        return Promise.resolve();
    }
    urlCalls = 0;
    urlCalled = '';
}

const dummyCollectionName = 'my-collection-name';

describe('get database id', () => {

    const makeSut = () => {
        const client = new GetClientSpy();
        const sut = new StatusDeleter(client);
        return {sut, client};
    }

    test('should reject an empty database name', async () => {
        const {sut} = makeSut();
        await expect(sut.delete(''))
            .rejects
            .toThrow(Error)
    });

    test('should encode database name', async () => {

        const {sut, client} = makeSut();
        const unencodedDatabaseName = '!my _- unencoded DB #$ name';
        const expected = encodeURIComponent(unencodedDatabaseName);

        await sut.delete(unencodedDatabaseName);

        expect(client.urlCalled).toContain(expected);
    });

    test('should call server once', async () => {

        const {sut, client} = makeSut();

        await sut.delete(dummyCollectionName);

        expect(client.urlCalls).toBe(1);
    });
});
