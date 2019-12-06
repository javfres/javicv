
//
// Imports
//
import fs from 'fs';

/**
 * Just reads a svg file
 * @param path 
 */
export default function inlineSVG(path:string): string {

    return fs.readFileSync( __dirname + `/../../src/${path}`, 'utf-8');
   
}
