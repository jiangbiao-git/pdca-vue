import axios from '@/libs/api.request'

export const sendVerifyCode = (data) => {
    return axios.request({
        url: `hawkeye/api/sms/sendVerifyCode`,
        data,
        method: 'post'
    })
}