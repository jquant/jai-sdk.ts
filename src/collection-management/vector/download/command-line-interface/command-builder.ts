// noinspection DuplicatedCode

import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {YargsCommandSettings} from "../../../../command-line-interface/builders/types";
import {AuthenticatorArgumentParser} from "../../../../command-line-interface/argument-parsers/authenticator-parser";
import {KeyDownloader} from "../key-downloader";

export const buildCollectionDownloadCommand = (): YargsCommandSettings => {
    return {
        command: 'get-download-key [databaseName]',
        description: 'Get the url for the download of the vector file.',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .positional('databaseName', {
                    describe: 'Database name to get the column names from.'
                });
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const instance = container.resolve(KeyDownloader);

            const databaseName = <string>argv.databaseName;

            if (argv.verbose) {
                console.log({databaseName})
            }

            const result = await instance.downloadKey(databaseName);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
