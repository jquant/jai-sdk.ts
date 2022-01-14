import {AuthenticatorArgumentParser} from "./authenticator-parser";
import {JaiApiKeyAuthenticator} from "../../authentication/jai-api-key-authenticator.interface";

describe('Argument Parser Tests', () => {

    class AuthenticatorSpy implements JaiApiKeyAuthenticator {
        fromEnvironmentCount = 0
        fromApiKeyCount = 0;
        apiKeyProvided = ''
        shouldThrow = false;

        authenticate(apiKey: string): void {
            this.apiKeyProvided = apiKey;
            this.fromApiKeyCount++;

            if (this.shouldThrow)
                throw new Error();
        }

        authenticateFromEnvironmentVariable(): void {
            this.fromEnvironmentCount++;
        }
    }

    const makeSut = () => {

        const authenticatorSpy = new AuthenticatorSpy()
        const sut = new AuthenticatorArgumentParser(authenticatorSpy);

        return {authenticatorSpy, sut};
    }

    test('should call environment authentication', () => {

        const args = {};
        const {sut, authenticatorSpy} = makeSut()

        sut.authenticateFromCommandArgs(args);

        expect(authenticatorSpy.fromEnvironmentCount)
            .toBe(1)
    });

    test('should call api key authentication', () => {

        const args = {key: 'my-key'};
        const {sut, authenticatorSpy} = makeSut()

        sut.authenticateFromCommandArgs(args);

        expect(authenticatorSpy.fromApiKeyCount)
            .toBe(1)
    });

    test('should match api key authentication', () => {

        const args = {key: 'my-key'};
        const {sut, authenticatorSpy} = makeSut()

        sut.authenticateFromCommandArgs(args);

        expect(authenticatorSpy.apiKeyProvided)
            .toBe(args.key)
    });

    test('should pass the authenticator exception through', () => {

        const args = {key: 'my-key'};
        const {sut, authenticatorSpy} = makeSut()

        authenticatorSpy.shouldThrow = true;

        expect(() => sut.authenticateFromCommandArgs(args)).toThrow();
    });
});

