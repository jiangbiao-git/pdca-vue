<template></template>
<script>
import { mapActions } from "vuex";
import config from "@/config";
import { Toast } from "vant";
import { ACCESS_USERINFO } from "@/store/mutation-types";
export default {
  name: "Taskdetail",
  data() {
    return {
      wxUser: {
        wxOpenId: "",
        wxAvatar: "",
        wxNickName: ""
      }
    };
  },
  created() {
    let url = window.location.href;
    if (window.location.href.indexOf("&code") === -1) {
      url = window.location.href.split("&code")[0];
    }
    if (this.$route.query.code) {
      this.getAuthorize();
    } else {
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
        config.wx.appid
      }&redirect_uri=${encodeURIComponent(
        url
      )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
    }
  },
  methods: {
    ...mapActions(["mAuthorize", "mWechat"]),
    getAuthorize() {
      this.mAuthorize(this.$route.query.code).then(res => {
        //如果用户主动刷新页面导致code失效，判断openid是否存在，不存在重新授权一次获取openid
        if (res.data.openid) {
          this.seachWeChat(res.data.openid);
          this.wxUser.wxNickName = res.data.nickname;
          this.wxUser.wxAvatar = res.data.headimgurl;
          this.wxUser.wxOpenId = res.data.openid;
        } else {
          Toast("获取微信信息失败，请重新扫码获取！");
        }
      });
    },
    //获取到openid，然后根据openid进行查询用户信息，如果未查询到信息，则去注册绑定信息，完成信息。
    seachWeChat(openId) {
      this.mWechat({
        openId
      }).then(res => {
        const path = this.$route.query.path
          ? this.$route.query.path.split("?")[0]
          : "/exam";
        if (res.data.length === 0) {
          this.$router.push({
            path: "/user/bind",
            query: {
              path: path,
              taskId: this.$route.query.taskId,
              wxAvatar: this.wxUser.wxAvatar,
              wxNickName: this.wxUser.wxNickName,
              wxOpenId: this.wxUser.wxOpenId
            }
          });
        } else {
          if (
            res.data.deptId &&
            // res.data.positionClassify &&
            // res.data.position &&
            res.data.workYearMonth &&
            res.data.orgId
          ) {
            this.$ls.set(ACCESS_USERINFO, res.data);
            this.$router.push({
              path: path,
              query: {
                taskId: this.$route.query.taskId
              }
            });
            return;
          }
          this.$router.push({
            path: "/user/info",
            query: {
              path: path,
              taskId: this.$route.query.taskId,
              wxAvatar: this.wxUser.wxAvatar,
              wxNickName: this.wxUser.wxNickName,
              wxOpenId: this.wxUser.wxOpenId,
              userId: res.data.userId,
              userName: res.data.userName,
              orgId: res.data.orgId,
              orgName: res.data.orgName,
              deptId: res.data.deptId,
              deptName: res.data.deptName,
              workYearMonth: res.data.workYearMonth
            }
          });
        }
      });
    }
  }
};
</script>
