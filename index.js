
// Requere my class 
const Javi = require('./src/js/javicv');

// Get company name from args (or undefined)
const dreamJobCo = process.argv[2];

// Build the CV
const javi = new Javi();
javi.findJob(dreamJobCo).then(() => {
    javi.say('Hurray!!');
});
