
const fs = require('fs');


function remove_spaces(html){
    return html.replace( /\>\s+\</g , "><" );
}


/**
 * Replace the images to base64 images
 */
function img_to_base64(html){

    const re = /\<img([\w\W]+?)\>/g;
    const re2 = /(\<img\s[^>]*?)src\s*=\s*['\"]([^'\"]*?)['\"]([^>]*?\>)/;

    return html.replace(re, function(str){

        const res = re2.exec(str);
        if(!res) return "<!-- Error image -->";

        const begin = res[1];
        const path = res[2];
        const end = res[3];
        const type = path_to_type(path);
        if(type === 'image/svg+xml') return str;

        let src = 'data:' + type + ';base64, ';
        src+=base64_encode(path);
        src='src="' + src + '"';

        return begin + src + end;

    });

}


/*
 * Inline the svg into the html
 */
function inline_svg(html){

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

        if(w) w = w[1];
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
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}




/*
 * Obtain the mime type from the extension of the file
 */
function path_to_type(path){

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


module.exports = {
    remove_spaces,
    img_to_base64,
    inline_svg,
};