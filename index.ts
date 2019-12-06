

//
// Imports
//
import JaviCV from './src/ts/javicv';
import yargs from 'yargs';


//
// Read command arguments
//
const argv = yargs
    .usage('Usage: $0 [options] <dream-job-company>')
    .alias('d', 'debug')
    .describe('d', 'Debug mode')
    .default('d', false)
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

    await javi.findJob(dreamJobCo, !!argv.debug);

    javi.say('Hurray!!');

})();


// Build the CV ES5
/*
const javi = new JaviCV();
javi.findJob(dreamJobCo).then(() => {
    javi.say('Hurray!!');
});
*/
