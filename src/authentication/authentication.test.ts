import axios from "axios";
import {AxiosHttpClientAuthenticator} from "./authentication";

describe('AxiosHttpClientAuthenticator tests', () => {

    const validApiKey = '00000000000000000000000000000000';
    const validEnvironmentName = 'dummy-jai-environment';

    const makeSutInstance = () => {
        const target = new AxiosHttpClientAuthenticator();

        return {
            sut: target
        };
    }

    test('should throw invalid api key exception', () => {

        const {sut} = makeSutInstance();
        const invalidKey: any = null;

        expect(() => {
            sut.authenticate(invalidKey);
        }).toThrow()
    });

    test('should throw invalid api key exception for parameter key', () => {

        const {sut} = makeSutInstance();
        const invalidKey: any = null;

        expect(() => {
            sut.authenticate(invalidKey);
        }).toThrow()
    });

    test('should throw invalid environment name exception for null environment', () => {

        const {sut} = makeSutInstance();
        const invalidKey: any = null;

        expect(() => {
            sut.setEnvironment(invalidKey);
        }).toThrow()
    });

    test('should set apikey on axios default settings', () => {

        const {sut} = makeSutInstance();

        sut.authenticate(validApiKey);

        expect(axios.defaults.headers.common['Auth']).toBe(validApiKey)
    });

    test('should set environment name on axios default settings', () => {

        const {sut} = makeSutInstance();
        const envName = 'my-dummy-environment';

        sut.setEnvironment(envName)

        expect(axios.defaults.headers.common['environment']).toBe(envName)
    });

    test('should throw an error for JAI_API_KEY not set', () => {

        const {sut} = makeSutInstance();

        expect(() => {
            sut.authenticateFromEnvironmentVariable();
        }).toThrow()
    });

    test('should throw invalid api key exception for environment variable', () => {

        const {sut} = makeSutInstance();

        process.env.JAI_API_KEY = 'my test jai key';

        expect(() => sut.authenticateFromEnvironmentVariable())
            .toThrow();
    });


    test('should set api on axios using environment variable', () => {

        const {sut} = makeSutInstance();

        process.env.JAI_API_KEY = validApiKey;

        sut.authenticateFromEnvironmentVariable();

        expect(axios.defaults.headers.common['Auth'])
            .toBe(validApiKey)
    });

    test('should set environment name on axios using environment variable', () => {

        const {sut} = makeSutInstance();

        process.env.JAI_ENVIRONMENT_NAME = validEnvironmentName;

        sut.jaiEnvironmentFromEnvironmentVariable();

        expect(axios.defaults.headers.common['environment'])
            .toBe(validEnvironmentName)
    });

    test('should remove auth header on axios', () => {

        const {sut} = makeSutInstance();

        process.env.JAI_API_KEY = validApiKey;

        sut.authenticateFromEnvironmentVariable();
        sut.clearClientHeader();

        expect(axios.defaults.headers.common['Auth'])
            .toBeUndefined()
    });

    test('should remove environment header on axios', () => {

        const {sut} = makeSutInstance();

        process.env.JAI_ENVIRONMENT_NAME = validEnvironmentName;

        sut.jaiEnvironmentFromEnvironmentVariable();
        sut.clearClientHeader();

        expect(axios.defaults.headers.common['environment'])
            .toBeUndefined()
    });

})
