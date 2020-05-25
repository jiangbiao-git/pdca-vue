<style lang="less" scoped>
@import "../../../index.less";
.task_analysis {
  padding-top: @wnkj_padding_10;
  .task_analysis_view_container {
    background: @wnkj_color_fff;
    padding: @wnkj_padding_15;
    box-sizing: border-box;
    .van-field {
      padding: 0.26667rem 0;
    }
    .task_analysis_view {
      span {
        color: @wnkj_color_dc763a;
      }
    }
  }
  .task_analysis_top {
    margin-top: @wnkj_padding_10;
  }
  .task_analysis_list {
    .task_analysis_item {
      border-bottom: 1px solid @wnkj_color_eee;
      .task_analysis_item_type {
        .task_analysis_item_type_tag {
          .van-tag {
            margin: 0.3rem 0.2rem 0.3rem 0;
          }
        }
      }
    }
    .task_analysis_item_type_pic {
          margin: 0.3rem 0;
        }
    .task_analysis_item_user{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.2rem 0;
        .task_analysis_item_user_right{
          flex: 1;
        }
      }
  }
  .task_analysis_footer {
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
    <div class="task_analysis">
      <div class="task_analysis_view_container">
        <div class="task_analysis_list">
          <div class="task_analysis_item">
            <p class="task_analysis_view">
              原因分析
              <span>*</span>
            </p>
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
          <div class="task_analysis_item">
            <p class="task_analysis_view">
              整改措施
              <span>*</span>
            </p>
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
          <div class="task_analysis_item_type_pic">
            <van-uploader v-model="fileList" :after-read="afterRead" multiple :max-count="9" />
          </div>
          <div class="task_analysis_item_user">
            <div class="task_analysis_item_user_left">反馈人：杨露</div>
            <div class="task_analysis_item_user_left">反馈时间：2019年11月18日 13:24</div>
          </div>
        </div>
      </div>

      <div class="task_analysis_view_container task_analysis_top">
        <p class="task_analysis_view">改进或要求</p>
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
      <div class="task_analysis_footer">
        <van-button @click="save">通过</van-button>
        <van-button @click="submit" type="info">不通过</van-button>
      </div>
    </div>
  </WScroll>
</template>

<script>
import { Form, Field, Button, Tag, Uploader, Switch, Icon } from "vant";
export default {
  name: "Taskanalysis",
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
      default: "100vh"
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
