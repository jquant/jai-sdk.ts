import "reflect-metadata"
import {HttpJaiHttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";
import {DatabaseInfo, mode} from "./types";
import {inject, injectable} from "tsyringe";

@injectable()
export class GetDatabaseInfo {

    constructor(
        @inject("HttpJaiClientGetInterface") private readonly client: HttpJaiHttpJaiClientGetInterface
    ) {
    }

    async getInfo(mode: mode = 'complete'): Promise<DatabaseInfo> {

        if (!mode)
            throw new Error('mode cannot be null');

        if (mode !== 'complete' && mode !== 'names')
            throw new Error('Invalid mode. Mode should be either names or complete');

        const url = `info?mode=${mode}&get_size=true`

        return await this.client.get(url);
    }
}
