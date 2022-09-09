export class JaiGetFieldsNotSupportedException extends Error {

    constructor(errorMessage: string) {
        super(errorMessage);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, JaiGetFieldsNotSupportedException.prototype);
    }
}
