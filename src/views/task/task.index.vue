<style lang="less" scoped>
@import "../../index.less";
.task {
  .task_step {
    padding: @wnkj_padding_5;
    box-sizing: border-box;
    background: @wnkj_color_fff;
  }
}
</style>
<template>
  <div class="task">
    <WHeader />
    <div class="task_step">
      <van-steps :active="active" @click-step="step">
        <van-step>基本信息</van-step>
        <van-step>发现问题</van-step>
        <van-step>原因分析及措施</van-step>
        <van-step>改进评价</van-step>
      </van-steps>
    </div>
    <div class="task_step_content">
      <van-swipe
        ref="swiper"
        :show-indicators="false"
        :loop="false"
        :touchable="false"
        @change="onChange"
      >
        <van-swipe-item>
          <Basic ref="swipe0" :height="height" />
        </van-swipe-item>
        <van-swipe-item>
          <Problem ref="swipe1" :height="height" />
        </van-swipe-item>
        <van-swipe-item>
          <Analysis ref="swipe2" :height="height" />
        </van-swipe-item>
        <van-swipe-item>
          <Evaluate ref="swipe3" :height="height" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import Basic from "./components/task.basic.vue";
import Analysis from "./components/task.analysis.vue";
import Problem from "./components/task.problem.vue";
import Evaluate from "./components/task.evaluate.vue";
import { Step, Steps, Swipe, SwipeItem } from "vant";
export default {
  name: "Task",
  components: {
    Basic,
    Analysis,
    Problem,
    Evaluate,
    "van-step": Step,
    "van-steps": Steps,
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem
  },
  data() {
    return {
      active: 0,
      height: "100%"
    };
  },
  mounted() {
    this.height =
      document.body.offsetHeight -
      document.querySelector(".task_step").offsetHeight +
      "px";
  },
  methods: {
    onChange(index) {
      this.$refs[`swipe${index}`].initScroll();
    },
    step(index) {
      this.active =index;
      this.$refs.swiper.swipeTo(index);
    }
  }
};
</script>
