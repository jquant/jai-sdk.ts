// noinspection DuplicatedCode

import "reflect-metadata";
import {container} from "tsyringe";
import yargs from "yargs";
import {YargsCommandSettings} from "../../../command-line-interface/builders/types";
import {ApiKeyRequester} from "../api-key-requester";
import {JaiApiKeyAuthenticator} from "../../jai-api-key-authenticator.interface";

export const buildApiKeyCreatorCommand = (): YargsCommandSettings => {
    return {
        command: 'get-auth-key',
        description: 'Get status of API tasks. So far, only provides status of background tasks (responses 202).',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .option('first-name', {
                    type: 'string',
                    description: "Your first name"
                })
                .option('last-name', {
                    type: 'string',
                    description: "Your last name"
                })
                .option('email', {
                    type: 'string',
                    description: "Your email address"
                })
                .option('company-name', {
                    type: 'string',
                    description: "Your company name address (optional)"
                })
        },

        handler: async (argv: yargs.ArgumentsCamelCase<string>) => {

            const auth: JaiApiKeyAuthenticator = container.resolve('JaiApiKeyAuthenticator');

            auth.clearClientHeader();

            const instance = container.resolve(ApiKeyRequester);

            const firstName = <string>argv['first-name'];
            const lastName = <string>argv['last-name'];
            const email = <string>argv.email;
            const company = <string>argv['company-name'];

            const request = {
                firstName, lastName, email, company
            };

            await instance.requestApiKey(request);

            console.log('Your api key has been requested. Please, check your email (and your SPAM folder)');
        }
    }
};
