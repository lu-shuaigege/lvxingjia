const functions = {
    //url 添加参数
    urlAddParams(url, name, value) {
        let currentUrl = url.split('#')[0];
        if (/\?/g.test(currentUrl)) {
            if (/name=[-\w]{4,25}/g.test(currentUrl)) {
                currentUrl = currentUrl.replace(/name=[-\w]{4,25}/g, name + "=" + value)
            } else {
                currentUrl += "&" + name + "=" + value
            }
        } else {
            currentUrl += "?" + name + "=" + value
        }

        if (url.split('#')[1]) {
            url = currentUrl + '#' + url.split('#')[1]
        } else {
            url = currentUrl
        }
        return url
    },
    //删除URL参数
    urlDeleteParam(url, key) {
        let rtn = url.split("?")[0],
            param, params_arr = [],
            queryString = (url.indexOf("?") !== -1) ? url.split("?")[1] : "";
        if (queryString !== "") {
            params_arr = queryString.split("&");
            for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                param = params_arr[i].split("=")[0];
                if (param === key) {
                    params_arr.splice(i, 1);
                }
            }
            rtn = rtn + "?" + params_arr.join("&");
        }
        return rtn;
    },
    // 格式化时间
    fmtDate(date, fmt) {
        var o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    },
    //设置title，解决微信改不了title的bug
    setTitle(title) {
        document.title = title;
        let userAgent = window.navigator.userAgent.toLowerCase();
        let isiOS = userAgent.indexOf('applewebkit') >= 0;
        let isWechat = userAgent.indexOf('micromessenger') >= 0;
        if (isiOS && isWechat) {
            let iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            iframe.onload = function () {
                setTimeout(function () {
                    iframe.remove();
                }, 0)
            }
        }
    },
    isIphonex() {
        if (typeof window !== 'undefined' && window) {
            return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;
        }
        return false;
    }

};

export default functions;