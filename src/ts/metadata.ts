
const exiftool = require('node-exiftool');
const exiftoolBin = require('dist-exiftool');

/**
 * Replace the pdf metadata
 */
module.exports = function(pdf_file:string, metadata:any){

    const ep = new exiftool.ExiftoolProcess(exiftoolBin);

    ep.open()
        .then(() => ep.writeMetadata(pdf_file, {
            all: '', // remove existing tags
            ...metadata
        }, ['overwrite_original']))
        //.then(console.log, console.error)
        .then(() => ep.close())
        .catch(console.error);

};