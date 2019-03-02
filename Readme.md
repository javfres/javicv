
# Javier

This is as simple as:

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
* TODO: lang
* Icon made by Freepik from www.flaticon.com 