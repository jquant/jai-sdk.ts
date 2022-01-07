import {SearchById} from "./search-by-id";
import {HttpJaiClientPutInterface} from "../../../client/http-jai-client.interface";

const dummyCollectionName = 'my-collection-name';

class ClientSpy implements HttpJaiClientPutInterface {

    urlCalled = ''
    bodyCalled = null

    async put(url: string, body: any): Promise<any> {
        this.urlCalled = url;
        this.bodyCalled = body;
    }
}

const makeSut = () => {
    const client = new ClientSpy();
    const sut = new SearchById(client);

    return {client, sut};
}

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

test('should perform a request with the right url', () => {

    const {sut, client} = makeSut();
    const value: Array<any> = [1, 2, 3];
    const topk = 123;

    sut.search(dummyCollectionName, value, topk);

    expect(client.urlCalled).toBe(`similar/id/${dummyCollectionName}?top_k=${topk}`);
});
