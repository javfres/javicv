//
// Includes (they do not have @types/ modules)
//
// @ts-ignore
import exiftool from 'node-exiftool';
// @ts-ignore
import exiftoolBin from 'dist-exiftool';

/**
 * Replace the pdf metadata
 */
export default async function setPDFMetadata(pdf_file:string, metadata:any){

    const options = {
        all: '', // remove existing tags
        ...metadata
    }

    // Use exif tool
    const ep = new exiftool.ExiftoolProcess(exiftoolBin);
    await ep.open();
    await ep.writeMetadata(pdf_file, options, ['overwrite_original']);
    await ep.close();

};