//
// Includes (they do not have @types/ modules)
//
import shelljs from 'shelljs';
import fs from 'fs';

type QualityT = 'screen' | 'ebook' | 'printer' | 'prepress' | 'default';

/**
 * Reduces the pdf size using the gs command
 * @param pdf_file The pdf path
 * @param quality The ghostscript quality param: (screen, ebook, printer, prepress or default)
 */
export default async function(pdf_file:string, quality: QualityT = 'default'){

    const tmpPDF = '/tmp/tmp-cv.pdf';

    const cmd = `gs \
        -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
        -dPDFSETTINGS=/${quality} \
        -dNOPAUSE -dQUIET -dBATCH \
        -sOutputFile=${tmpPDF} ${pdf_file}`;

    // Do nothing if it fails
    if (shelljs.exec(cmd).code !== 0) {
        console.warn('PDF size reduction failed');
        return;
    }

    // If works, replace the original file
    await new Promise(resolve => fs.rename(tmpPDF, pdf_file, resolve));
}
