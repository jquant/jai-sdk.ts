import {Authenticator} from "./authentication";
import {HttpJaiClientInterface} from "../client/http-jai-client.interface";

class ClientSpy implements HttpJaiClientInterface {

    registeredApiKey = '';
    authenticated = false;

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

test('authenticate should register apikey on client instance', () => {

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

test('Should throw not authenticated exception', () => {

    const {sut} = makeSutInstance();

    expect(() => sut.throwExceptionIfNotAuthenticated())
        .toThrow("Your JAI key haven't been registered. " +
            "Please, invoke 'authenticate' method inside an Authenticator instance to do so.");
});
