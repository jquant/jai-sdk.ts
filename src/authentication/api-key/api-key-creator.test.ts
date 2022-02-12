import {ApiKeyCreator} from "./api-key-creator";
import {ApiKeyRequest} from "../../models/authentication/AuthenticationKeyUpdateRequest.interface";
import {HttpJaiClientPutInterface} from "../../client/http-jai-client-put.interface";

class PutDataClientSpy implements HttpJaiClientPutInterface {
    put(url: string, body: any): Promise<any> {
        this.calls++;
        this.postedData = body;
        this.url = url;
        return Promise.resolve({url, body});
    }
    calls = 0;
    postedData = {};
    url ='';
}

const makeSut = () => {
    const client = new PutDataClientSpy();
    const sut = new ApiKeyCreator(client);
    return {sut, client};
}

const requestDummy: ApiKeyRequest = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
};

describe('Api Key Creator', () => {

    test('should throw on null request', async () => {
        const {sut} = makeSut();
        const request: any = null;

        await expect(sut.requestApiKey(request))
            .rejects
            .toThrow();
    });

    test('should throw on invalid request', async () => {
        const {sut} = makeSut();
        const invalidRequest: ApiKeyRequest = {
            firstName: '',
            lastName: '',
            email: '',
            company: '',
        };

        await expect(sut.requestApiKey(invalidRequest))
            .rejects
            .toThrow();
    });

    test('should bot throw on valid request', async () => {
        const {sut} = makeSut();

        await sut.requestApiKey(requestDummy);
    });

    test('should call Post Client', async () => {

        const {sut, client} = makeSut();

        await sut.requestApiKey(requestDummy);

        expect(client.calls).toBe(1);
    });

    test('should post requestDummy Object', async () => {

        const {sut, client} = makeSut();

        await sut.requestApiKey(requestDummy);

        expect(client.postedData).toBe(requestDummy);
    });

    test('should post correct url', async () => {

        const {sut, client} = makeSut();

        await sut.requestApiKey(requestDummy);

        expect(client.url).toBe('auth');
    });

})
