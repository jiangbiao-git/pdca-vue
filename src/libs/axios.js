import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
import { ACCESS_TOKEN, ACCESS_APP } from '@/store/mutation-types'
import Vue from 'vue'
import router from '@/router'

class HttpRequest {
    constructor(baseUrl = baseURL) {
        this.baseUrl = baseUrl
        this.queue = {}
    }
    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            retry: 3,
            retryDelay: 5000,
            timeout: 10000,
            headers: {
                'accessToken': Vue.ls.get(ACCESS_TOKEN)
            }
        }
        return config
    }
    destroy(url) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            store.commit('setLoading', false)
        }
    }
    interceptors(instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
                // 添加全局的loading...
                if (!Object.keys(this.queue).length) {
                    if (!config.noToast) {
                        store.commit('setLoading', true)
                    };
                }
                this.queue[url] = true
                return config
            }, error => {
                return Promise.reject(error)
            })
            // 响应拦截
        instance.interceptors.response.use(res => {
            this.destroy(url)
            if (res.headers.accesstoken) {
                Vue.ls.set(ACCESS_TOKEN, res.headers.accesstoken);
            }
            const { data, status } = res
            if (data.code == 0 || data.code == 200) {
                return { data, status }
            } else if (data.code == 401) {
                Toast(data.msg)
                let isApp = Vue.ls.get(ACCESS_APP)
                    //app调手机端退出、登录方法
                if (isApp === 'app') {
                    try {
                        WNFlutter('nativeBack');
                        WNFlutter("presentLogin")
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    // router.push("/login")
                }
                return Promise.reject(res)
            } else {
                Toast(data.msg)
                return Promise.reject(res)
            }
        }, err => {
            this.destroy(url)
                // 请求超时， 重新请求
            var config = err.config;
            if (!config.noToast) {
                // If config does not exist or the retry option is not set, reject
                if (!config || !config.retry) return Promise.reject(err);

                // Set the variable for keeping track of the retry count
                config.__retryCount = config.__retryCount || 0;

                // Check if we've maxed out the total number of retries
                if (config.__retryCount >= config.retry) {
                    Toast(`网络异常，系统已为您重试3次还是无法获取到数据，请您检查网络！`);
                    // Reject with the error
                    return Promise.reject(err);
                }

                // Increase the retry count
                config.__retryCount += 1;

                // Create new promise to handle exponential backoff
                var backoff = new Promise(function(resolve) {
                    setTimeout(function() {
                        Toast(`网络异常，系统正在为您重试，请等待5秒，重试第${config.__retryCount}次`);
                        resolve();
                    }, config.retryDelay || 1);
                });

                // Return the promise in which recalls axios to retry the request
                return backoff.then(function() {
                    return instance(config);
                });
            }
        })
    }
    request(options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}
export default HttpRequest