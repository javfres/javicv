
# Javier

![My CV photo](/doc/photo_screen_cv.jpg)


My CV, this is as simple as:


```
import JaviCV from '@javfres/javicv';
const dreamJobCo = 'Your company';

(async () => {

    const javi = new JaviCV();
    await javi.findJob(dreamJobCo);
    javi.say('Hurray!!');

})(); 

```


## Usage

```
npm ci
npm run cv
```

or

```
npm ci
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
The docker version does now contain `gs` so the *reduce pdf size* stage
will work.

Render the pdf

```
./run_in_docker.sh
```

Interactive for debug

```
docker build -t javfres/cv .
docker run --rm -it javfres/cv /bin/bash
```

