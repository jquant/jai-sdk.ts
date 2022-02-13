import "reflect-metadata"
import {Initializer} from "./ioc/register";
import {container} from "tsyringe";
import {StatusGetter} from "./api/status/status-getter";
import {AxiosHttpClientAuthenticator} from "./authentication/authentication";
import {Creator} from "./collection-management/collection-creator/creator";
import {GetTableFields} from "./collection-management/table-fields/get-table-fields";
import {DatabaseNameValidator} from "./collection-management/name-validation/database-name-validator";
import {CheckInsertedDataMode, InsertedDataChecker} from "./collection-management/data-check/inserted-data-checker";
import {InsertedDataSetup, SetupSettings} from "./collection-management/setup/inserted-data-setup";
import {InsertedDataInterrupter} from "./collection-management/interrupter/inserted-data-interrupter";
import {InsertedDataDeleter} from "./collection-management/deletion/inserted-data/inserted-data-deleter";
import {DataPatcher} from "./collection-management/add-data/data-patcher";

Initializer.initializeInversionOfControl();

export const getStatus = async () => {
    const getter = container.resolve(StatusGetter);
    return getter.getStatus();
}

export const authenticate = (apiKey: string) => {
    const instance = container.resolve(AxiosHttpClientAuthenticator);
    instance.authenticate(apiKey);
}

export const authenticateFromEnvironmentVariable = () => {
    const instance = container.resolve(AxiosHttpClientAuthenticator);
    instance.authenticateFromEnvironmentVariable();
}

export const insertData = function (databaseName: string, filterName: string, data: any): Promise<any> {
    const instance = container.resolve(Creator);
    return instance.insert(databaseName, data, filterName);
}

export const getFields = (databaseName: string) => {
    const instance = container.resolve(GetTableFields);
    return instance.fields(databaseName);
}

export const isDatabaseNameValid = (databaseName: string) => {
    const instance = container.resolve(DatabaseNameValidator);
    return instance.isDatabaseNameValid(databaseName);
}

export const checkInsertedData = (databaseName: string, mode: CheckInsertedDataMode) => {
    const instance = container.resolve(InsertedDataChecker);
    return instance.check(databaseName, mode);
}

export const setupInsertedData = (databaseName: string, settings: SetupSettings,
                                  quickTest: boolean = false, overwrite: boolean = false) => {
    const instance = container.resolve(InsertedDataSetup);
    return instance.setup(databaseName, settings, quickTest, overwrite);
}

export const interruptDataSetup = (databaseName: string) => {
    const instance = container.resolve(InsertedDataInterrupter);
    return instance.interrupt(databaseName)
}

export const deleteInsertedData = (databaseName: string) => {
    const instance = container.resolve(InsertedDataDeleter);
    return instance.delete(databaseName)
}

/**
 * Check if a database name is valid.
 * @param databaseName Target Database.
 * @param callbackUrl Callback URL that should be called once the processing finishes. It should expect the
 * following pattern: {callback_url}/mycelia_status
 */
export const addData = (databaseName: string, callbackUrl: string = '') => {
    const instance = container.resolve(DataPatcher);
    return instance.patch(databaseName, callbackUrl)
}
