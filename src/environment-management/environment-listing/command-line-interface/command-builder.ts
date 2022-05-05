// noinspection DuplicatedCode

import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {YargsCommandSettings} from "../../../command-line-interface/builders/types";
import {AuthenticatorArgumentParser} from "../../../command-line-interface/argument-parsers/authenticator-parser";
import {EnvironmentLister} from "../environment-list";

export const buildGetEnvironmentsStatusCommand = (): YargsCommandSettings => {
    return {
        command: 'get-environments',
        description: 'Get the names of all environments in the namespace.',
        builder: (yargs: yargs.Argv) => {
            return yargs;
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const instance = container.resolve(EnvironmentLister);

            const result = await instance.list();

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
