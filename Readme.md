
# Javier

![My CV photo](/doc/photo_screen_cv.jpg)


My CV, this is as simple as:

```
const Javi = require('./src/js/javicv');
const dreamJobCo = 'Your company';

const javi = new Javi();
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

* pdf-puppeteer doesn't not work with inkscape svgs.
    I had to ensure viewbox is the same as H and W and remove custom inkscape tags. 
* Icon made by Freepik from www.flaticon.com 
* TODOs: 
    * [ ] Localization: Support for different langs
    * [ ] Put this into a Docker
    * [ ] Some scss would be nice
