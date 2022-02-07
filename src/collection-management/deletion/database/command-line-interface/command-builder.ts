// noinspection DuplicatedCode

import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {YargsCommandSettings} from "../../../../command-line-interface/builders/types";
import {AuthenticatorArgumentParser} from "../../../../command-line-interface/argument-parsers/authenticator-parser";
import {DatabaseDeleter} from "../database-deleter";

export const buildCollectionDeleteDatabaseCommand = (): YargsCommandSettings => {
    return {
        command: 'delete-database [databaseName]',
        description: 'Deletes everything relative to a specified database.',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .positional('databaseName', {
                    describe: 'Database name we want to delete.'
                });
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const instance = container.resolve(DatabaseDeleter);

            const databaseName = <string>argv.databaseName;

            if (argv.verbose) {
                console.log({databaseName})
            }

            const result = await instance.delete(databaseName);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
