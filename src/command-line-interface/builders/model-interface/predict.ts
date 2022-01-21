import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";

import {AuthenticatorArgumentParser} from "../../argument-parsers/authenticator-parser";
import {Predict} from "../../../model-interface/predict";

export const buildPredictCommand = () => {
    return {
        command: 'predict [databaseName]',
        description: 'Return the predict of the supervised model.',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .positional('databaseName', {
                    describe: 'Database name of the supervised model.'
                })
                .positional('data', {
                    describe: 'Data to compare similarity'
                })
                // .option('predict-probability', {
                //     alias: 'p',
                //     type: 'boolean',
                //     description: 'if true returns the probability of the predicts (if model is classification)'
                // })
                ;
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            console.log(JSON.stringify(argv))
            return;

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const instance = container.resolve(Predict);

            const data: Array<any> = JSON.parse(<string>argv.data);
            const databaseName: string = <string>argv.databaseName;
            const predictProbability: boolean = !!argv['predict-probability']

            const result = await instance.predict(databaseName, data, predictProbability);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
