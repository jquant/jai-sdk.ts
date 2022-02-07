import "reflect-metadata"
import {HttpJaiClientPostInterface} from "../../client/http-jai-client-post-interface";
import {InsertedDataInterrupter} from "./inserted-data-interrupter";

class PostClientSpy implements HttpJaiClientPostInterface {
    post(url: string, body: any): Promise<any> {
        if (this.shouldThrow)
            throw new Error();

        this.urlCalled = url;
        return Promise.resolve({url, body});
    }

    urlCalled = '';
    shouldThrow = false;
}

const makeSut = () => {
    const client = new PostClientSpy();
    const sut = new InsertedDataInterrupter(client);

    return {sut, client};
}

const dummyCollectionName = 'my-collection-name'

describe('inserted data deleter', () => {

    test('should reject an empty collection name', async () => {

        const {sut} = makeSut();

        await expect(sut.interrupt(''))
            .rejects
            .toThrow(Error)

    });

    test('should call the expected url', async () => {

        const {sut, client} = makeSut();

        await sut.interrupt(dummyCollectionName);

        expect(client.urlCalled).toBe(`cancel/${dummyCollectionName}`);
    });

    test('should encode collection name', async () => {

        const {sut, client} = makeSut();

        const unencoded = 'mY_1 Unenc&%oded collection Nam3';
        const expected = encodeURIComponent(unencoded);

        await sut.interrupt(unencoded);

        expect(client.urlCalled).toContain(expected);
    });

    test('should throw clients exception', async () => {
        const {sut, client} = makeSut();

        client.shouldThrow = true

        await expect(sut.interrupt(dummyCollectionName))
            .rejects
            .toThrow();
    });

});
