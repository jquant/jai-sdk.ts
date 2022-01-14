import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {SearchById} from "../../../similar/search/by-id/search-by-id";
import {AuthenticatorArgumentParser} from "../../argument-parsers/authenticator-parser";

export const buildSearchByIdCommand = () => {
    return {
        command: 'similarity search-by-id [collectionName] [arrayOfIds]',
        description: 'search by similarity an array of ids',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .positional('collectionName', {
                    describe: 'Collection Name'
                })
                .positional('arrayOfIds', {
                    describe: 'Array of Ids'
                });
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const searchById = container
                .resolve(SearchById);

            const collectionName: string = <string>argv.collectionName;
            const arrayOfIds: Array<any> = JSON.parse(`[${argv.arrayOfIds}]`);

            console.log(argv.key);

            const result = await searchById.search(collectionName, arrayOfIds);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
