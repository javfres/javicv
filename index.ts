

// Require the CV class
import JaviCV from './src/ts/javicv';
import CV2 from './src/ts/cv2';

// Get company name from args (or undefined)
const dreamJobCo = process.argv[2];

// Build the CV
/*
const javi = new JaviCV();
javi.findJob(dreamJobCo).then(() => {
    javi.say('Hurray!!');
});
*/


(async () => {

    const javi = new JaviCV();

    await javi.findJob(dreamJobCo, true);

    javi.say('Hurray!!');

})(); 


/*
(async () => {

    const cv2 = new CV2();
    cv2.debug();

})(); 
*/
