import {JaiApiKeyAuthenticator} from "./jai-api-key-authenticator.interface";
import {JaiAEnvironmentAuthenticator} from "./jai-environment-authenticator.interface";

export interface JaiAuthenticator extends JaiApiKeyAuthenticator, JaiAEnvironmentAuthenticator {

}
