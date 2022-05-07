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
                });
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const instance = container.resolve(RecommendationByData);

            const databaseName: string = <string>argv.databaseName;
            const data: Array<any> = JSON.parse(<string>argv.data);

            if (argv.verbose) {
                console.log({databaseName, data})
            }

            const result = await instance.search(databaseName, data);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
