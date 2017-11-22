<!DOCTYPE html>
<html>
<head>
    <title>设备ID</title>
</head>
<body>
    <script type="text/javascript" charset="utf-8">
    /*(function () {
        var canvas = document.createElement('canvas'),
            gl = canvas.getContext('experimental-webgl'),
            debugInfo = gl.getExtension('WEBGL_debug_renderer_info');

        console.log(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL), debugInfo);
    })();*/
    function bin2hex (s) {
         // http://jsphp.co/jsphp/fn/view/bin2hex
         // + original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // + bugfixed by: Onno Marsman
         // + bugfixed by: Linuxworld
         // * example 1: bin2hex('Kev');
         // * returns 1: '4b6576'
         // * example 2: bin2hex(String.fromCharCode(0x00));
       // * returns 2: '00'
        var i, f = 0,
            a = [];

        s += '';
       f = s.length;

        for (i = 0; i < f; i++) {
            a[i] = s.charCodeAt(i).toString(16).replace(/^([\da-f])$/, "0$1");
        }

        return a.join('');
    }

    function getUUID() {
        if (localStorage.uuid) {
            return localStorage.uuid;
        }

        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        ctx.fillStvle="#FF0000";
        ctx.fillRect(0, 0, 8, 10);

        var b64 = canvas.toDataURL().replace("data:image/png;base64,", "");
        var bin = window.atob(b64);
        var crc = bin2hex(bin.slice(-16, -12));

        return localStorage.uuid=crc;
    }

    function getCookie(key)
    {
        if (document.cookie.length>0) {
            c_start=document.cookie.indexOf(key + "=")
            if (c_start!=-1) { 
                    c_start=c_start + key.length+1 
                    c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
    }
    
    function uuidCookie(){
        var value = getUUID(),
        name = 'UUID';

        if (getCookie(name)) {
            return;
        } else {
            var exdate=new Date()
                exdate.setDate(exdate.getDate()+ 365),
                href = window.location.href.match(/\:\/\/[\w.]+/);
            var domain = href ? ";domain="+ href[0].replace("://", "") : "";
            document.cookie=name+ "=" + value + "; expires="+ exdate.toGMTString() + domain +";path=/;";
            location.reload();
        }
　　}
uuidCookie();
    document.write(getUUID());
    console.log();
    </script>
</body>
</html>
