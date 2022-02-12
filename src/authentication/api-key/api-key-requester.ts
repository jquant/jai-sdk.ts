import "reflect-metadata"
import {inject, injectable} from "tsyringe";
import {ApiKeyRequest} from "../../models/authentication/AuthenticationKeyUpdateRequest.interface";
import {ApiKeyRequestSchema} from "../../validation/schemas";
import {HttpJaiClientPutInterface} from "../../client/http-jai-client-put.interface";

@injectable()
export class ApiKeyRequester {

    constructor(
        @inject("HttpJaiClientPutInterface") private readonly client: HttpJaiClientPutInterface
    ) {
    }

    async requestApiKey(request: ApiKeyRequest) {
        await ApiKeyRequestSchema.validateAsync(request);
        await this.client.put('auth', request);
    }

}
