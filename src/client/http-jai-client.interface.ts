import {HttpJaiClientPutInterface} from "./http-jai-client-put.interface";
import {HttpJaiClientGetInterface} from "./http-jai-client-get.interface";
import {HttpJaiClientPostInterface} from "./http-jai-client-post-interface";
import {HttpJaiClientDeleteInterface} from "./http-jai-delete-client.interface";
import {HttpJaiClientPatchInterface} from "./http-jai-client-patch.interface";

export interface HttpJaiClientInterface extends HttpJaiClientPutInterface, HttpJaiClientGetInterface,
    HttpJaiClientPostInterface, HttpJaiClientDeleteInterface, HttpJaiClientPatchInterface {

}

