import "reflect-metadata"
import {Initializer} from "./ioc/register";
import {container} from "tsyringe";
import {StatusGetter} from "./api/status/status-getter";
import {AxiosHttpClientAuthenticator} from "./authentication/authentication";
import {Creator} from "./collection-management/collection-creator/creator";

Initializer.initializeInversionOfControl();

export const GetStatus = async () => {
    const getter = container.resolve(StatusGetter);
    return getter.getStatus();
}

export const Authenticate = (apiKey: string) => {
    const authenticator = container.resolve(AxiosHttpClientAuthenticator);
    authenticator.authenticate(apiKey);
}

export const AuthenticateFromEnvironmentVariable = () => {
    const authenticator = container.resolve(AxiosHttpClientAuthenticator);
    authenticator.authenticateFromEnvironmentVariable();
}

export const InsertData = async function (databaseName: string, filterName: string, data: any): Promise<any> {
    const creator = container.resolve(Creator);
    return await creator.insert(databaseName, data, filterName);
}

module.exports = {
    GetStatus,
    Authenticate,
    AuthenticateFromEnvironmentVariable,
    InsertData,
}
