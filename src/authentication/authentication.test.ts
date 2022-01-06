import {Authenticator} from "./authentication";
import {HttpJaiClientInterface} from "../client/http-jai-client.interface";

class ClientSpy implements HttpJaiClientInterface {

    registeredApiKey = '';

    registerApiKeyOnAllHeaders(key: string) {
        this.registeredApiKey = key
    }
}

const makeSutInstance = () => {
    const client = new ClientSpy()
    const target = new Authenticator(client);

    return {
        clientSpy: client,
        sut: target
    };
}

test('authenticate receives registers apikey on client', () => {

    const apiKeyValue = 'custom_api_key';

    const {sut, clientSpy} = makeSutInstance();

    sut.authenticate(apiKeyValue);

    expect(clientSpy.registeredApiKey).toBe(apiKeyValue)
});

test('authenticate should returns itself', () => {

    const {sut} = makeSutInstance();

    const result = sut.authenticate('custom_api_key');

    expect(result).toBe(sut);
});
