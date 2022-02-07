// noinspection DuplicatedCode

import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {YargsCommandSettings} from "../../../command-line-interface/builders/types";
import {AuthenticatorArgumentParser} from "../../../command-line-interface/argument-parsers/authenticator-parser";
import {StatusGetter} from "../status-getter";

export const buildGetStatusCommand = (): YargsCommandSettings => {
    return {
        command: 'get-status',
        description: 'Get status of API tasks. So far, only provides status of background tasks (responses 202).',
        builder: (yargs: yargs.Argv) => {
            return yargs;
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const instance = container.resolve(StatusGetter);

            const result = await instance.getStatus();

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
