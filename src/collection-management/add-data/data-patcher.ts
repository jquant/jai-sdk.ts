import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {HttpJaiClientPatchInterface} from "../../client/http-jai-client-patch.interface";
import * as validUrl from 'valid-url'

@injectable()
export class DataPatcher {

    constructor(
        @inject("HttpJaiClientPatchInterface") private readonly client: HttpJaiClientPatchInterface) {
    }

    /**
     * Check if a database name is valid.
     * @param databaseName Target Database.
     * @param callbackUrl Callback URL that should be called once the processing finishes. It should expect the
     * following pattern: {callback_url}/mycelia_status
     */
    async patch(databaseName: string, callbackUrl: string = ''): Promise<void> {

        if (!databaseName)
            throw new Error('You must provide e databaseName');

        if (callbackUrl && !validUrl.isUri(callbackUrl))
            throw new Error('You must provide e valid callback url');

        const encodedDatabaseName = encodeURIComponent(databaseName);
        const encodedCallbackUrl = encodeURIComponent(callbackUrl || '');

        return await this.client.patch(`data/${encodedDatabaseName}?callback_url=${encodedCallbackUrl}`, {});
    }
}

