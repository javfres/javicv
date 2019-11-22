
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

or if you prefer async functions over promises:

```
import JaviCV from './src/ts/javicv';
const dreamJobCo = 'Your company';

(async () => {

    const javi = new JaviCV();
    await javi.findJob(dreamJobCo);
    javi.say('Hurray!!');

})(); 

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
    * [X] Put this into a Docker
    * [X] Some scss would be nice
    * [X] Reduce pdf size with ghostscript
* New version uses:
    * Typescript
    * SCSS
* New version stops using:
    * pdf-puppeteer. Now I am calling puppeteer manually.
* NPM scripts:
    * `npm run tsc`: Runs typescript and generates the plain JS files
    * `npm run tsc-watch`: Runs typescript in watch mode
    * `npm run build`: Runs typescript and calls the script to generate the pdf
    * `npm run pdf`: Runs the JS script to generate the pdf
    * `npm run pdf-watch`: Watch to changes in the JS, SCSS or templates to generate the pdf
    * `npm run dev`: Runs concurrently `tsc-watch` and `pdf-watch`


### Docker

I dockerized this node project just for fun.
These are the instructions to create the image from the Dockerfile
and to run that image to generate the pdf.
The docker version does not contains gs so the *reduce pdf size* stage
will show a warning although the final pdf is generated.

Create the image

```
docker build -t javfres/cv .
```

Render the pdf

```
touch ./dist/cv.pdf \
&& docker run --rm -v${PWD}/dist/cv.pdf:/cv/dist/cv.pdf javfres/cv npm run pdf
```

Interactive for debug

```
docker run --rm -it javfres/cv /bin/bash
```

**Note** It looks that the fonts are not correctly render in docker due to the sandbox.


