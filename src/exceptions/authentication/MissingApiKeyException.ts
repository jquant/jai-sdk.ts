import {JaiException} from "../JaiException";

export class MissingApiKeyException extends JaiException {
    constructor() {
        super("Your JAI key haven't been registered. Please, invoke 'authenticate' method inside " +
            "an Authenticator instance to do so.");
    }
}
