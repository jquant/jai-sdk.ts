#!/usr/bin/env node

import "reflect-metadata"
import yargs from "yargs";
import {Initializer} from "./ioc/register";

import {buildRequestApiKeyCommand} from "./command-line-interface/builders/request-api-key-builder";
import {buildSearchByIdCommand} from "./command-line-interface/builders/similarity/search-by-id";
import {buildSearchByDataCommand} from "./command-line-interface/builders/similarity/search-by-data";

Initializer.initializeInversionOfControl();

const args = process.argv.slice(2);

const requestApiCommand = buildRequestApiKeyCommand();
const similarSearchByIdCommand = buildSearchByIdCommand();
const similarSearchByDataCommand = buildSearchByDataCommand();

yargs(args)
    .command(
        requestApiCommand.command,
        requestApiCommand.description,
        requestApiCommand.builder,
        requestApiCommand.handler)
    .command(
        similarSearchByIdCommand.command,
        similarSearchByIdCommand.description,
        similarSearchByIdCommand.builder,
        similarSearchByIdCommand.handler)
    .command(
        similarSearchByDataCommand.command,
        similarSearchByDataCommand.description,
        similarSearchByDataCommand.builder,
        similarSearchByDataCommand.handler)
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .option('key', {
        type: 'string',
        description: 'api key'
    })
    .parse()
