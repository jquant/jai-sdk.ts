import {container} from "tsyringe";
import {HttpJaiClientPutInterface} from "./client/http-jai-client-put.interface";
import {JaiHttpServiceImplementation} from "./client/JaiHttpServiceImplementation";

container.register<HttpJaiClientPutInterface>("ClientPutInterface", {useClass: JaiHttpServiceImplementation});
