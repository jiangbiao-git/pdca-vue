export default {
    baseUrl: {
        dev: '/',
        pro: 'http://quality.csweinuo.com/',
    },
    pdf: 'http://quality.csweinuo.com/pdf/web/viewer.html?file=',
    video: ['mp4', 'avi', 'wmv', 'rmvb', 'mpeg', 'mov', 'flv', '3gp'],
    wx: {
        token: 'quality', //对应测试号接口配置信息里填的token
        appid: 'wxd42c189f0000894a', //对应测试号信息里的appID
        secret: '6aa22c3fdc21b87f40622ac87da04e64', //对应测试号信息里的appsecret
        grant_type: 'authorization_code' //默认
    },
    wxtest: {
        token: 'quality', //对应测试号接口配置信息里填的token
        appid: 'wx958dfaa8f03e9eb9', //对应测试号信息里的appID
        secret: '888a74649b42f42593382e88a38f0613', //对应测试号信息里的appsecret
        grant_type: 'authorization_code' //默认
    },
    options: {
        namespace: 'wnkj__', // key键前缀
        name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
        storage: 'local', // 存储名称: session, local, memory
    }
}