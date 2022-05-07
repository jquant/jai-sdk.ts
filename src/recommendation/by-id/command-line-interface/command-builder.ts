import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {RecommendationById} from "../recommendation-by-id";
import {YargsCommandSettings} from "../../../command-line-interface/builders/types";
import {AuthenticatorArgumentParser} from "../../../command-line-interface/argument-parsers/authenticator-parser";

export const buildRecommendationByIdCommand = (): YargsCommandSettings => {
    return {
        command: 'recommendation-by-id [databaseName] [arrayOfIds]',
        description: 'Perform ID recommendation search in the vector representations of a database.',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .positional('databaseName', {
                    describe: 'Collection Name',
                    description: 'Database name to perform recommendation search operation.'
                })
                .positional('arrayOfIds', {
                    describe: 'Array of Ids',
                    description: 'IDs to search for the recommendation.'
                })
                .option('topk', {
                    alias: 'k',
                    type: "number",
                    description: 'Number of similar recommendations to return for each ID. Default is 5.'
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
            const topK: number = <number>argv.topk;

            const result = await searchById.search(databaseName, arrayOfIds, topK);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
