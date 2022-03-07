
# Javier

![My CV photo](/doc/photo_screen_cv.jpg)

My CV, this is as simple as:

```
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
npm run cv "Company name"
```

## Notes for myself

* Icon made by Freepik from www.flaticon.com 
* TODOs: 
    * [ ] Localization: Support for different langs
    * [X] Put this into a Docker
    * [X] Some scss would be nice
    * [X] Reduce pdf size with ghostscript
    * [X] Use express to handle the resources
    * [X] Split scss code
    * [ ] Lint for html and scss
    * [ ] Read data from json file
    * [ ] Auto-update express dev server
* New version uses:
    * Typescript
    * SCSS
* New version stops using:
    * pdf-puppeteer. Now I am calling puppeteer manually.
* NPM scripts:
    * `npm run cv`: Calls the script to generate the pdf
    * `npm run dev`: Runs the debug server

### Docker

I dockerized this node project just for fun.
These are the instructions to create the image from the Dockerfile
and to run that image to generate the pdf.

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
