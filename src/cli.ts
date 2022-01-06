#!/usr/bin/env node

import yargs from "yargs";
import {buildRequestApiKeyCommand} from "./command-line-interface/builders/request-api-key-builder";

const args = process.argv.slice(2);

const requestApiCommand = buildRequestApiKeyCommand();

yargs(args)
    .command(
        requestApiCommand.command,
        requestApiCommand.description,
        requestApiCommand.builder,
        requestApiCommand.handler)
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .parse()
