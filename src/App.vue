<template>
  <div>
    <div>
      <div>
        Labas
      </div>
      <div>
        Hej
      </div>
      <div>
        Send
      </div>
      <div>
        Lorem
      </div>
      <br />
      <button @click="sortInIframe">Hello</button>
    </div>
    <div class="transatlantic-sidebar">
      <vue-resizable
        :width="resizableWidth"
        :left="resizableLeft"
        @resize:move="handleResizeMove"
        :active="['l']"
      >
        <div id="transatlantic-iframe" :style="{ width: iframeWidth + 'px' }">
          <iframe
            id="transatlantic-iframe-contents"
            :width="iframeWidth"
            v-if="showTransatlanticSidebar"
            src="http://localhost:8081/login"
          ></iframe>
        </div>
      </vue-resizable>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// @ts-ignore
import VueResizable from "vue-resizable";
@Component({ components: { VueResizable } })
export default class App extends Vue {
  iframeWidth: number = 500;
  resizableWidth: number = 1000;
  resizableLeft: number = 1000;
  isHovered: boolean = false;
  isDragged: boolean = false;
  sidebarPosition: number = 0;
  get showTransatlanticSidebar() {
    return window.location.search.includes("transatlantic=true");
  }
  // @ts-ignore
  handleResizeMove(data) {
    this.iframeWidth = data.width;
    this.resizableWidth = data.width;
    console.log(data);
  }
  sortInIframe() {
    const event = new CustomEvent("myCustomEvent", { detail: 123 });
    const iframe = document.getElementById("transatlantic-iframe-contents");
    iframe.contentWindow.postMessage("Viso gero", "*");
  }
  mounted() {
    this.resizableWidth = this.iframeWidth;
    this.resizableLeft = window.innerWidth - this.resizableWidth;
  }
  // @ts-ignore
  onDragged(data) {
    this.isDragged = true;
    this.handleResizeMove({ width: window.innerWidth - data.clientX });
    this.sidebarPosition = data.offsetX;
    if (data.last) {
      this.isDragged = false;
    }
    console.log(data);
  }
  created() {
    window.onclick = (e) => {
      const event = new CustomEvent("myCustomEvent", { detail: 123 });
      const iframe = document.getElementById("transatlantic-iframe-contents");
      iframe.contentWindow.postMessage(e.target.innerText, "*");
    };
  }
}
</script>

<style>
.transatlantic-sidebar {
  width: min-content;
  height: 100vh;
  position: relative;
}
.sidebar-indicator {
  height: 100vh;
  cursor: w-resize;
  background-color: red;
  position: absolute;
  top: 0;
  z-index: 10000;
  width: 3px;
}
.sidebar-indicator.active {
  background-color: blue;
}
#transatlantic-iframe {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
}
#transatlantic-iframe iframe {
  height: 100%;
}
</style>
