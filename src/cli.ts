#!/usr/bin/env node

import "reflect-metadata"

import yargs from "yargs";
import {buildRequestApiKeyCommand} from "./command-line-interface/builders/request-api-key-builder";
import {buildSearchByIdCommand} from "./command-line-interface/builders/similarity/search-by-id";

const args = process.argv.slice(2);

const requestApiCommand = buildRequestApiKeyCommand();
const similarSearchByIdCommand = buildSearchByIdCommand();

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
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .parse()
