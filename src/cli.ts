#!/usr/bin/env node
import {parse} from 'ts-command-line-args';

interface CommandLineRequest {
    path: string
};

export const args = parse<CommandLineRequest>(
    {
        help: {
            type: Boolean,
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
            header: 'Copyright',
            content: `2021, JQuant.`
        }]
    },
);

