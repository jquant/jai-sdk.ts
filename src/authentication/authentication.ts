import axios from "axios";

export class Authenticator {
    authenticate(apiKey: string) {

        if (!apiKey)
            throw new Error('Api Key cannot be null')

        if (apiKey.length !== 32)
            throw new Error('Api Key must be 36 characters long')

        Authenticator.setClientHeader(apiKey);
    }

    private static setClientHeader(apiKey: string) {
        axios.defaults.headers.common['Authorization'] = apiKey;
    }

    authenticateFromEnvironmentVariable() {

        const {JAI_API_KEY} = process.env;

        if (!JAI_API_KEY)
            throw new Error('JAI_API_KEY environment variable is not set');

        Authenticator.setClientHeader(JAI_API_KEY);
    }
}
