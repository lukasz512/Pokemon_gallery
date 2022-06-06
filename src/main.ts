import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import VueKinesis from "vue-kinesis";
import counter from "vue3-count-to";

createApp(App).use(store).use(VueKinesis).use(counter).mount("#app");
