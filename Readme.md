
# Javier

![My CV photo](/doc/photo_screen_cv.jpg)


My CV, this is as simple as:

```
import JaviCV from './src/ts/javicv';
const dreamJobCo = 'Your company';

const javi = new JaviCV();
javi.findJob(dreamJobCo).then(() => {
    javi.say('Hurray!!');
});

```

## Usage

```
npm install
npm run build
```


## Notes for myself

* Icon made by Freepik from www.flaticon.com 
* TODOs: 
    * [ ] Localization: Support for different langs
    * [ ] Put this into a Docker
    * [X] Some scss would be nice
* New version uses:
    * Typescript
    * SCSS
* New version stops using:
    * pdf-puppeteer. Now I am calling manually to puppeteer.
* NPM scripts:
    * `npm run tsc`: Runs typescript and generates the plain JS files
    * `npm run tsc-watch`: Runs typescript in watch mode
    * `npm run build`: Runs typescript and calls the script to generate the pdf
    * `npm run pdf`: Runs the JS script to generate the pdf
    * `npm run pdf-watch`: Watch to changes in the JS, SCSS or templates to generate the pdf
    * `npm run dev`: Runs concurrently `tsc-watch` and `pdf-watch`


