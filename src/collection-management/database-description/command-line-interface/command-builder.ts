// noinspection DuplicatedCode

import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {YargsCommandSettings} from "../../../command-line-interface/builders/types";
import {AuthenticatorArgumentParser} from "../../../command-line-interface/argument-parsers/authenticator-parser";
import {DatabaseDescriber} from "../database-describer";

export const buildCollectionDatabaseDescriptionCommand = (): YargsCommandSettings => {
    return {
        command: 'get-database-description [databaseName]',
        description: 'Get description of a specific database in your Mycelia environment.',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .positional('databaseName', {
                    describe: 'Database name to perform the insertion in'
                });
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const instance = container.resolve(DatabaseDescriber);

            const databaseName = <string>argv.databaseName;

            if (argv.verbose) {
                console.log({databaseName})
            }

            const result = await instance.describe(databaseName);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
