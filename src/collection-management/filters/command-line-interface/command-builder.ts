// noinspection DuplicatedCode

import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {YargsCommandSettings} from "../../../command-line-interface/builders/types";
import {AuthenticatorArgumentParser} from "../../../command-line-interface/argument-parsers/authenticator-parser";
import {FilterGetter} from "../filter-getter";


export const buildCollectionGetFilterCommand = (): YargsCommandSettings => {
    return {
        command: 'get-filters [databaseName]',
        description: 'Get the list of all existing filters in the database. Returns a list of all filters.',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .positional('databaseName', {
                    describe: 'Database name to get the column names from.'
                });
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const instance = container.resolve(FilterGetter);

            const databaseName = <string>argv.databaseName;

            if (argv.verbose) {
                console.log({databaseName})
            }

            const result = await instance.getFilters(databaseName);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
