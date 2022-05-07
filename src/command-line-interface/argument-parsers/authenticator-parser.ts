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

        const {key, environment, verbose} = args;

        if(verbose)
            console.log('authentication settings' , {key, environment})

        if (!key)
            this.authenticator.authenticateFromEnvironmentVariable();

        this.authenticator.authenticate(key)

        if(environment)
            this.authenticator.setEnvironment(environment);
    }
}

