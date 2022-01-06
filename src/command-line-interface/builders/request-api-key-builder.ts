import yargs from "yargs";

export const buildRequestApiKeyCommand = () => {
    return {
        command: 'scan [port]',
        description:'scan the server port',
        builder: (yargs: yargs.Argv) => {
            return yargs
                .positional('port', {
                    describe: 'port to bind on',
                    default: 5000
                });
        },

        handler: (argv: yargs.ArgumentsCamelCase<string>) => {

            if (argv.verbose)
                console.info(`scanning server por :${argv.port}`)

            console.log(argv.port)

        }
    }
};
