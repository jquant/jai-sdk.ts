import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {SearchById} from "../../../similar/search/by-id/search-by-id";

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

            const instance = container.resolve(SearchById);

            const collectionName: string = <string>argv.collectionName;
            const arrayOfIds: Array<any> = JSON.parse(`[${argv.arrayOfIds}]`);

            console.log(argv.key);

            const result = await instance.search(collectionName, arrayOfIds);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
