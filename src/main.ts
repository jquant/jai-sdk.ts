import "reflect-metadata"
import {Initializer} from "./ioc/register";
import {container} from "tsyringe";
import {StatusGetter} from "./api/status/status-getter";
import {AxiosHttpClientAuthenticator} from "./authentication/authentication";
import {Creator} from "./collection-management/collection-creator/creator";
import {GetTableFields} from "./collection-management/table-fields/get-table-fields";

Initializer.initializeInversionOfControl();

const GetStatus = async () => {
    const getter = container.resolve(StatusGetter);
    return getter.getStatus();
}

const Authenticate = (apiKey: string) => {
    const authenticator = container.resolve(AxiosHttpClientAuthenticator);
    authenticator.authenticate(apiKey);
}

const AuthenticateFromEnvironmentVariable = () => {
    const authenticator = container.resolve(AxiosHttpClientAuthenticator);
    authenticator.authenticateFromEnvironmentVariable();
}

const InsertData = function (databaseName: string, filterName: string, data: any): Promise<any> {
    const creator = container.resolve(Creator);
    return creator.insert(databaseName, data, filterName);
}

const GetFields = (databaseName: string) => {
    const getter = container.resolve(GetTableFields);
    return getter.fields(databaseName);

}

module.exports = {
    GetStatus,
    Authenticate,
    AuthenticateFromEnvironmentVariable,
    InsertData,
    GetFields,
}
