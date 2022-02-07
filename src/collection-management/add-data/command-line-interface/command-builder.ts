// noinspection DuplicatedCode

import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {YargsCommandSettings} from "../../../command-line-interface/builders/types";
import {AuthenticatorArgumentParser} from "../../../command-line-interface/argument-parsers/authenticator-parser";
import {DataPatcher} from "../data-patcher";

export const buildCollectionAddDataCommand = (): YargsCommandSettings => {
    return {
        command: 'add-data [databaseName]',
        description: 'Add new data to a given database.\n' +
            'This method should be used when we insert new data using ' +
            'POST https://mycelia.azure-api.net/table/data/{db_name} and ' +
            'want to create the vector representations of the new data ' +
            'using the model we already trained for that database.',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .positional('databaseName', {
                    describe: 'Database name to perform the insertion in'
                })
                .option('callback-url', {
                    type: 'string',
                    alias: 'u',
                    description: "Callback URL that should be called once the processing finishes. " +
                        "It should expect the following pattern: {callback_url}/mycelia_status"
                });
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const instance = container.resolve(DataPatcher);

            const databaseName = <string>argv.databaseName;
            const callbackUrl = <string>argv['callback-url'];

            if (argv.verbose) {
                console.log({databaseName, callbackUrl})
            }

            const result = await instance.patch(databaseName, callbackUrl);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
