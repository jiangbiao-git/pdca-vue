<style lang="less" scoped>
@import "../../../index.less";
.task_basic {
  background: @wnkj_color_fff;
  margin-top: @wnkj_padding_10;
  padding: @wnkj_padding_15;
  box-sizing: border-box;
}
</style>
<template>
  <WScroll ref="wscroll" :style="{'height': height}">
    <div class="task_basic">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="taskName"
          label="任务名称"
          placeholder="请填写任务名称"
          input-align="right"
          error-message-align="right"
          :rules="[{ required: true, message: '请填写任务名称' }]"
        />
        <van-field
          v-model="password"
          name="userName"
          label="督查人"
          placeholder="请填写督查人"
          input-align="right"
          error-message-align="right"
          :rules="[{ required: true, message: '请填写督查人' }]"
        />
        <van-field
          v-model="password"
          name="userName"
          label="督查时间"
          placeholder="请选择督查时间"
          input-align="right"
          error-message-align="right"
          :rules="[{ required: true, message: '请选择督查时间' }]"
        />
        <van-field
          v-model="password"
          name="userName"
          label="督导问题个数"
          placeholder="请填写督导问题个数"
          input-align="right"
          error-message-align="right"
          :rules="[{ required: true, message: '请填写督导问题个数' }]"
        />
        <van-field
          v-model="password"
          name="userName"
          label="督导单元"
          placeholder="请填写督导单元"
          input-align="right"
          error-message-align="right"
          :rules="[{ required: true, message: '请填写督导单元' }]"
        />
        <van-field
          v-model="password"
          name="userName"
          label="指定整改人"
          input-align="right"
          error-message-align="right"
          placeholder="请填写指定整改人"
          :rules="[{ required: true, message: '请填写指定整改人' }]"
        />
        <van-field
          v-model="password"
          name="userName"
          label="整改期限"
          placeholder="请填写整改期限"
          input-align="right"
          error-message-align="right"
          :rules="[{ required: true, message: '请填写整改期限' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">下一步</van-button>
        </div>
      </van-form>
    </div>
  </WScroll>
</template>

<script>
import { Form, Field, Button } from "vant";
export default {
  name: "Taskbase",
  components: {
    "van-form": Form,
    "van-field": Field,
    "van-button": Button
  },
  props: {
    height: {
      type: String,
      default: '100vh'
    }
  },
  data() {
    return {
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    initScroll(){
      this.$refs.wscroll.refresh()
    }
  }
};
</script>
