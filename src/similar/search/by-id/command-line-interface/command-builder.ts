import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {SearchById} from "../search-by-id";
import {AuthenticatorArgumentParser} from "../../../../command-line-interface/argument-parsers/authenticator-parser";
import {YargsCommandSettings} from "../../../../command-line-interface/builders/types";

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
                })
                .option('topk', {
                    type: "number",
                    default: 5,
                    description: 'Number of similar recommendations to return for each ID. Default is 5.'
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
            const topK: number = <number>argv.topk;

            if (argv.verbose)
                console.log({databaseName, arrayOfIds, topK});

            if (argv['dry-run'])
                return;

            const result = await searchById.search(databaseName, arrayOfIds, topK);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
