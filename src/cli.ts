#!/usr/bin/env node

import "reflect-metadata"
import {container} from "tsyringe";
import yargs from "yargs";
import {Initializer} from "./ioc/register";

import {YargsCommandSettings} from "./command-line-interface/builders/types";

Initializer.initializeInversionOfControl();

const args = process.argv.slice(2);

const commands = container.resolve<Array<YargsCommandSettings>>("commands")

let yargsBuilder = yargs(args);

commands.forEach(commandMapping => {
    yargsBuilder = yargsBuilder
        .command(
            commandMapping.command,
            commandMapping.description,
            commandMapping.builder,
            commandMapping.handler);
});

yargsBuilder
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .option('key', {
        type: 'string',
        alias: 'k',
        description: 'api key'
    })
    .option('environment', {
        type: 'string',
        alias: 'e',
        description: 'JAI environment name or key'
    })
    .option('dry-run', {
        type: 'boolean',
    })
    .parse();
