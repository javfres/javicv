
//
// Imports
//
import JaviCV from './index';
import yargs from 'yargs';

//
// Build the CV
//
(async () => {

    //
    // Read command arguments
    //
    const argv = await yargs
    .usage('Usage: $0 [options] <dream-job-company>')
    .option('debug', {
        alias: 'd',
        type: 'boolean',
        default: false,
        description: 'Debug mode'
    })
    .option('year', {
        alias: 'y',
        type: 'number',
        default: null,
        description: 'The future year'
    })
    .help('h')
    .alias('h', 'help')
    .argv;

    // Get company name from argv
    const dreamJobCo = argv._.join(' ') || null;

    const javi = new JaviCV();

    await javi.findJob(dreamJobCo, argv.year, argv.debug);

    if(argv.debug){
        javi.say('Launched dev mode ⚙️');
    } else {
        javi.say('Hurray!!');
    } 

})();