

// Require the CV class
import JaviCV from './src/ts/javicv';

// Get company name from args (or undefined)
const dreamJobCo = process.argv[2];

// Build the CV
const javi = new JaviCV();
javi.findJob(dreamJobCo).then(() => {
    javi.say('Hurray!!');
});
