import "reflect-metadata"
import {HttpJaiClientPatchInterface} from "../../client/http-jai-client-patch.interface";
import {DataPatcher} from "./data-patcher";

class GetClientSpy implements HttpJaiClientPatchInterface {

    patch(url: string, body: any): Promise<any> {
        this.urlCalled = url;
        this.urlCalls++;
        this.receivedBody = body;
        return Promise.resolve(this.dataToReturn);
    }

    urlCalls = 0;
    urlCalled = '';
    dataToReturn: any = null
    receivedBody: any = null
}

const dummyCollectionName = 'my-collection-name';

describe('Patch Data Method', () => {

    const makeSut = () => {
        const client = new GetClientSpy();
        const sut = new DataPatcher(client);
        return {sut, client};
    }

    test('should reject an empty database name', async () => {
        const {sut} = makeSut();
        await expect(sut.patch(''))
            .rejects
            .toThrow(Error)
    });

    test('should encode database name', async () => {

        const {sut, client} = makeSut();
        const unencodedDatabaseName = '!my _- unencoded DB #$ name';
        const expected = encodeURIComponent(unencodedDatabaseName);

        await sut.patch(unencodedDatabaseName);

        expect(client.urlCalled).toContain(expected);
    });

    test('should not send callback url by default', async () => {

        const {sut, client} = makeSut();

        await sut.patch(dummyCollectionName);

        expect(client.urlCalled).toMatch(/callback_url=$/gi);
    });

    test('should send the callback url', async () => {

        const {sut, client} = makeSut();
        const callbackUrl = 'my-callback-url';

        await sut.patch(dummyCollectionName, callbackUrl);

        expect(client.urlCalled).toContain(`?callback_url=${callbackUrl}`);
    });

    test('should send an encoded callback url', async () => {

        const {sut, client} = makeSut();
        const callbackUrl = 'U#$encoe%d_U&L with sp@aces';
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        await sut.patch(dummyCollectionName, callbackUrl);

        expect(client.urlCalled).toContain(encodedCallbackUrl);
    });

    test('should not send an unencoded callback url', async () => {

        const {sut, client} = makeSut();
        const callbackUrl = 'U#$encoe%d_U&L with sp@aces';

        await sut.patch(dummyCollectionName, callbackUrl);

        expect(client.urlCalled).not.toContain(callbackUrl);
    });

    test('should call server once', async () => {

        const {sut, client} = makeSut();

        await sut.patch(dummyCollectionName);

        expect(client.urlCalls).toBe(1);
    });

    test('should return data from client', async () => {

        const {sut, client} = makeSut();
        const dummyData = {
            count: 200
        };

        client.dataToReturn = dummyData;

        const data = await sut.patch(dummyCollectionName);

        expect(data).toBe(dummyData);
    });

});
