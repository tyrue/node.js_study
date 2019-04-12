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
    },
    authorSelect : function(authors, author_id){
        var tag = ``;
        for(var i = 0; i < authors.length; i++)
        {
            var selected = ``;
            if(authors[i].author_id === author_id)
            {
                selected = ` selected`;
            }
            tag += `<option value = "${authors[i].author_id}"${selected}>${authors[i].name}</option>`
        }
        return `
            <select name="author">
                ${tag}
            </select>
        `;
    }
}
