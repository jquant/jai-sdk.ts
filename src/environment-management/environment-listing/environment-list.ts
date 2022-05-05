import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {HttpJaiClientGetInterface} from "../../client/http-jai-client-get.interface";
import {Environment} from "../environment";

@injectable()
export class EnvironmentLister {
    constructor(
        @inject("HttpJaiClientGetInterface") private readonly client: HttpJaiClientGetInterface
    ) {
    }

    async list(): Promise<Environment[]> {
        return await this.client.get(`environments`);
    }
}
