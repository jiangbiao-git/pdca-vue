<style lang="less">
@import "../../index.less";

.wnkj_scroll {
  background: @wnkj_color_f2f2f2;
  overflow: hidden;
  height: 100vh;

  .loading-pos,
  .pulldown-tip {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    top: -50px;
    height: 50px;
    line-height: 50px;
    color: #fcfcfc;
    text-align: center;
    z-index: 2000;
  }

  .pullup-tip {
    position: absolute;
    left: 0;
    bottom: -50px;
    height: 50px;
    line-height: 50px;
    width: 100%;
    color: #fcfcfc;
    text-align: center;
    z-index: 2000;
  }

  .loading-pos {
    background-color: rgba(7, 17, 27, 0.7);
  }

  .pull-icon {
    position: absolute;
    top: 0;
    left: 30%;
    color: #a5a1a1;
    font-size: 1.5em;
    transition: all 0.15s ease-in-out;
  }

  .van-loading {
    padding-right: 0.1rem;
    box-sizing: border-box;
    display: inline-block;
  }

  .tip-content {
    color: #000;
    padding-left: 0.1rem;
    box-sizing: border-box;
  }

  .pull-icon.icon-rotate {
    transform: rotate(180deg);
  }

  .loading-container {
    position: absolute;
    height: 10px;
    width: 10px;
    left: 35%;
    top: 50%;
    transform: translate(-50%, -50%);
    perspective: 40px;
  }

  .loading-connecting {
    line-height: 35px;
  }

  .cube {
    height: 10px;
    width: 10px;
    transform-origin: 50% 50%;
    transform-style: preserve-3d;
    animation: rotate 3s infinite ease-in-out;
  }

  .side {
    position: absolute;
    height: 10px;
    width: 10px;
    border-radius: 50%;
  }

  .side1 {
    background: #4bc393;
    transform: translateZ(10px);
  }

  .side2 {
    background: #ff884d;
    transform: rotateY(90deg) translateZ(10px);
  }

  .side3 {
    background: #32526e;
    transform: rotateY(180deg) translateZ(10px);
  }

  .side4 {
    background: #c53fa3;
    transform: rotateY(-90deg) translateZ(10px);
  }

  .side5 {
    background: #ffcc5c;
    transform: rotateX(90deg) translateZ(10px);
  }

  .side6 {
    background: #ff6b57;
    transform: rotateX(-90deg) translateZ(10px);
  }

  @keyframes rotate {
    0% {
      transform: rotateX(0deg) rotateY(0deg);
    }

    50% {
      transform: rotateX(360deg) rotateY(0deg);
    }

    100% {
      transform: rotateX(360deg) rotateY(360deg);
    }
  }
}
</style>
<template>
  <div ref="wrapper" class="wnkj_scroll">
    <!--该节点需要定位，内容以此节点的盒模型为基础滚动。另外，该节点的背景色配合上拉加载、下拉刷新的UI，正常情况下不可作它用。-->
    <div class="content-bg better-scroll-container">
      <!--如果需要调滚动内容的背景色，则改该节点的背景色-->
      <!--下拉加载-->
      <div v-show="pulldown" class="pulldown-tip" :style="{'top': paddingTop ? 0 : '-50px'}">
        <van-loading type="spinner" color="#1989fa" size="18px" />
        <span class="tip-content">{{pulldownTip.text}}</span>
      </div>
      <div
        class="wnkj_scroll_container"
        :style="{'padding-top': utils.isApp() ? '1.6rem' : 0, 'padding-bottom': paddingBottom}"
      >
        <slot></slot>
      </div>
      <div v-show="pullup" class="pullup-tip">
        <van-loading type="spinner" color="#1989fa" size="18px" />
        <span class="tip-content">{{pulldownTip.textup}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
import { Loading } from "vant";
import { myMixin } from "./minxin.js";
export default {
  name: "WScroll",
  components: {
    "van-loading": Loading
  },
  // mixins: [myMixin],
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    paddingTop: {
      type: Boolean,
      default: false
    },
    paddingBottom: {
      type: String,
      default: '0'
    },
    // 内部div横向滚动，纵向滚动 可选值：'vertical'、'horizontal'
    eventPassthrough: {
      type: String,
      default: ""
    },
    pullUpLoad: {
      type: Object,
      default: () => {}
    },
    pullDownRefresh: {
      type: Object,
      default: () => {}
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      scroll: null,
      loadingConnecting: false,
      pulldownTip: {
        text: "下拉刷新", // 松开立即刷新
        textup: "上拉加载", // 松开立即刷新
        rotate: "" // icon-rotate
      }
    };
  },
  mounted() {
    //兼容Safari浏览器header和footer被遮挡问题
    // if(this.isSafari()){
    //     document.querySelector(".wnkj_scroll").style.height = document.body.clientHeight - 80 + 'px'
    // }
    this.$nextTick(() => {
      this._initScroll();
    });
    setTimeout(() => {
      this.scroll.refresh();
    }, 3000);
  },
  methods: {
    isSafari() {
      var ua = navigator.userAgent.toLowerCase();
      if (
        ua.indexOf("applewebkit") > -1 &&
        ua.indexOf("mobile") > -1 &&
        ua.indexOf("safari") > -1 &&
        ua.indexOf("linux") === -1 &&
        ua.indexOf("android") === -1 &&
        ua.indexOf("chrome") === -1 &&
        ua.indexOf("ios") === -1 &&
        ua.indexOf("browser") === -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      // better-scroll的初始化
      this.scroll = new Bscroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        eventPassthrough: this.eventPassthrough,
        // 上拉加载
        pullUpLoad: this.pullUpLoad,
        // 下拉刷新
        pullDownRefresh: this.pullDownRefresh
      });
      this.scroll.on("pullingUp", () => {
        console.log("数据加载中");
        this.pulldownTip.textup = "数据加载中";
        this.$emit("pullup");
      });
      this.scroll.on("pullingDown", () => {
        this.pulldownTip.text = "数据加载中";
        this.$emit("pulldown");
      });
      // 是否派发滚动事件
      if (this.listenScroll) {
        let me = this;
        this.scroll.on("scroll", pos => {
          if (pos.y > 70) {
            this.pulldownTip.text =
              this.pulldownTip.text == "数据加载中"
                ? this.pulldownTip.text
                : "释放立即刷新";
          }
          me.$emit("scroll", pos);
        });
      }
      this.scroll.on("scrollStart", () => {
        this.pulldownTip.text = "下拉刷新";
        this.pulldownTip.textup = "上拉刷新";
      });
      // // 是否派发滚动到底部事件，用于上拉加载
      // if (this.pullup) {
      //     this.scroll.on('scrollEnd', () => {
      //         // 滚动到底部
      //         if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
      //             this.pulldownTip.textup = '刷新中'
      //             this.$emit('pullup')
      //         }
      //     })
      // }
      // // 是否派发顶部下拉事件，用于下拉刷新
      // if (this.pulldown) {
      //     this.scroll.on('touchEnd', (pos) => {
      //         // 下拉动作
      //         if (pos.y > 50) {
      //             console.log('刷新中')
      //             this.pulldownTip.text = '刷新中'
      //             this.$emit('pulldown')
      //         }
      //     })
      // }

      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
    },
    finishPulldownLoad() {
      this.scroll.finishPullDown();
    },
    finishPullupLoad() {
      this.scroll.finishPullUp();
    },
    disable() {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable();
    },
    enable() {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable();
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    }
  }
};
</script>