module.exports = {
    html : function (title, list, body, control) {
        return `
        <!DOCTYPE html>
        <html>
        
        <head>
            <title>${title}</title>
            <meta charset="utf-8" />
        </head>
        
        <body>
            <a href = "/">WEB</a>
            ${list}
            ${control}  
            <h1>안녕!</h1>
            ${body}
        </body>
        
        </html>`;
    },
    list : function (filelist) {
        var list = '<ul>';
        for (i in filelist) {
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        }
        list += '</ul>';
        return list;
    }
}
