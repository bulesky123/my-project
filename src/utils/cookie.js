export function setCookie(name,value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie=name+"="+encodeURIComponent(value)+";expires=" + exp.toGMTString()+";path=/";
}

export function getCookie(name) {
    if(document.cookie.length>0){
        var cookieName = encodeURIComponent(name)+'=';
        var cookieStart = document.cookie.indexOf(cookieName);
        var cookieValue;
        if(cookieStart>-1){
            var cookieEnd = document.cookie.indexOf(";",cookieStart);
            if(cookieEnd === -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
        }
        return cookieValue;
    }else {
        return null;
    }
}