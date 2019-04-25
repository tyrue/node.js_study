module.exports = {
    IsOwener: function (request, response) {
        console.log(request.session.is_logined);
        if (request.session.is_logined) {
            console.log("true");
            return true;
        } else {
            console.log("false");
            return false;
        }
    },
    StatusUI: function (request, response) {
        var authStatusUI = `<a href = "/author/login">login</a>`;
        if (this.IsOwener(request, response)) {
            authStatusUI = `${request.session.nickname} | <a href = "/author/logout">logout</a>`
        }
        return authStatusUI;
    }
}