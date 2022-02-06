import {HttpJaiHttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";
import {DatabaseInfo, mode} from "./types";

export class GetDatabaseInfo {

    constructor(
        private readonly client: HttpJaiHttpJaiClientGetInterface
    ) {
    }

    async getInfo(mode: mode = 'complete'): Promise<DatabaseInfo> {

        if (!mode)
            throw new Error('mode cannot be null');

        if (mode !== 'complete' && mode !== 'names')
            throw new Error('Invalid mode. Mode should be either names or complete');

        const url = `ingo?mode=${mode}&get_size=true`

        return await this.client.get(url);
    }
}
