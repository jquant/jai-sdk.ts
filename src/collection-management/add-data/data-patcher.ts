import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {HttpJaiClientPatchInterface} from "../../client/http-jai-client-patch.interface";
import * as validUrl from 'valid-url'

@injectable()
export class DataPatcher {

    constructor(
        @inject("HttpJaiHttpJaiClientPatchInterface ") private readonly client: HttpJaiClientPatchInterface) {
    }

    /**
     * Check if a database name is valid.
     * @param databaseName Target Database.
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

