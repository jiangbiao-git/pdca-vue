<style lang="less" scoped>
@import "../../../index.less";
.task_evaluate {
  padding-top: @wnkj_padding_10;
  .task_evaluate_view_container {
    background: @wnkj_color_fff;
    padding: @wnkj_padding_15;
    box-sizing: border-box;
    .van-field {
      padding: 0.26667rem 0;
    }
    .task_evaluate_view {
      span {
        color: @wnkj_color_dc763a;
      }
    }
  }
  .task_evaluate_top {
    margin-top: @wnkj_padding_10;
  }
  .task_evaluate_list {
    .task_evaluate_item {
      border-bottom: 1px solid @wnkj_color_eee;
      .task_evaluate_item_active {
        border: 1px solid @wnkj_color_519EFF;
      }
      .task_evaluate_item_type {
        .task_evaluate_item_type_tag {
          .van-tag {
            margin: 0.3rem 0.2rem 0.3rem 0;
          }
        }
      }
    }
    .task_evaluate_item_user {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.2rem 0;
      .task_evaluate_item_user_right {
        flex: 1;
      }
    }
  }
  .task_evaluate_item_type_pic {
    margin: 0.3rem 0;
  }
  .task_evaluate_view_list {
    .task_evaluate_view_list_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        margin-right: 0.5rem;
        flex: 1;
        color: @wnkj_color_999;
      }
      button:last-child {
        margin-right: 0;
      }
    }
    .task_evaluate_view_list_item:last-child {
      margin-top: 0.3rem;
    }
    .task_evaluate_view_list_item_active {
      color: @wnkj_color_519EFF!important;
      border: 1px solid @wnkj_color_519EFF;
    }
  }
  .task_evaluate_footer {
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
    <div class="task_evaluate">
      <div class="task_evaluate_view_container">
        <div class="task_evaluate_list">
          <div class="task_evaluate_item">
            <p class="task_evaluate_view">单元自评</p>
            <van-button type="default" class="task_evaluate_item_active">完全达标</van-button>
            <p class="task_evaluate_view">备注</p>
            <van-field
              v-model="message"
              rows="2"
              autosize
              type="textarea"
              maxlength="3000"
              show-word-limit
              disabled
            />
          </div>
          <div class="task_evaluate_item_type_pic">
            <van-uploader
              v-model="fileList"
              disabled
              :after-read="afterRead"
              multiple
              :max-count="9"
            />
          </div>
          <div class="task_evaluate_item_user">
            <div class="task_evaluate_item_user_left">反馈人：杨露</div>
            <div class="task_evaluate_item_user_left">反馈时间：2019年11月18日 13:24</div>
          </div>
        </div>
      </div>

      <div class="task_evaluate_view_container task_evaluate_top">
        <p class="task_evaluate_view">
          督导者评价
          <span>*</span>
        </p>
        <div class="task_evaluate_view_list">
          <div class="task_evaluate_view_list_item">
            <van-button
              type="default"
              :class="{'task_evaluate_view_list_item_active': commentIndex === 1}"
              @click="comment(1)"
            >完全达标</van-button>
            <van-button
              type="default"
              :class="{'task_evaluate_view_list_item_active': commentIndex === 2}"
              @click="comment(2)"
            >部分达标</van-button>
          </div>
          <div class="task_evaluate_view_list_item">
            <van-button
              type="default"
              :class="{'task_evaluate_view_list_item_active': commentIndex === 3}"
              @click="comment(3)"
            >未达标</van-button>
            <van-button
              type="default"
              :class="{'task_evaluate_view_list_item_active': commentIndex === 4}"
              @click="comment(4)"
            >不具备整改条件</van-button>
          </div>
        </div>
        <p class="task_evaluate_view">备注</p>
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="3000"
          placeholder="请输入"
          show-word-limit
        />
        <div class="task_evaluate_item_type_pic">
          <van-uploader
            v-model="fileList"
            :after-read="afterRead"
            multiple
            :max-count="9"
          />
        </div>
      </div>
      <div class="task_evaluate_footer">
        <van-button @click="submit" type="info">提交</van-button>
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
      commentIndex: null,
      problemList: [1]
    };
  },
  methods: {
    initScroll(){
      this.$refs.wscroll.refresh()
    },
    comment(index) {
      this.commentIndex = index;
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
