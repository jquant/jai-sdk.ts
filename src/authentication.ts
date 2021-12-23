import {RequestParser, Service} from 'http-service-ts';
import {ApiKeyRequest} from "./models/authentication/AuthenticationKeyUpdateRequest.interface";
import {MissingApiKeyException} from "./exceptions/authentication/MissingApiKeyException";

import {ApiKeyRequestSchema} from "./validation/schemas";

export class Authenticator extends Service<any> {

    private client: RequestParser = new RequestParser(this.rootUrl(), {
        headers: new Headers({
            Accept: 'application/json'
        }),
        appendSlash: true
    });

    rootUrl(): string {
        return 'https://mycelia.azure-api.net/';
    }

    /**
     * Requests an API key and sends the new api key to your email address.
     * @param request
     */
    public async getApiKey(request: ApiKeyRequest): Promise<string> {

        ApiKeyRequestSchema.validate(request);

        return await this.client.request<string>({
            url: 'auth',
            method: 'get',
            ...request
        });
    }

    throwExceptionIfNotAuthenticated() {
        if (!this.client.config.headers.has('Auth')) {
            throw new MissingApiKeyException();
        }
    }

    getAuthenticatedHttpClient(): RequestParser {
        return this.client;
    }

    authenticate(apiKey: string): Authenticator {
        this.client.config.headers.delete('Auth');
        this.client.config.headers.append('Auth', apiKey)

        return this;
    }

    init() {
        console.debug('Initializing JAI Authenticator...');
        console.debug(`Endpoint:${this.rootUrl()}`);
    }

}
