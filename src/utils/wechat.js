import apiWechat from '../api/wechat';
import weixinSdk from 'weixin-js-sdk';


export default class wechat {
    wx = null

    //constructor
    init(ok, linedetailid, mode, type, share_code, title, desc, imgUrl, address, callback) {
        var flag = ok
        apiWechat.config().then(res => {
            weixinSdk.config({
                debug: false,
                appId: res.appId,
                timestamp: res.timestamp,
                nonceStr: res.nonceStr,
                signature: res.signature,
                jsApiList: ["chooseWXPay", 'onMenuShareTimeline', 'onMenuShareAppMessage', "updateAppMessageShareData", "updateTimelineShareData", "hideAllNonBaseMenuItem", "hideMenuItems", "showMenuItems"]
            })

            weixinSdk.ready(function () {
                if (!flag) {
                    weixinSdk.hideMenuItems({
                        menuList: ["menuItem:share:timeline", "menuItem:copyUrl", "menuItem:share:appMessage", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:brand"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
                    });

                } else {
                    weixinSdk.hideMenuItems({
                        menuList: ["menuItem:copyUrl", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:brand"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
                    });
                    weixinSdk.showMenuItems({
                        menuList: ["menuItem:share:timeline", "menuItem:share:appMessage"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
                    });
                    weixinSdk.updateAppMessageShareData({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        link: location.origin + address + "?id=" + linedetailid + "&mode=" + mode + "&type=" + type + "&share_code=" + share_code + "&share=1",
                        imgUrl: process.env.VUE_APP_IMGURL + imgUrl, // 分享图标
                        success: function () {
                            // 设置成功
                            // alert("线路详情分享到朋友ok");
                        }
                    });
                    weixinSdk.updateTimelineShareData({
                        title: title, // 分享标题
                        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        link: location.origin + address + "?id=" + linedetailid + "&mode=" + mode + "&type=" + type + "&share_code=" + share_code + "&share=1",
                        imgUrl: process.env.VUE_APP_IMGURL + imgUrl, // 分享图标
                        success: function () {
                            // 设置成功
                            // alert("线路详情分享到朋友圈ok");
                        }
                    });
                }

                // callback(weixinSdk)
            })

        })
    }
    // 页面是否可以分享
    timeline(ok) {
        let _this = this;
        _this.init(ok)
    }
    /**
     * [ 微信分享到朋友圈]
     * @param {[type]} option [分享信息]
     * @param {[type]} success [成功回调]
     * @param {[type]} error   [失败回调]
     */
    shareTimeline(title, link, imgUrl, success, error) {
        let _this = this;
        _this.init(function (wx) {
            _this.onMenuShareTimeline(wx, title, link, imgUrl, success, error)
        })

    }


    /**
     * [ 微信分享给朋友]
     * @param {[type]} option [分享信息]
     * @param {[type]} success [成功回调]
     * @param {[type]} error   [失败回调]
     */
    shareAppMessage(title, link, imgUrl, success, error) {
        let _this = this;
        _this.init(function (wx) {
            _this.onMenuShareAppMessage(wx, title, link, imgUrl, success, error)
        })
    }

    //微信支付 , success, cancel, fail
    pay(option, success, cancel, fail) {
        let _this = this;
        _this.init(function (wx) {
            _this.chooseWXPay(wx, option, success, cancel, fail)
        })
    }

    onMenuShareTimeline(wx, title, link, imgUrl, success, error) {
        alert("分享朋友圈")
        wx.onMenuShareTimeline({
            title: title,
            link: link,
            imgUrl: imgUrl,
            success(res) {
                alert('分享朋友圈ok')
                success(res);
            },
            cancel(res) {
                alert('分享朋友圈no')
                error(res);
            }
        })
    }

    onMenuShareAppMessage(wx, title, link, imgUrl, desc, success, error) {
        alert("分享给朋友")
        wx.onMenuShareAppMessage({
            title: title,
            link: link,
            imgUrl: imgUrl,
            desc: desc,
            success(res) {
                alert('分享给朋友ok')
                success(res);
            },
            cancel(res) {
                alert('分享给朋友ok')
                error(res);
            }
        })
    }

    chooseWXPay(wx, option, success, cancel, fail) {
        wx.chooseWXPay({
            appId: option.appId,
            timestamp: option.timeStamp,
            nonceStr: option.nonceStr,
            package: option.package,
            signType: option.signType,
            paySign: option.paySign,
            success: function (res) {
                alert('success')
            },
            complete: function (res) {
                alert('complete')
            },
            cancel: function (res) {
                alert('cancel')
                // cancel(res)
            },
            fail: function (res) {
                alert('fail')
                // fail(res)
            }
        });
    }
}




// export default wechat;