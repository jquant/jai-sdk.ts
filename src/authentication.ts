import {RequestParser, Service} from 'http-service-ts';
import {AuthenticationKeyUpdateRequest} from "./models/authentication/AuthenticationKeyUpdateRequest.interface";
import {MissingApiKeyException} from "./exceptions/authentication/MissingApiKeyException";

export class Authenticator {

    private client: RequestParser =  new RequestParser( 'https://mycelia.azure-api.net/', {
        headers: new Headers({
            Accept: 'application/json'
        }),
        appendSlash: true
    });

    public async updateAuthKey(request: AuthenticationKeyUpdateRequest): Promise<string> {

        this.throwExceptionIfNotAuthenticated();

this.client.request(request);
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
