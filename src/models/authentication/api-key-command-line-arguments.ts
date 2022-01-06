import {ApiKeyRequest} from "./api-key-request";

export class ApiKeyCommandLineArguments implements ApiKeyRequest{
    readonly company: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
}
