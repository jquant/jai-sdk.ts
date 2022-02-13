import "reflect-metadata"
import {Initializer} from "./ioc/register";
import {container} from "tsyringe";
import {StatusGetter} from "./api/status/status-getter";
import {AxiosHttpClientAuthenticator} from "./authentication/authentication";
import {Creator} from "./collection-management/collection-creator/creator";
import {GetTableFields} from "./collection-management/table-fields/get-table-fields";
import {DatabaseNameValidator} from "./collection-management/name-validation/database-name-validator";
import {CheckInsertedDataMode, InsertedDataChecker} from "./collection-management/data-check/inserted-data-checker";

Initializer.initializeInversionOfControl();

export const getStatus = async () => {
    const getter = container.resolve(StatusGetter);
    return getter.getStatus();
}

export const authenticate = (apiKey: string) => {
    const authenticator = container.resolve(AxiosHttpClientAuthenticator);
    authenticator.authenticate(apiKey);
}

export const authenticateFromEnvironmentVariable = () => {
    const authenticator = container.resolve(AxiosHttpClientAuthenticator);
    authenticator.authenticateFromEnvironmentVariable();
}

export const insertData = function (databaseName: string, filterName: string, data: any): Promise<any> {
    const creator = container.resolve(Creator);
    return creator.insert(databaseName, data, filterName);
}

export const getFields = (databaseName: string) => {
    const getter = container.resolve(GetTableFields);
    return getter.fields(databaseName);
}

export const isDatabaseNameValid = (databaseName: string) => {
    const validator = container.resolve(DatabaseNameValidator);
    return validator.isDatabaseNameValid(databaseName);
}

export const checkInsertedData = (databaseName: string, mode: CheckInsertedDataMode) => {
    const validator = container.resolve(InsertedDataChecker);
    return validator.check(databaseName, mode);
}
