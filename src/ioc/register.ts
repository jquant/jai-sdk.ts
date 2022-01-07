import {container} from "tsyringe";
import {HttpJaiClientPutInterface} from "../client/http-jai-client-put.interface";
import {JaiHttpServiceImplementation} from "../client/JaiHttpServiceImplementation";

export class Initializer {
    static initializeInversionOfControl() {
        container.register<HttpJaiClientPutInterface>("ClientPutInterface",
            {useClass: JaiHttpServiceImplementation});

    }
}
