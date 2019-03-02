
const Javi = require('./src/js/javicv');
const dreamJobCo = process.argv[2];

const javi = new Javi();
javi.findJob(dreamJobCo).then(() => {
    console.log('Hurray!!');
});
