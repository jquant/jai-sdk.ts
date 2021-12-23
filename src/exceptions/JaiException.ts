export class JaiException extends Error {

    constructor(errorMessage: string) {
        super(errorMessage);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, JaiException.prototype);
    }
}
