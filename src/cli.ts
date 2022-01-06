#!/usr/bin/env node

import yargs from "yargs";

const args = process.argv.slice(2);

yargs(args)
    .command('serve [port]', 'start the server', (yargs) => {
        return yargs
            .positional('port', {
                describe: 'port to bind on',
                default: 5000
            })
    }, (argv) => {

        if (argv.verbose)
            console.info(`start server on :${argv.port}`)

        console.log(argv.port)

    })
    .command('scan [port]', 'scan the server port', (yargs) => {
        return yargs
            .positional('port', {
                describe: 'port to bind on',
                default: 5000
            })
    }, (argv) => {

        if (argv.verbose)
            console.info(`scanning server por :${argv.port}`)

        console.log(argv.port)

    })
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .parse()
