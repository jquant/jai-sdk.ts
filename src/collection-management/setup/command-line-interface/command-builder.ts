// noinspection DuplicatedCode

import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {YargsCommandSettings} from "../../../command-line-interface/builders/types";
import {AuthenticatorArgumentParser} from "../../../command-line-interface/argument-parsers/authenticator-parser";
import {InsertedDataSetup, SetupSettings} from "../inserted-data-setup";

export const buildCollectionSetupCommand = (): YargsCommandSettings => {
    return {
        command: 'setup-inserted-data [databaseName] [settings]',
        description: 'General purpose data setup method. This is the method to train models for tabular, ' +
            'text or image data. Returns a message stating training is ongoing.',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .positional('databaseName', {
                    describe: 'Database name to perform the insertion in.'
                })
                .positional('settings', {
                    describe: 'Attributes - Mandatory\n' +
                        '\n' +
                        'db_type string\n' +
                        'You have to specify your database type. Possible values are: Supervised, selfsupervised, Image, Text and FastText.\n' +
                        '\n' +
                        'label string\n' +
                        'Mandatory only when your database type is "Supervised".\n' +
                        '"label_name": column name for your label.\n' +
                        '"task": possible values are "classification", "metric_classification" and "regression"\n' +
                        '\n' +
                        '\n' +
                        'Attributes - Optional\n' +
                        '\n' +
                        'hyperparams dictionary\n' +
                        'Hyperparams for the model. It varies for each database type defined.\n' +
                        'When your database type is "Image":\n' +
                        '\n' +
                        '"model_name": (torchvision) model for image preprocessing.\n' +
                        '\n' +
                        '"mode": last layer of the model, varies for each model.\n' +
                        '\n' +
                        '"resize_H": height of image resizing, must be greater or equal to 224, default is 224.\n' +
                        '"resize_W": width of image resizing, must be greater or equal to 224, default is 224.\n' +
                        'When your database type is "FastText":\n' +
                        '"minn": min length of char ngram, default is 2.\n' +
                        '\n' +
                        '"maxn": max length of char ngram, default is 5.\n' +
                        '\n' +
                        '"dim": final latent layer dimension, default is 128.\n' +
                        '"epoch": number of epochs, default is 10.\n' +
                        'When your database type is "Text":\n' +
                        '"nlp_model": (transformers) model name for text preprocessing.\n' +
                        '"batch_size": 256, desciption=\'batch size for training, default is 256.\n' +
                        '"max_length": Controls the maximum length to use by one of the truncation/padding parameters, default is 100.\n' +
                        'When your database type is "Supervised" or "SelfSupervised":\n' +
                        '"batch_size": batch size for training, default is 512.\n' +
                        '"dropout_rate": dropout rate, default is 0.25.\n' +
                        '"learning_rate": initial learning rate, default is 0.001.\n' +
                        '"encoder_layer": possible values are "2L".\n' +
                        '"decoder_layer": possible values are "2L", "2L_BN" and "1L"\n' +
                        '"hidden_latent_dim": hidden layer size, default is 64.\n' +
                        '"patience": Number of validation checks with no improvement after which training will be stopped. Default is 7.\n' +
                        '"min_delta": Minimum change in the monitored quantity (loss) to qualify as an improvement, i.e. an absolute change of less than min_delta, will count as no improvement. Default is 1e-5.\n' +
                        '\n' +
                        '\n' +
                        'num_process dictionary\n' +
                        'Numerical processing details, should you want custom preprocessing.\n' +
                        '\n' +
                        '\n' +
                        'cat_process dictionary\n' +
                        'Categorical processing details, should you want custom preprocessing.\n' +
                        '\n' +
                        '\n' +
                        'datetime_process dictionary\n' +
                        'Datetime processing details, should you want custom preprocessing.\n' +
                        '\n' +
                        '\n' +
                        'features dictionary\n' +
                        'A dictionary with column names as keys, unspecified columns will follow the num_process, cat_process or datetime_process.\n' +
                        'The values of the dictionary are dictionaries with:\n' +
                        '"dtype": possible values are "int32", "int64", "float32", "float64", "category" or "datetime".\n' +
                        '"embedding_dim": size of the first embedding layer.\n' +
                        '"fill_value": value to fill nans for dtype numerical/category.\n' +
                        '"scaler": optional, for dtype numerical.\n' +
                        '"min_freq": categories with less than that will be discarted, for dtype category.\n' +
                        '\n' +
                        'mycelia_bases list of dictionaries\n' +
                        'Whether or not the current table references another table previously processed by Mycelia.\n' +
                        '\n' +
                        '\n' +
                        'split dictionary\n' +
                        'How to split your training data.\n' +
                        '"type": possible values are "random", "sequential" or "stratified".\n' +
                        '"split_column": if "type" is "sequential", indicates which column should be used for splitting. If type is "stratified", you must pass the label name.\n' +
                        '"test_size": integer between 0 and 1 stating the percentage of data to use for testing.\n' +
                        '\n' +
                        '\n' +
                        'callback_url string\n' +
                        'In case a callback URL is set in place.'
                })
                .option('quick-test', {
                    type: 'string',
                    alias: 't'
                })
                .option('overwrite', {
                    type: 'string',
                    alias: 'o',
                    description: 'Overwrite the existing setup (if exists).'
                });
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth = container
                .resolve(AuthenticatorArgumentParser);

            auth.authenticateFromCommandArgs(argv);

            const instance = container.resolve(InsertedDataSetup);

            const databaseName = <string>argv.databaseName;
            const settings = <SetupSettings>JSON.parse(<string>argv.settings);
            const quickTest = <boolean>argv['quick-test'];
            const overwrite = <boolean>argv.overwrite;


            if (argv.verbose) {
                console.log({databaseName, settings, quickTest, overwrite})
            }

            const result = await instance.setup(databaseName, settings, quickTest, overwrite);

            const stringParsedResponse = JSON.stringify(result);

            console.log(stringParsedResponse);
        }
    }
};
