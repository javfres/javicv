
//
// Imports
//
import JaviCV from './index';
import yargs from 'yargs';

//
// Read command arguments
//
const argv = yargs
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

//
// Build the CV
//
(async () => {

    const javi = new JaviCV();

    await javi.findJob(dreamJobCo, argv.year, argv.debug);

    if(argv.debug){
        javi.say('Launched dev mode ⚙️');
    } else {
        javi.say('Hurray!!');
    } 

})();