
# Javier

![My CV photo](/doc/photo_screen_cv.jpg)


My CV, this is as simple as:

```
const JaviCV = require('@javfres/javicv').default;
const dreamJobCo = 'Your company';

const javi = new JaviCV();
javi.findJob(dreamJobCo).then(() => {
    javi.say('Hurray!!');
});

```

or if you prefer async functions over promises:

```
const JaviCV = require('@javfres/javicv').default;
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
npm run cv
```

or

```
npm install
npm run cv "Company name"
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
    * `npm run cv`: Calls the script to generate the pdf
    * `npm run dev`: Runs concurrently typescript and the debug server
    * `npm run dev-server`: Just runs the express server in debug mode on port 4444

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
touch ./cv.pdf \
&& docker run --rm -v${PWD}/cv.pdf:/cv/cv.pdf javfres/cv npm run cv
```

Interactive for debug

```
docker run --rm -it javfres/cv /bin/bash
```

