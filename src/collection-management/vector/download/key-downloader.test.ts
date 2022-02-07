import "reflect-metadata"
import {HttpJaiHttpJaiClientGetInterface} from "../../../client/http-jai-client-get.interface";
import {KeyDownloader} from "./key-downloader";

class GetClientSpy implements HttpJaiHttpJaiClientGetInterface {
    get(url: string): Promise<any> {
        this.urlCalled = url;
        this.urlCalls++;
        return Promise.resolve(this.dataToReturn);
    }

    urlCalls = 0;
    urlCalled = '';
    dataToReturn = {};
}

const dummyCollectionName = 'my-collection-name';

describe('download key', () => {

    const makeSut = () => {
        const client = new GetClientSpy();
        const sut = new KeyDownloader(client);

        return {sut, client};
    }

    test('should reject an empty database name', async () => {
        const {sut} = makeSut();
        await expect(sut.downloadKey(''))
            .rejects
            .toThrow(Error)
    });

    test('should encode database name', async () => {

        const {sut, client} = makeSut();
        const unencodedDatabaseName = '!my _- unencoded DB #$ name';
        const expected = encodeURIComponent(unencodedDatabaseName);

        await sut.downloadKey(unencodedDatabaseName);

        expect(client.urlCalled).toContain(expected);
    });

    test('should call server once', async () => {

        const {sut, client} = makeSut();

        await sut.downloadKey(dummyCollectionName);

        expect(client.urlCalls).toBe(1);
    });

    test('should return data from client', async () => {

        const {sut, client} = makeSut();
        const dummyData = {
            count: 200
        };

        client.dataToReturn = dummyData;

        const data = await sut.downloadKey(dummyCollectionName);

        expect(data).toBe(dummyData);
    });

});
