import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {SearchById} from "../../../similar/search/by-id/search-by-id";
import {AuthenticatorArgumentParser} from "../../argument-parsers/authenticator-parser";
import {YargsCommandSettings} from "../types";

export const buildSearchByIdCommand = (): YargsCommandSettings => {
    return {
        command: 'similarity-search-by-id [databaseName] [arrayOfIds]',
        description: 'search by similarity an array of ids',
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
                .resolve(SearchById);

            const databaseName: string = <string>argv.databaseName;
            const arrayOfIds: Array<any> = JSON.parse(`[${argv.arrayOfIds}]`);

            const result = await searchById.search(databaseName, arrayOfIds);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
