<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  created() {
    this.utils.getAppAccessToken(()=>{})
    this.setRootFontSize();
    window.addEventListener(
      "resize",
      () => {
        this.setRootFontSize();
      },
      false
    );
  },
  methods: {
    //适配PC端
    setRootFontSize() {
      if (this.utils.IsPC()) {
        document.querySelector("#app").style.width = "677px";
        document.querySelector("#app").style.border = "1px solid #eee";
        var width =
          document.documentElement.clientWidth || document.body.clientWidth;
        if (width > 677) {
          width = 677;
        }
        let fontSize = width / 16;
        document.getElementsByTagName("html")[0].style["font-size"] =
          fontSize + "px";
      } else {
        document.querySelector("#app").style.width = "100%";
        document.querySelector("#app").style.border = "none";
      }
    }
  }
}
</script>
