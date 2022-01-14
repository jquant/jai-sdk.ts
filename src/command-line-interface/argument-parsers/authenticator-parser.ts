import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {JaiApiKeyAuthenticator} from "../../authentication/jai-api-key-authenticator.interface";

@injectable()
export class AuthenticatorArgumentParser {

    constructor(
        @inject("JaiApiKeyAuthenticator")
        private readonly authenticator: JaiApiKeyAuthenticator) {
    }

    public authenticateFromCommandArgs(args: any): void {

        const {key} = args;

        if (!key)
            this.authenticator.authenticateFromEnvironmentVariable();

        this.authenticator.authenticate(key)
    }
}

