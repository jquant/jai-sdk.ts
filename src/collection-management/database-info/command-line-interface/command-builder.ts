// noinspection DuplicatedCode

import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {YargsCommandSettings} from "../../../command-line-interface/builders/types";
import {AuthenticatorArgumentParser} from "../../../command-line-interface/argument-parsers/authenticator-parser";
import {GetDatabaseInfo} from "../get-database-info";

import {mode} from "../types";

export const buildCollectionDatabaseInfoCommand = (): YargsCommandSettings => {
    return {
        command: 'get-database-info',
        description: 'Get information of all databases in your Mycelia environment.',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .option('mode', {
                    type: 'string',
                    alias: 'm',
                    description: "Response mode of IDs. We have three options:" +
                        "1. 'complete': get ALL IDs;" +
                        "2. 'names': get groups of consecutive IDs;"
                });
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const instance = container.resolve(GetDatabaseInfo);

            const modeParameter = <mode>argv.mode;

            if (argv.verbose) {
                console.log({modeParameter})
            }

            const result = await instance.getInfo(modeParameter);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
