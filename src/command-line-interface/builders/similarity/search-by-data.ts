import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {YargsCommandSettings} from "../types";
import {SearchByData} from "../../../similar/search/by-data/search-by-data";
import {AuthenticatorArgumentParser} from "../../argument-parsers/authenticator-parser";

export const buildSearchByDataCommand = (): YargsCommandSettings => {
    return {
        command: 'similarity-search-by-data [databaseName] [data]',
        description: 'search by data an array of data',
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

            const instance = container.resolve(SearchByData);

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
