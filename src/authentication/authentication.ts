import {HttpJaiClientInterface} from "../client/http-jai-client.interface";
import {MissingApiKeyException} from "../exceptions/authentication/MissingApiKeyException";

export class Authenticator {

    constructor(
        private readonly httpClient: HttpJaiClientInterface) {
    }


    /**
     * Requests an API key and sends the new api key to your email address.
     * @param request
     */
    // public async getApiKey(request: ApiKeyRequest): Promise<string> {
    //
    //     ApiKeyRequestSchema.validate(request);
    //
    //     return await this.client.request<string>({
    //         url: 'auth',
    //         method: 'get',
    //         ...request
    //     });
    // }
    //
    throwExceptionIfNotAuthenticated(): void {
        if (!this.httpClient.authenticated) {
            throw new MissingApiKeyException();
        }
    }

    // getAuthenticatedHttpClient(): RequestParser {
    //     return this.client;
    // }

    authenticate(apiKey: string): Authenticator {
        this.httpClient.registerApiKeyOnAllHeaders(apiKey);
        return this;
    }

    // init() {
    //     console.debug('Initializing JAI Authenticator...');
    //     console.debug(`Endpoint:${this.rootUrl()}`);
    // }

}
