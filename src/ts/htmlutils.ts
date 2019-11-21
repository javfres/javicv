
import fs from 'fs';

/**
 * Remove spaces in a html
 */
export function remove_spaces(html:string){
    return html.replace( /\>\s+\</g , "><" );
}


/**
 * Replace the images to base64 images
 */
export function img_to_base64(html:string, alsosvg:boolean = true){

    const re = /\<img([\w\W]+?)\>/g;
    const re2 = /(\<img\s[^>]*?)src\s*=\s*['\"]([^'\"]*?)['\"]([^>]*?\>)/;

    return html.replace(re, function(str){

        const res = re2.exec(str);
        if(!res) return "<!-- Error image -->";

        const begin = res[1];
        const path = res[2];
        const end = res[3];
        const type = path_to_type(path);
        if(type === 'data') return str;
        if(!alsosvg  && type === 'image/svg+xml') return str;

        let src = 'data:' + type + ';base64,';
        src+=base64_encode(path);
        src='src="' + src + '"';

        return begin + src + end;

    });

}


/*
 * Inline the svg into the html
 */
export function inline_svg(html:string){

    const re = /\<img([\w\W]+?)\>/g;
    const re2 = /(\<img\s[^>]*?)src\s*=\s*['\"]([^'\"]*?)['\"]([^>]*?\>)/;

    const re_w = /width\s*=\s*['\"]([^'\"]*?)['\"]/;
    const re_h = /height\s*=\s*['\"]([^'\"]*?)['\"]/;
    
    // Replace the images found
    return html.replace(re, function(str){

        const res = re2.exec(str);
        if(!res) return "<!-- Error image -->";

        const begin = res[1];
        const end = res[3];

        // Check that the path is a svg file
        const path = res[2];
        const type = path_to_type(path);
        if(type !== 'image/svg+xml') return str;

        // Check if no inline
        if(str.includes('data-no-inline ')){

            const begin = res[1];
            const path = res[2];
            const end = res[3];
            const type = path_to_type(path);
    
            let src = 'data:' + type + ';base64, ';
            src+=base64_encode(path);
            src='src="' + src + '"';
    
            return begin + src + end;
    
        }
    
        let svg = fs.readFileSync(path) + '';

        // Get w and h from the given img tag
        let w = re_w.exec(begin + " " + end);
        let h = re_h.exec(begin + " " + end);

        // @ts-ignore
        if(w) w = w[1];
        // @ts-ignore
        if(h) h = h[1];
        
        svg = svg.replace(re_w, function(str){
            if(w) return 'width="' + w + '"';
            return '';
        });
        
        svg = svg.replace(re_h, function(str){ 
            if(h) return 'height="' + h + '"';
            return '';
        });
        
        return svg;

    });

}




/*
 * Encode a file in base64 format
 */
export function base64_encode(file:string) {

    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}




/*
 * Obtain the mime type from the extension of the file
 */
export function path_to_type(path:string){

    if(path.startsWith('data:')) return 'data';

    // @ts-ignore
    const extension = path.split('.').pop().toLowerCase();

    switch(extension){
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'svg':
            return 'image/svg+xml';
    }

    return null;
}




/*
 * Inline the css into the html
 */
export function inline_css(html:string){

    const re = /\<link([\w\W]+?)\>/g;
    const re2 = /(\<link\s[^>]*?)href\s*=\s*['\"]([^'\"]*?)['\"]([^>]*?\>)/;

    // Replace the images found
    return html.replace(re, function(str){

        const res = re2.exec(str);
        if(!res) return "<!-- Error CSS -->";

        const path = res[2];

        if (!fs.existsSync(path)) {
            return str + " <!-- Not inlined -->";
        }
        
        const contents = fs.readFileSync(path, "utf8");
        return '<style>\n' + contents + '\n</style>';

    });

}