// noinspection DuplicatedCode

import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {YargsCommandSettings} from "../../../command-line-interface/builders/types";
import {AuthenticatorArgumentParser} from "../../../command-line-interface/argument-parsers/authenticator-parser";
import {Creator} from "../creator";

export const buildCollectionCreateCommand = (): YargsCommandSettings => {
    return {
        command: 'insert-data [databaseName] [data]',
        description: 'creates a new collection',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .positional('databaseName', {
                    describe: 'Database name to perform the insertion in'
                })
                .positional('data', {
                    describe: 'Table data to be inserted as JSON'
                })
                .option('filter-name', {
                    type: 'string',
                    alias: 'f',
                    description: 'Column name used as filter'
                });
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const instance = container.resolve(Creator);

            const databaseName: string = <string>argv.databaseName;
            const filterName: string = <string>argv['filter-name'];
            const data: Array<any> = JSON.parse(<string>argv.data);

            if (argv.verbose) {
                console.log({databaseName, data, filterName})
            }

            const result = await instance.insert(databaseName, data, filterName);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
