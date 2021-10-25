
//
// Imports
//
import JaviCV from './index';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';


//
// Build the CV
//
(async () => {

    //
    // Read command arguments
    //
    const argv = await yargs(hideBin(process.argv))
        .command('$0 [company]', '', yargs => {
            yargs.positional('company', {
                describe: 'My dream company',
                type: 'string',
                default: '',
            })
            return yargs;
        })
        .option('debug', {
            type: 'boolean',
            default: false,
            description: 'Debug mode'
        })
        .option('noCompany', {
            type: 'boolean',
            default: false,
            description: 'Disable company'
        })
        .option('year', {
            type: 'number',
            default: new Date().getFullYear(),
            description: 'The future year'
        })
        .help('h')
        .alias('h', 'help')
        .argv;
    
    const javi = new JaviCV();

    await javi.findJob(
        argv.noCompany ? null : (argv.company as string),
        argv.year,
        argv.debug
    );

    if(argv.debug){
        javi.say('Launched dev mode ⚙️');
    } else {
        javi.say('Hurray!!');
    } 

})();