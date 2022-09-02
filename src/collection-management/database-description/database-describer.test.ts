import "reflect-metadata"
import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";
import {DatabaseDescriber} from "./database-describer";

class GetClientSpy implements HttpJaiClientGetInterface {
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

describe('describe database', () => {

    const makeSut = () => {
        const client = new GetClientSpy();
        const sut = new DatabaseDescriber(client);
        return {sut, client};
    }

    test('should reject an empty database name', async () => {
        const {sut} = makeSut();
        await expect(sut.describe(''))
            .rejects
            .toThrow(Error)
    });

    test('should encode database name', async () => {

        const {sut, client} = makeSut();
        const unencodedDatabaseName = '!my _- unencoded DB #$ name';
        const expected = encodeURIComponent(unencodedDatabaseName);

        await sut.describe(unencodedDatabaseName);

        expect(client.urlCalled).toContain(expected);
    });

    test('should call server once', async () => {

        const {sut, client} = makeSut();

        await sut.describe(dummyCollectionName);

        expect(client.urlCalls).toBe(1);
    });

    test('should return data from client', async () => {

        const {sut, client} = makeSut();
        const dummyData = {
            count: 200
        };

        client.dataToReturn = dummyData;

        const data = await sut.describe(dummyCollectionName);

        expect(data).toBe(dummyData);
    });

});
