<style lang="less" scoped>
@import "../../../index.less";
.task_problem {
  padding-top: @wnkj_padding_10;
  .task_problem_view_container {
    background: @wnkj_color_fff;
    padding: @wnkj_padding_15;
    box-sizing: border-box;
    .van-field {
      padding: 0.26667rem 0;
    }
    .task_problem_view {
      span {
        color: @wnkj_color_dc763a;
      }
    }
  }

  .task_problem_list {
    .task_problem_item {
      border-bottom: 1px solid @wnkj_color_eee;
      .task_problem_item_type {
        .task_problem_item_type_tag {
          .van-tag {
            margin: 0.3rem 0.2rem 0.3rem 0;
          }
        }
        .task_problem_item_type_pic {
          margin: 0.3rem 0;
        }
      }
    }
  }
  .task_problem_switch {
    padding: @wnkj_padding_15;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: @wnkj_color_fff;
    border-bottom: 1px solid @wnkj_color_eee;
    .task_problem_switch_left {
      flex: 1;
      padding-right: 0.2rem;
    }
    .task_problem_switch_right {
      min-width: 2rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .task_problem_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    background: @wnkj_color_fff;
    button {
      flex: 1;
      margin-right: 0.5rem;
    }
    button:last-child {
      margin-right: 0;
    }
  }
}
</style>
<template>
  <WScroll ref="wscroll" :style="{'height': height}">
    <div class="task_problem">
      <div class="task_problem_view_container">
        <p class="task_problem_view">
          发现问题
          <span>*</span>
        </p>
        <div class="task_problem_list">
          <div class="task_problem_item" v-for="(d,index) in problemList" :key="index">
            <van-field
              v-model="message"
              rows="2"
              autosize
              type="textarea"
              maxlength="3000"
              placeholder="请输入"
              show-word-limit
            />
            <div class="task_problem_item_type">
              <div class="task_problem_item_type_tag">
                <van-tag closeable size="large" type="primary" @close="close('success')">分类</van-tag>
                <van-tag closeable size="large" type="primary" @close="close('success')">分类</van-tag>
                <van-tag closeable size="large" type="primary" @close="close('success')">分类</van-tag>
                <van-tag closeable size="large" type="primary" @close="close('success')">分类</van-tag>
                <van-tag closeable size="large" type="primary" @close="close('success')">分类</van-tag>
                <van-button type="primary" size="small">添加问题类别</van-button>
              </div>
              <div class="task_problem_item_type_pic">
                <van-uploader v-model="fileList" :after-read="afterRead" multiple :max-count="9" />
              </div>
            </div>
          </div>
          <van-button
            @click="addType"
            type="primary"
            style="margin-top: 0.3rem;"
            size="small"
          >添加问题类别</van-button>
        </div>
      </div>

      <div class="task_problem_view_container">
        <p class="task_problem_view">改进建议/管理要求</p>
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="3000"
          placeholder="请输入"
          show-word-limit
        />
      </div>
      <div class="task_problem_switch">
        <div class="task_problem_switch_left">是否要求被督导单元进行原因分析及措施</div>
        <div class="task_problem_switch_right">
          <van-switch v-model="checked" />
        </div>
      </div>
      <div class="task_problem_switch">
        <div class="task_problem_switch_left">反馈给质量管理部门(不反馈可不选择）</div>
        <div class="task_problem_switch_right">
          反馈给质量管理部门
          <van-icon name="arrow" color="#999" />
        </div>
      </div>
      <div class="task_problem_footer">
        <van-button @click="save">保存</van-button>
        <van-button @click="submit" type="info">提交</van-button>
      </div>
    </div>
  </WScroll>
</template>

<script>
import { Form, Field, Button, Tag, Uploader, Switch, Icon } from "vant";
export default {
  name: "Taskproblem",
  components: {
    "van-field": Field,
    "van-tag": Tag,
    "van-uploader": Uploader,
    "van-switch": Switch,
    "van-icon": Icon,
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
      message: "",
      fileList: [],
      checked: true,
      problemList: [1]
    };
  },
  methods: {
    initScroll(){
      this.$refs.wscroll.refresh()
    },
    addType() {
      this.problemList.push(1);
    },
    afterRead(file) {
      console.log(file);
      file.status = "uploading";
      file.message = "上传中...";

      setTimeout(() => {
        file.status = "failed";
        file.message = "上传失败";
      }, 1000);
    }
  }
};
</script>
