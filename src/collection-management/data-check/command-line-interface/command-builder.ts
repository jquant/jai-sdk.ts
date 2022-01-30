// noinspection DuplicatedCode

import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {YargsCommandSettings} from "../../../command-line-interface/builders/types";
import {AuthenticatorArgumentParser} from "../../../command-line-interface/argument-parsers/authenticator-parser";
import {CheckInsertedDataMode, InsertedDataChecker} from "../inserted-data-checker";

export const buildCollectionCheckDataCommand = (): YargsCommandSettings => {
    return {
        command: 'check-inserted-data [databaseName]',
        description: 'Returns a list of integers or strings depending on the mode parameter.',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .positional('databaseName', {
                    describe: 'Database name to perform the insertion in'
                })
                .option('mode', {
                    type: 'string',
                    alias: 'm',
                    description: "Response mode of IDs. We have three options:" +
                        "1. 'complete': get ALL IDs;" +
                        "2. 'summarized': get groups of consecutive IDs;" +
                        "3. 'simple': get the number of IDs and their min and max IDs as well;"
                });
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const instance = container.resolve(InsertedDataChecker);

            const databaseName = <string>argv.databaseName;
            const mode = <CheckInsertedDataMode>argv.mode;

            if (argv.verbose) {
                console.log({databaseName, mode})
            }

            const result = await instance.check(databaseName, mode);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
