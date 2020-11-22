import Vue from "vue";
import App from "./App.vue";
// @ts-ignore
import VDragged from "v-dragged";

Vue.use(VDragged);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
