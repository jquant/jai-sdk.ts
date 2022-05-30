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
import {DatabaseDescriptor} from "./collection-management/database-description/database-descriptor";
import {GetDatabaseInfo} from "./collection-management/database-info/get-database-info";
import {DatabaseInfo, mode} from "./collection-management/database-info/types";
import {IdGetter} from "./collection-management/ids/id-getter";
import {ReportGetter} from "./collection-management/report/report-getter";
import {VectorGetter} from "./collection-management/vector/vector-by.id";
import {KeyDownloader} from "./collection-management/vector/download/key-downloader";
import {StatusDeleter} from "./api/status/deletion/status-deleter";
import {EntityDeleter} from "./collection-management/deletion/entity/entity-deleter";
import {DatabaseDeleter} from "./collection-management/deletion/database/database-deleter";
import {SearchById} from "./similar/search/by-id/search-by-id";
import {SearchByData} from "./similar/search/by-data/search-by-data";
import {Predict} from "./model-interface/predict";
import {EnvironmentLister} from "./environment-management/environment-listing/environment-list";
import {Environment} from "./environment-management/environment";

Initializer.initializeInversionOfControl();

export const authenticate = (apiKey: string) => {
    const instance = container.resolve(AxiosHttpClientAuthenticator);
    instance.authenticate(apiKey);
}

export const getEnvironments = () : Promise<Environment[]> => {
    const instance = container.resolve(EnvironmentLister);
    return instance.list();
}

export const getStatus = async () => {
    const getter = container.resolve(StatusGetter);
    return getter.getStatus();
}

/**
 * Authenticates from JAI_API_KEY environment variable (NodeJS only)
 */
export const authenticateFromEnvironmentVariable = () => {
    const instance = container.resolve(AxiosHttpClientAuthenticator);
    instance.authenticateFromEnvironmentVariable();
}

/**
 * Authenticates from JAI_ENVIRONMENT_NAME environment variable (NodeJS only)
 */
export const jaiEnvironmentFromEnvironmentVariable = () => {
    const instance = container.resolve(AxiosHttpClientAuthenticator);
    instance.jaiEnvironmentFromEnvironmentVariable();
}

export const insertData = function (databaseName: string, filterName: string, data: any): Promise<any> {
    const instance = container.resolve(Creator);
    return instance.insert(databaseName, data, filterName);
}

/**
 * Get the column names of a supervised/selfsupervised database.
 * @param databaseName Target Database.
 */
export const getFields = (databaseName: string) => {
    const instance = container.resolve(GetTableFields);
    return instance.fields(databaseName);
}

/**
 * Check if a database name is valid.
 * @param databaseName Target Database.
 */
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
 * Includes additional data to an existing database.
 * @param databaseName Target Database.
 * @param callbackUrl Callback URL that should be called once the processing finishes. It should expect the
 * following pattern: {callback_url}/mycelia_status
 */
export const addData = (databaseName: string, callbackUrl: string = '') => {
    const instance = container.resolve(DataPatcher);
    return instance.patch(databaseName, callbackUrl)
}

/**
 * Get description of a specific database in your Mycelia environment.
 * @param databaseName Target Database.
 */
export const getDatabaseDescription = (databaseName: string) => {
    const instance = container.resolve(DatabaseDescriptor);
    return instance.describe(databaseName)
}

/**
 * Get information of all databases in your Mycelia environment.
 * @param mode
 */
export const getDatabaseInfo = (mode: mode): Promise<DatabaseInfo> => {
    const instance = container.resolve(GetDatabaseInfo);
    return instance.getInfo(mode)
}

/**
 * Get IDs info of a given database. Returns a list of integers or strings depending on the mode parameter definition.
 * @param databaseName Target Database.
 * @param mode mode IdReport (optional)
 */
export const getIds = (databaseName: string, mode: CheckInsertedDataMode = "simple"): Promise<any> => {
    const instance = container.resolve(IdGetter);
    return instance.getIds(databaseName, mode)
}

export const getReport = (databaseName: string): Promise<any> => {
    const instance = container.resolve(ReportGetter);
    return instance.getReport(databaseName)
}

/**
 * Get vectors according to the specified IDs.
 * @param databaseName Target Database.
 * @param ids List of IDs associated with the vectors we are interested in.
 */
export const getVectorId = (databaseName: string, ids: Array<number>): Promise<any> => {
    const instance = container.resolve(VectorGetter);
    return instance.getById(databaseName, ids);
}

export const getDownloadKey = (databaseName: string): Promise<any> => {
    const instance = container.resolve(KeyDownloader);
    return instance.downloadKey(databaseName);
}

export const deleteStatus = (databaseName: string): Promise<any> => {
    const instance = container.resolve(StatusDeleter);
    return instance.delete(databaseName);
}

/**
 * Delete vectors from a given database according to the specified IDs. This is a dev method.
 * @param databaseName Target Database.
 * @param ids IDs to be removed from the database.
 */
export const deleteEntity = (databaseName: string, ids: Array<number>): Promise<any> => {
    const instance = container.resolve(EntityDeleter);
    return instance.delete(databaseName, ids);
}

/**
 * Delete everything relative to a specified database.
 * @param databaseName Database to be deleted.
 */
export const deleteDatabase = (databaseName: string): Promise<any> => {
    const instance = container.resolve(DatabaseDeleter);
    return instance.delete(databaseName);
}

/**
 * Perform ID similarity search in the vector representations of a database.
 * @param databaseName Target Database.
 * @param ids IDs to search for the most similar vectors.
 * @param topK Number of similar vectors to return for each ID. Default is 5.
 */
export const similaritySearchById = (databaseName: string, ids: Array<number>, topK = 5): Promise<any> => {
    const instance = container.resolve(SearchById);
    return instance.search(databaseName, ids, topK);
}

/**
 * Performs data similarity search in the vector representations of a database.
 * @param databaseName Target Database.
 * @param criteria Data to process and search for the most similar vectors.
 * @param topK Number of similar vectors to return for each ID. Default is 5.
 */
export const similaritySearchByData = (databaseName: string, criteria: Array<any>, topK = 5): Promise<any> => {
    const instance = container.resolve(SearchByData);
    return instance.search(databaseName, criteria, topK);
}

/**
 * Returns a prediction of the supervised model. Returns a list of dictionaries with keys "id" and "predict".
 * @param databaseName Target Database.
 * @param criteria Data to process and search for the most similar vectors.
 * @param predictProbability
 */
export const predict = (databaseName: string, criteria: Array<any>, predictProbability = false): Promise<any> => {
    const instance = container.resolve(Predict);
    return instance.predict(databaseName, criteria, predictProbability);
}


console.log('Main Initialized')
