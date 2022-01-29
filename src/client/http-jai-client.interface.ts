import {HttpJaiHttpJaiClientPutInterface} from "./http-jai-client-put.interface";
import {HttpJaiHttpJaiClientGetInterface} from "./http-jai-client-get.interface";
import {HttpJaiHttpJaiClientPostInterface} from "./http-jai-client-post-interface";
import {HttpJaiHttpJaiClientDeleteInterface} from "./http-jai-delete-client.interface";

export interface HttpJaiClientInterface extends HttpJaiHttpJaiClientPutInterface, HttpJaiHttpJaiClientGetInterface,
    HttpJaiHttpJaiClientPostInterface, HttpJaiHttpJaiClientDeleteInterface {

}

