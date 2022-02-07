// noinspection DuplicatedCode

import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {YargsCommandSettings} from "../../../../command-line-interface/builders/types";
import {AuthenticatorArgumentParser} from "../../../../command-line-interface/argument-parsers/authenticator-parser";
import {StatusDeleter} from "../status-deleter";

export const buildDeleteStatusCommand = (): YargsCommandSettings => {
    return {
        command: 'delete-status',
        description: 'Get status of API tasks. So far, only provides status of background tasks (responses 202).',
        builder: (yargs: yargs.Argv) => {
            return yargs;
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const instance = container.resolve(StatusDeleter);

            const databaseName = <string>argv.databaseName;

            if (argv.verbose) {
                console.log({databaseName})
            }

            const result = await instance.delete(databaseName);

            const stringParsedResponse = JSON.stringify(result);

            if (stringParsedResponse)
                console.log(stringParsedResponse);
        }
    }
};
