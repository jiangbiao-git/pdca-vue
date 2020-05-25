<style lang="less" scoped>
@import "../../index.less";

.wnkj_header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1.6rem;
  border-bottom: 1px solid #eee;
  z-index: 9997;
  display: flex;
  align-items: flex-end;
  padding: 0.3rem @wnkj_padding_15;
  box-sizing: border-box;
  background: @wnkj_color_fff;
  .wnkj_header_content {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: space-between;
  }
  .wnkj_header_title {
    flex: 1;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 @wnkj_padding_30;
    color: @wnkj_color_333;
    font-size: @wnkj_fs_16;
  }
  .wnkj_header_title_active {
    color: @wnkj_color_2d8cf0;
  }
  .van-icon {
    position: absolute;
    z-index: 999;
  }
  .wnkj_header_share {
    right: @wnkj_padding_15;
  }
}
</style>
<template>
  <div class="wnkj_header" v-if="utils.isApp()">
    <div class="wnkj_header_content">
      <van-icon class="wnkj_header_back" @click="back" name="arrow-left" size="0.4rem" />
      <div class="wnkj_header_title" :class="{wnkj_header_title_active: color}">{{title}}</div>
      <van-icon class="wnkj_header_share" @click="menu" v-if="share" :name="icon" size="0.4rem" />
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  name: "WHeader",
  props: {
    backTag: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "PDCA"
    },
    color: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: "share"
    },
    share: {
      type: Boolean,
      default: false
    }
  },
  components: {
    "van-icon": Icon
  },
  methods: {
    back() {
      if (this.backTag) {
        try {
          window.WNFlutter("nativeBack");
        }catch(err) {
          console.log(err)
        }
        return;
      }
      this.$router.back();
    },
    menu() {}
  }
};
</script>