import {InsertedDataChecker} from "./inserted-data-checker";
import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";

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

    describe('collection - status check', () => {

    const makeSut = () => {
        const client = new GetClientSpy();
        const sut = new InsertedDataChecker(client);
        return {sut, client};
    }

    test('should reject an empty database name', async () => {
        const {sut} = makeSut();
        await expect(sut.check(''))
            .rejects
            .toThrow(Error)
    });

    test('should call the expected url with default mode', async () => {

        const {sut, client} = makeSut();

        await sut.check(dummyCollectionName);

        expect(client.urlCalled).toBe(`setup/ids/${dummyCollectionName}?mode=simple`);
    });

    test('should call the expected url with custom mode', async () => {

        const {sut, client} = makeSut();
        const mode = "summarized";

        await sut.check(dummyCollectionName, mode);

        expect(client.urlCalled).toBe(`setup/ids/${dummyCollectionName}?mode=${mode}`);
    });

    test('should encode database name', async () => {

        const {sut, client} = makeSut();
        const unencodedDatabaseName = '!my _- unencoded DB #$ name';
        const expected = encodeURIComponent(unencodedDatabaseName);

        await sut.check(unencodedDatabaseName);

        expect(client.urlCalled).toContain(expected);
    });

    test('should call server once', async () => {

        const {sut, client} = makeSut();

        await sut.check(dummyCollectionName);

        expect(client.urlCalls).toBe(1);
    });

    test('should return data from client', async () => {

        const {sut, client} = makeSut();
        const mode = "summarized";

        const dummyData = {
            count: 200
        };

        client.dataToReturn = dummyData;

        const data = await sut.check(dummyCollectionName, mode);

        expect(data).toBe(dummyData);
    });

});
