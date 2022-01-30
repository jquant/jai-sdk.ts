import yargs from "yargs";

export type YargsCommandSettings = {
    command: string,
    description: string,
    builder?: (yargs: yargs.Argv) => void,
    handler?: (argv: yargs.ArgumentsCamelCase<string>) => void
};
