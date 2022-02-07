
import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";
import {IdGetter} from "./id-getter";

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

describe('get database id', () => {

    const makeSut = () => {
        const client = new GetClientSpy();
        const sut = new IdGetter(client);
        return {sut, client};
    }

    test('should reject an empty database name', async () => {
        const {sut} = makeSut();
        await expect(sut.getIds(''))
            .rejects
            .toThrow(Error)
    });

    test('should call the expected url with default mode', async () => {

        const {sut, client} = makeSut();

        await sut.getIds(dummyCollectionName);

        expect(client.urlCalled).toBe(`id/${dummyCollectionName}?mode=simple`);
    });

    test('should call the expected url with custom mode', async () => {

        const {sut, client} = makeSut();
        const mode = "summarized";

        await sut.getIds(dummyCollectionName, mode);

        expect(client.urlCalled).toBe(`id/${dummyCollectionName}?mode=${mode}`);
    });

    test('should encode database name', async () => {

        const {sut, client} = makeSut();
        const unencodedDatabaseName = '!my _- unencoded DB #$ name';
        const expected = encodeURIComponent(unencodedDatabaseName);

        await sut.getIds(unencodedDatabaseName);

        expect(client.urlCalled).toContain(expected);
    });

    test('should call server once', async () => {

        const {sut, client} = makeSut();

        await sut.getIds(dummyCollectionName);

        expect(client.urlCalls).toBe(1);
    });

    test('should return data from client', async () => {

        const {sut, client} = makeSut();
        const mode = "summarized";

        const dummyData = {
            count: 200
        };

        client.dataToReturn = dummyData;

        const data = await sut.getIds(dummyCollectionName, mode);

        expect(data).toBe(dummyData);
    });

});
