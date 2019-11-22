
//
// Imports
//
import fs from 'fs';

/**
 * Encode a file in base64 format
 * @param file File path 
 */
function base64_encode(file:string) {

    // read binary data
    const bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return Buffer.from(bitmap).toString('base64');
}


/**
 * Base64 image
 * @param path Relative path of the image
 */
export default function base64_img(path:string): string{

    const img64 = base64_encode(`src/imgs/${path}`);
    const type = path.split('.').pop();

    return `data:image/${type};base64, ${img64}`;

}
