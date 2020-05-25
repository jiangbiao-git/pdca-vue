import Vm from 'vue'
import {
    Toast
} from 'vant'
import store from '@/store'
import { ACCESS_TOKEN, ACCESS_APP, ACCESS_USERINFO } from "@/store/mutation-types";

const utils = {
    install(Vue, options) {
        Vue.prototype.utils = {
            isExit() {
                //关闭安卓系统
                document.addEventListener(
                    "WeixinJSBridgeReady",
                    function() {
                        WeixinJSBridge.call("closeWindow");
                    },
                    false
                );
                //关闭ios系统
                WeixinJSBridge.call("closeWindow");
            },
            getAppAccessToken(callback) {
                let self = Vm;
                try {
                    WNFlutter("getAccessToken").then(token => {
                        self.ls.set(ACCESS_TOKEN, token);
                        self.ls.set(ACCESS_APP, true);
                        callback();
                    });
                } catch (error) {
                    console.log(error);
                    self.ls.set(ACCESS_APP, false);
                    callback();
                }
                try {
                    window.WNFlutter('getUserInfo').then(userInfo => {
                        self.ls.set(ACCESS_USERINFO, userInfo);
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            getQueryVariable(variable) {
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split("=");
                    if (pair[0] == variable) { return pair[1]; }
                }
                return (false);
            },
            formatDuring(mss) {
                let days = parseInt(mss / (60 * 60 * 24))
                let hours = parseInt((mss % (60 * 60 * 24)) / (60 * 60))
                let minutes = parseInt((mss % (60 * 60)) / (60))
                let seconds = mss % (60)
                return days ? (days + "天" + hours + "时" + minutes + "分" + seconds + "秒") : hours + "时" + minutes + "分" +
                    seconds + "秒"
            },
            isWx() {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    return true;
                }
                return false;
            },
            isQQ() {
                var ua = navigator.userAgent.toLowerCase()
                if (ua.match(/QQ/i) == "qq") {
                    return true
                } else {
                    return false
                }
            },
            isApp() {
                let self = Vm;
                return self.ls.get(ACCESS_APP)
            },
            IsPC() {
                let userAgentInfo = navigator.userAgent
                let Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"
                ]
                let flag = true
                for (let v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.indexOf(Agents[v]) > 0) {
                        flag = false
                        break
                    }
                }
                return flag
            },
            isAndroid() {
                let u = navigator.userAgent
                let android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
                return android
            },
            dataURLtoFile(dataURI, type) { //base64转换为blob
                let binary = atob(dataURI.split(',')[1]);
                let array = [];
                for (let i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                }
                return new Blob([new Uint8Array(array)], {
                    type: type
                });
            },
            blurAdjust() {
                if (/Android/gi.test(navigator.userAgent)) {
                    window.addEventListener('resize', () => {
                        if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                            setTimeout(() => {
                                document.activeElement.scrollIntoViewIfNeeded()
                            }, 0)
                        }
                    })
                } else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
                    document.activeElement.scrollIntoView(true)
                }
            },
            //遍历对象，返回数组对象
            getObjectArrayObj(obj) {
                let objArr = [];
                Object.getOwnPropertyNames(obj).forEach(function(key) {
                    objArr.push({
                        key: key,
                        value: obj[key]
                    })
                })
                return objArr
            },
            //遍历对象，返回数组vlaue
            getObjectArrayValue(obj) {
                return Object.values(obj)
            },
            //遍历对象，返回数组Key
            getObjectArrayKey(obj) {
                return Object.keys(obj)
            },
            //遍历数组，过滤value为空的value
            getArrayForNull(arr) {
                let notNullArr = arr.filter(item => {
                    return item != null && item != "" && item != undefined
                })
                return notNullArr
            },
            //遍历数组，过滤value不为空的value
            getArrayForNull(arr) {
                let nullArr = arr.filter(item => {
                    return item == null || item == "" || item == undefined
                })
                return nullArr
            },
            //表单验证
            validate(obj, rules) {
                for (let key in obj) {
                    for (let j = 0; j < rules.length; j++) {
                        if (key === rules[j].key && !obj[key] && rules[j].required) {
                            Toast(rules[j].message)
                            return
                        }
                    }
                }
                return true
            },
            /* 合法uri */
            validateURL(textval) {
                const urlregex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
                return urlregex.test(textval)
            },
            /* 小写字母 */
            validateLowerCase(str) {
                const reg = /^[a-z]+$/
                return reg.test(str)
            },
            /* 大写字母 */
            validateUpperCase(str) {
                const reg = /^[A-Z]+$/
                return reg.test(str)
            },
            /* 大小写字母 */
            validateAlphabets(str) {
                const reg = /^[A-Za-z]+$/
                return reg.test(str)
            },
            /* 市场售价 */
            validatePrice(str) {
                const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/
                return reg.test(str)
            },
            /* 库存预警值 匹配非负整数（正整数 + 0） */
            validatestockWarn(str) {
                const reg = /^(0|[1-9][0-9]*)$/
                return reg.test(str)
            },
            /* 比价网站 只验证京东和苏宁网站 */
            validateCompareWebsite(str) {
                const reg = /^((https\:\/\/[0-9a-zA-Z\_]+\.|http\:\/\/[0-9a-zA-Z\_]+\.|https\:\/\/|http\:\/\/)|([0-9a-zA-Z\_]+\.){0,1})(jd|suning)\.(com$|com\/[\S]*)/i
                return reg.test(str)
            },
            /* 固定电话 */
            validateTelephone(str) {
                const reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
                return reg.test(str)
            },
            /* 手机号码 */
            validatePhoneNumber(str) {
                const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
                return reg.test(str)
            },
            /* 手机号码和固定电话 */
            validatePhTelNumber(str) {
                const reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/
                return reg.test(str)
            },
            /* 电子邮箱 */
            validateEmail(str) {
                const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                return reg.test(str)
            },
            /* 邮编 */
            validateZipCode(str) {
                const reg = /^[1-9][0-9]{5}$/
                return reg.test(str)
            },
            /* 身份证 */
            validateIDCard(str) {
                const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                return reg.test(str)
            },
            /* 银行卡号 15位或者16位或者19位 */
            validateBank(str) {
                const reg = /^([1-9]{1})(\d{14}|\d{18}|\d{15})$/
                return reg.test(str)
            },
            /* 纳税人识别码 */
            validateTaxpayer(str) {
                const reg = /^([1-9]{1})(\d{14}|\d{18}|\d{15})$/
                return reg.test(str)
            },
            /* 匹配全空格 */
            validateAllBlank(str) {
                const reg = /^\s+$/gi
                return reg.test(str)
            },
        }
    }
}
export default utils