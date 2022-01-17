import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {SearchByData} from "../../../similar/search/by-data/search-by-data";
import {AuthenticatorArgumentParser} from "../../argument-parsers/authenticator-parser";

export const buildSearchByDataCommand = () => {
    return {
        command: 'similarity-search-by-data [collectionName] [data]',
        description: 'search by data an array of data',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .positional('collectionName', {
                    describe: 'Collection Name'
                })
                .positional('data', {
                    describe: 'Data to compare similarity'
                });
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const instance = container.resolve(SearchByData);

            const collectionName: string = <string>argv.collectionName;
            const data: Array<any> = JSON.parse(<string>argv.data);

            const result = await instance.search(collectionName, data);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
