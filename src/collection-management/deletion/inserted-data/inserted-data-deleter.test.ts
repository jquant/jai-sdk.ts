import "reflect-metadata"
import {InsertedDataDeleter} from "./inserted-data-deleter";
import {HttpJaiClientDeleteInterface} from "../../../client/http-jai-delete-client.interface";

class DeleteClientSpy implements HttpJaiClientDeleteInterface {
    delete(url: string): Promise<void> {

        if (this.shouldThrow)
            throw new Error();

        this.urlCalled = url;
        return Promise.resolve(undefined);
    }

    urlCalled = '';
    shouldThrow = false;
}

const makeSut = () => {
    const client = new DeleteClientSpy();
    const sut = new InsertedDataDeleter(client);

    return {sut, client};
}

const dummyCollectionName = 'my-collection-name'

describe('inserted data deleter', () => {

    test('should reject an empty collection name', async () => {

        const {sut} = makeSut();

        await expect(sut.delete(''))
            .rejects
            .toThrow(Error)

    });

    test('should call the expected url', async () => {

        const {sut, client} = makeSut();

        await sut.delete(dummyCollectionName);

        expect(client.urlCalled).toBe(`data/${dummyCollectionName}`);
    });

    test('should encode collection name', async () => {

        const {sut, client} = makeSut();

        const unencoded = 'mY_1 Unenc&%oded collection Nam3';
        const expected = encodeURIComponent(unencoded);

        await sut.delete(unencoded);

        expect(client.urlCalled).toContain(expected);
    });

    test('should throw clients exception', async () => {
        const {sut, client} = makeSut();

        client.shouldThrow = true

        await expect(sut.delete(dummyCollectionName))
            .rejects
            .toThrow();
    });

});
