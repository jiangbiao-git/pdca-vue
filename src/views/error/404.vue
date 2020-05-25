<style lang="less" scoped>
.wnkj_error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  img {
    width: 100%;
    display: inline-block;
  }

  .van-button {
    position: absolute;
    bottom: 1rem;
  }
}
</style>
<template>
  <div class="wnkj_error">
    <img :src="publicPath + 'images/404.jpg'" />
    <van-button type="info" @click="$router.push('/')">返回首页</van-button>
  </div>
</template>

<script>
import { Button } from "vant";
import environmentMixin from "@/mixins/environment.js";
export default {
  name: "Page404",
  mixins: [environmentMixin],
  components: {
    "van-button": Button
  },
  data() {
    return {};
  },
  methods: {}
};
</script>