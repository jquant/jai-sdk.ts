#!/usr/bin/env node
import {parse} from 'ts-command-line-args';
import {ApiKeyCommandLineArguments} from "./models/authentication/api-key-command-line-arguments";

interface HelpCommand {
    help: any
}

interface RequestApiKeyCommand {
    'request-api-key': any
}

export const helpArgs = parse<HelpCommand>(
    {
        help: {
            'type': Boolean,
            optional: true,
            alias: 'h',
            description: 'Prints this usage guide'
        },
    },
    {
        helpArg: 'help',
        headerContentSections: [{
            header: 'JAI SDK',
            content: 'Thanks for using JAI SDK.'
        }],
        footerContentSections: [{
            header: 'For further information',
            content: `Please visit https://jai-sdk.readthedocs.io/en/latest/`
        }, {
            header: 'Author',
            content: `Copyright 2021 by JQuant.`
        }]
    },
);

export const requestApiKeyCommand = parse<RequestApiKeyCommand>(
    {
        'request-api-key': {
            type:  ApiKeyCommandLineArguments,
            optional: true,
            description: 'Requests an JAI api key'
        }
    },
    {
        helpArg: 'help',
        headerContentSections: [{
            header: 'JAI SDK',
            content: 'Thanks for using JAI SDK.'
        }],
        footerContentSections: [{
            header: 'For further information',
            content: `Please visit https://jai-sdk.readthedocs.io/en/latest/`
        }, {
            header: 'Author',
            content: `Copyright 2021 by JQuant.`
        }]
    },
);

console.log(helpArgs);
console.log(requestApiKeyCommand);
