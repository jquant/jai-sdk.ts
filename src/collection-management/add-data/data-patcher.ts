import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {HttpJaiClientPatchInterface} from "../../client/http-jai-client-patch.interface";

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

        // if(callbackUrl && !callbackUrl.match(/^(http(s?)\:\/\/|~/|/)?([a-zA-Z]{1}([\w\-]+\.)+([\w]{2,5}))(:[\d]{1,5})?/?(\w+\.[\w]{3,4})?((\?\w+=\w+)?(&\w+=\w+)*)?/)){


        const encodedDatabaseName = encodeURIComponent(databaseName);
        const encodedCallbackUrl = encodeURIComponent(callbackUrl || '');

        return await this.client.patch(`data/${encodedDatabaseName}?callback_url=${encodedCallbackUrl}`, {});
    }
}
