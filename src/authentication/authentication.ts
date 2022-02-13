import axios from "axios";
import {JaiApiKeyAuthenticator} from "./jai-api-key-authenticator.interface";

export class AxiosHttpClientAuthenticator implements JaiApiKeyAuthenticator {

    apiKey: string = '';

    authenticate(apiKey: string) {
        this.apiKey = apiKey;
        this.validateApiKey();
        this.setClientHeader();
    }

    private validateApiKey() {
        if (!this.apiKey)
            throw new Error('Api Key cannot be null')

        if (this.apiKey.length !== 32)
            throw new Error('Api Key must be 36 characters long')
    }

    private setClientHeader() {
        axios.defaults.headers.common['Auth'] = this.apiKey;
    }

    clearClientHeader() {
        delete axios.defaults.headers.common.Auth;
    }

    /**
     * Authenticates from JAI_API_KEY environment variable (NodeJS only)
     */
    authenticateFromEnvironmentVariable() {

        const {JAI_API_KEY} = process.env;

        if (!JAI_API_KEY)
            throw new Error('JAI_API_KEY environment variable is not set');

        this.apiKey = JAI_API_KEY;
        this.validateApiKey();
        this.setClientHeader();
    }
}
