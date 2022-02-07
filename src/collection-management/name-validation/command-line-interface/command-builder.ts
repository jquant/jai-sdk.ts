// noinspection DuplicatedCode

import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {YargsCommandSettings} from "../../../command-line-interface/builders/types";
import {AuthenticatorArgumentParser} from "../../../command-line-interface/argument-parsers/authenticator-parser";
import {DatabaseNameValidator} from "../database-name-validator";

export const buildCollectionIsDatabaseNameValidCommand = (): YargsCommandSettings => {
    return {
        command: 'is-database-name-valid [databaseName]',
        description: 'Check if a database name is valid. Returns a message showing if the database name' +
            ' is or isn\'t a valid name.',
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

            const instance = container.resolve(DatabaseNameValidator);

            const databaseName = <string>argv.databaseName;

            if (argv.verbose) {
                console.log({databaseName})
            }

            const result = await instance.isDatabaseNameValid(databaseName);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
