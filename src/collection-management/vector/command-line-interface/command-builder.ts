import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {AuthenticatorArgumentParser} from "../../../command-line-interface/argument-parsers/authenticator-parser";
import {YargsCommandSettings} from "../../../command-line-interface/builders/types";
import {VectorGetter} from "../vector-by.id";

export const buildVectorByIdCommand = (): YargsCommandSettings => {
    return {
        command: 'get-vector-by-id [databaseName] [arrayOfIds]',
        description: 'Get vectors according to the specified IDs.',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .positional('databaseName', {
                    describe: 'Collection Name'
                })
                .positional('arrayOfIds', {
                    describe: 'Array of Ids'
                });
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const searchById = container
                .resolve(VectorGetter);

            const databaseName: string = <string>argv.databaseName;
            const arrayOfIds: Array<any> = JSON.parse(`[${argv.arrayOfIds}]`);

            const result = await searchById.getById(databaseName, arrayOfIds);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
