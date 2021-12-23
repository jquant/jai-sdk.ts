import {RequestParser, Service} from 'http-service-ts';
import {AuthenticationKeyUpdateRequest} from "./models/authentication/AuthenticationKeyUpdateRequest.interface";
import {MissingApiKeyException} from "./exceptions/authentication/MissingApiKeyException";

export class Authenticator {

    private rootUrl: string = 'https://mycelia.azure-api.net/';
    private client: RequestParser = new RequestParser();

    public async updateAuthKey(request: AuthenticationKeyUpdateRequest): Promise<string> {
        this.throwExceptionIfNotAuthenticated();


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

        // this.client.config.headers.append('Content-Type', 'application/json');


        return this;
    }

    init() {
        console.debug('Initializing JAI Authenticator...');
        console.debug(`Endpoint:${this.rootUrl}`);
    }

}


// export const authenticator = {
//     getAuthKey(): Promise<string> {
//
//
//
//     }
// }
