import {
    sendVerifyCode,
} from '@/api/user'
import Vue from 'vue'
import { ACCESS_TOKEN } from "@/store/mutation-types";
export default {
    state: {
        sendVerifyCode: '',
    },
    mutations: {
        setSendVerifyCode(state, data) {
            state.sendVerifyCode = data
        },
    },
    getters: {
        getSendVerifyCode: state => state.sendVerifyCode,
    },
    actions: {
        //获取验证码
        mSendVerifyCode({ commit }, data) {
            return new Promise((resolve, reject) => {
                sendVerifyCode(data).then(res => {
                    const data = res.data
                    commit('setSendVerifyCode', data)
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}