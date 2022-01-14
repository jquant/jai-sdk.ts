import {JaiApiKeyAuthenticator} from "../../authentication/authentication";

export class AuthenticatorArgumentParser {

    constructor(
        private readonly authenticator: JaiApiKeyAuthenticator) {
    }

    authenticateFromCommandArgs(args: any) {

        const {key} = args;

        if (!key)
            this.authenticator.authenticateFromEnvironmentVariable();

        this.authenticator.authenticate(key)
    }
}

