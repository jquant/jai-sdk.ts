import axios from "axios";
import {Authenticator} from "./authentication";

const validApiKey = '00000000000000000000000000000000';

const makeSutInstance = () => {
    const target = new Authenticator();

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


test('should set apikey on axios default settings', () => {

    const {sut} = makeSutInstance();

    sut.authenticate(validApiKey);

    expect(axios.defaults.headers.common['Authorization']).toBe(validApiKey)
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

    expect(axios.defaults.headers.common['Authorization'])
        .toBe(validApiKey)
});

