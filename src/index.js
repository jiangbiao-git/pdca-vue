import Vue from 'vue'
import 'amfe-flexible'
import '@/index.less'
import FastClick from 'fastclick'
import utils from '@/libs/utils.js'
import TUI from '@/components'
import Storage from 'vue-ls';
import config from '@/config'
Vue.use(Storage, config.options);
// import VuePreview from 'vue-preview'
// Vue.use(VuePreview)
FastClick.attach(document.body)
Vue.use(utils)
Vue.use(TUI)

FastClick.prototype.focus = function(targetElement) {
        var length
        var deviceIsIOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
            //兼容处理:在iOS7中，有一些元素（如date、datetime、month等）在setSelectionRange会出现TypeError
            //这是因为这些元素并没有selectionStart和selectionEnd的整型数字属性，所以一旦引用就会报错，因此排除这些属性才使用setSelectionRange方法
        if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
            length = targetElement.value.length
            targetElement.setSelectionRange(length, length)
                /*修复bug ios 11.3不弹出键盘，这里加上聚焦代码，让其强制聚焦弹出键盘*/
            targetElement.focus()
        } else {
            targetElement.focus()
        }
    }
    // 另外监听键盘弹起的方法：
    // Vue.directive('resetPage', {
    //   inserted: function (el) {
    //     // 监听键盘收起事件
    //     document.body.addEventListener('focusout', () => {
    //       if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //         //软键盘收起的事件处理
    //         setTimeout(() => {
    //           const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
    //           window.scrollTo(0, Math.max(scrollHeight - 1, 0))
    //         }, 100)
    //       }
    //     })
    //   }
    // })