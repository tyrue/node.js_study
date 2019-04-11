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
            ${body}
        </body>
        
        </html>`;
    },
    list : function (topic) {
        var list = '<ul>';
        for (i in topic) {
            list += `<li><a href="/?id=${topic[i].id}">${topic[i].id} : ${topic[i].title}</a></li>`;
        }
        list += '</ul>';
        return list;
    }
}
