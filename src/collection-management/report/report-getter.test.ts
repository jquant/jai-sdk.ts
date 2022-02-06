
import {HttpJaiHttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";
import {ReportGetter} from "./report-getter";

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

describe('get database id', () => {

    const makeSut = () => {
        const client = new GetClientSpy();
        const sut = new ReportGetter(client);
        return {sut, client};
    }

    test('should reject an empty database name', async () => {
        const {sut} = makeSut();
        await expect(sut.getReport(''))
            .rejects
            .toThrow(Error)
    });

    test('should encode database name', async () => {

        const {sut, client} = makeSut();
        const unencodedDatabaseName = '!my _- unencoded DB #$ name';
        const expected = encodeURIComponent(unencodedDatabaseName);

        await sut.getReport(unencodedDatabaseName);

        expect(client.urlCalled).toContain(expected);
    });

    test('should contain verbose parameter', async () => {

        const {sut, client} = makeSut();

        await sut.getReport(dummyCollectionName);

        expect(client.urlCalled).toContain('?verbose=2');
    });

    test('should call server once', async () => {

        const {sut, client} = makeSut();

        await sut.getReport(dummyCollectionName);

        expect(client.urlCalls).toBe(1);
    });

    test('should return data from client', async () => {

        const {sut, client} = makeSut();

        const dummyData = {
            count: 200
        };

        client.dataToReturn = dummyData;

        const data = await sut.getReport(dummyCollectionName);

        expect(data).toBe(dummyData);
    });

});
