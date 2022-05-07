import axios from "axios";
import {JaiApiKeyAuthenticator} from "./jai-api-key-authenticator.interface";

export class AxiosHttpClientAuthenticator implements JaiApiKeyAuthenticator {

    apiKey: string = '';
    environment: string = '';

    authenticate(apiKey: string) {
        this.apiKey = apiKey;
        this.validateApiKey();
        this.setApiKeyOnAxiosHeader();
    }

    setEnvironment(environmentName: string) {
        if (!environmentName)
            throw new Error('Environment Name cannot be null')

        this.environment = environmentName;
        this.setEnvironmentKeyOnAxiosHeader();
    }

    private setEnvironmentKeyOnAxiosHeader() {
        axios.defaults.headers.common['environment'] = this.environment;
    }

    private validateApiKey() {
        if (!this.apiKey)
            throw new Error('Api Key cannot be null')

        if (this.apiKey.length !== 32)
            throw new Error('Api Key must be 36 characters long')
    }

    private setApiKeyOnAxiosHeader() {
        axios.defaults.headers.common['Auth'] = this.apiKey;
    }

    clearClientHeader() {
        delete axios.defaults.headers.common.Auth;
        delete axios.defaults.headers.common.environment;
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
        this.setApiKeyOnAxiosHeader();
    }

    /**
     * Authenticates from JAI_ENVIRONMENT_NAME environment variable (NodeJS only)
     */
    jaiEnvironmentFromEnvironmentVariable() {

        const {JAI_ENVIRONMENT_NAME} = process.env;

        if (!JAI_ENVIRONMENT_NAME)
            throw new Error('JAI_ENVIRONMENT_NAME environment variable is not set');

        this.environment = JAI_ENVIRONMENT_NAME;
        this.setEnvironmentKeyOnAxiosHeader();
    }
}
