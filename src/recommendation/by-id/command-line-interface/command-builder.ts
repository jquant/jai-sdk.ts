import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {RecommendationById} from "../recommendation-by-id";
import {YargsCommandSettings} from "../../../command-line-interface/builders/types";
import {AuthenticatorArgumentParser} from "../../../command-line-interface/argument-parsers/authenticator-parser";

export const buildRecommendationByIdCommand = (): YargsCommandSettings => {
    return {
        command: 'recommendation-by-id [databaseName] [arrayOfIds]',
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
                .resolve(RecommendationById);

            const databaseName: string = <string>argv.databaseName;
            const arrayOfIds: Array<any> = JSON.parse(`[${argv.arrayOfIds}]`);

            const result = await searchById.search(databaseName, arrayOfIds);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
