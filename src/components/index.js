import WLoading from './wloading'
import WScroll from './wscroll'
import WHeader from './wheader'
const impression = {
    WLoading,
    WScroll,
    WHeader,
}
const TUI = {
    install: function(Vue) {
        Object.keys(impression).forEach(key => {
            Vue.component(impression[key].name, impression[key]);
        });
    }
}
export default TUI