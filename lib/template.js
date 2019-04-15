var sanitizeHtml = require('sanitize-html');
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
            <h1><a href = "/">WEB</a></h1>
            <a href = "/author">author</a>
            ${list}
            ${control}  
            ${body}
        </body>
        
        </html>`;
    },
    list : function (topic) {
        var list = '<ul>';
        for (i in topic) {
            list += `<li><a href="/?id=${topic[i].id}">${topic[i].id} : ${sanitizeHtml(topic[i].title)}</a></li>`;
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
            tag += `<option value = "${authors[i].author_id}"${selected}>${sanitizeHtml(authors[i].name)}</option>`
        }
        return `
            <select name="author">
                ${tag}
            </select>
        `;
    },
    authorTable : function(authors){
        var table = `<table>`;
        table += `<tr>`;
        for (var i in authors[0]) {
            table += `<td>${i}</td>`
        }
        table += `</tr>`;
        
        for (var i = 0; i < authors.length; i++) {
            table += 
            `
                <tr>
                    <td>${authors[i].author_id}</td>
                    <td>${sanitizeHtml(authors[i].name)}</td>
                    <td>${sanitizeHtml(authors[i].profile)}</td>
                    <td><a href = "/author/update?id=${authors[i].author_id}">update</a></td>
                    <td>
                        <form action = "/author/delete_process" method="post">
                            <input type = "hidden" name = "id" value = "${authors[i].author_id}">
                            <input type = "submit" value = "delete">
                        </form>
                    </td>
                </tr>
            `
        }
        table += `</table>`;
        return table;
    }
}
