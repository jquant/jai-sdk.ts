import {HttpJaiClientInterface} from "../client/http-jai-client.interface";
import {MissingApiKeyException} from "../exceptions/authentication/MissingApiKeyException";
import {ApiKeyRequest} from "../models/authentication/AuthenticationKeyUpdateRequest.interface";

export class Authenticator {

    constructor(
        private readonly httpClient: HttpJaiClientInterface) {
    }

    /**
     * Requests an API key and sends the new api key to your email address.
     * @param request
     */
    public async requestApiKey(request: ApiKeyRequest): Promise<void> {

        await this.httpClient.postApiKeyRequest(request);
    }

    throwExceptionIfNotAuthenticated(): void {
        if (!this.httpClient.authenticated) {
            throw new MissingApiKeyException();
        }
    }

    authenticate(apiKey: string): Authenticator {
        this.httpClient.registerApiKeyOnAllHeaders(apiKey);
        return this;
    }
}
