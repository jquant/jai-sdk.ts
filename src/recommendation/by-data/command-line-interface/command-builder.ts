import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {RecommendationByData} from "../recommendation-by-data";
import {YargsCommandSettings} from "../../../command-line-interface/builders/types";
import {AuthenticatorArgumentParser} from "../../../command-line-interface/argument-parsers/authenticator-parser";

export const buildRecommendationByDataCommand = (): YargsCommandSettings => {
    return {
        command: 'recommendation-search-by-data [databaseName] [data]',
        description: 'Perform ID recommendation search in the vector representations of a database.',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .positional('databaseName', {
                    describe: 'Collection Name'
                })
                .positional('data', {
                    describe: 'Data to compare similarity'
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

            const instance = container.resolve(RecommendationByData);

            const databaseName: string = <string>argv.databaseName;
            const data: Array<any> = JSON.parse(<string>argv.data);
            const topK: number = <number>argv.topk;

            if (argv.verbose)
                console.log({databaseName, data, topK});

            if (argv['dry-run'])
                return;

            const result = await instance.search(databaseName, data, topK);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
