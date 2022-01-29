import yargs from "yargs";

import {container} from "tsyringe";
import {HttpJaiHttpJaiClientPutInterface} from "../../client/http-jai-client-put.interface";
import {JaiHttpServiceImplementation} from "../../client/JaiHttpServiceImplementation";

container.register<HttpJaiHttpJaiClientPutInterface>("HttpJaiClientPutInterface", {useClass: JaiHttpServiceImplementation});

export const buildRequestApiKeyCommand = () => {
    return {
        command: 'scan [port]',
        description:'scan the server port',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .positional('port', {
                    describe: 'port to bind on',
                    default: 5000
                });
        },

        handler: (argv: yargs.ArgumentsCamelCase<string>) => {

            if (argv.verbose)
                console.info(`scanning server por :${argv.port}`)

            console.log(argv.port)

        }
    }
};
