// noinspection DuplicatedCode

import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {YargsCommandSettings} from "../../../../command-line-interface/builders/types";
import {AuthenticatorArgumentParser} from "../../../../command-line-interface/argument-parsers/authenticator-parser";
import {EntityDeleter} from "../entity-deleter";

export const buildCollectionDeleteEntityCommand = (): YargsCommandSettings => {
    return {
        command: 'delete-entity [databaseName]',
        description: 'Delete vectors from a given database according to the specified IDs. This is a dev method.',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .positional('databaseName', {
                    describe: 'Database name we want to delete.'
                }).positional('arrayOfIds', {
                    describe: 'Array of Ids'
                });
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const instance = container.resolve(EntityDeleter);

            const databaseName = <string>argv.databaseName;
            const arrayOfIds: Array<any> = JSON.parse(`[${argv.arrayOfIds}]`);

            if (argv.verbose) {
                console.log({databaseName, arrayOfIds})
            }

            const result = await instance.delete(databaseName, arrayOfIds);

            const stringParsedResponse = JSON.stringify(result);

            if (stringParsedResponse)
                console.log(stringParsedResponse);
        }
    }
};
