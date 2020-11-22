<template>
  <div>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo voluptas
      quas provident perferendis sit laboriosam. At fugiat laborum vitae
      voluptas ipsa, asperiores minus ut temporibus, quidem dolore aliquid
      distinctio eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Illo voluptas quas provident perferendis sit laboriosam. At fugiat laborum
      vitae voluptas ipsa, asperiores minus ut temporibus, quidem dolore aliquid
      distinctio eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Illo voluptas quas provident perferendis sit laboriosam. At fugiat laborum
      vitae voluptas ipsa, asperiores minus ut temporibus, quidem dolore aliquid
      distinctio eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Illo voluptas quas provident perferendis sit laboriosam. At fugiat laborum
      vitae voluptas ipsa, asperiores minus ut temporibus, quidem dolore aliquid
      distinctio eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Illo voluptas quas provident perferendis sit laboriosam. At fugiat laborum
      vitae voluptas ipsa, asperiores minus ut temporibus, quidem dolore aliquid
      distinctio eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Illo voluptas quas provident perferendis sit laboriosam. At fugiat laborum
      vitae voluptas ipsa, asperiores minus ut temporibus, quidem dolore aliquid
      distinctio eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Illo voluptas quas provident perferendis sit laboriosam. At fugiat laborum
      vitae voluptas ipsa, asperiores minus ut temporibus, quidem dolore aliquid
      distinctio eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Illo voluptas quas provident perferendis sit laboriosam. At fugiat laborum
      vitae voluptas ipsa, asperiores minus ut temporibus, quidem dolore aliquid
      distinctio eos.
    </div>
    <div class="transatlantic-sidebar">
      <vue-resizable
        :width="resizableWidth"
        :left="resizableLeft"
        @resize:move="handleResizeMove"
        :active="['l']"
      >
        <div
          class="sidebar-indicator"
          :style="{ left: sidebarPosition + 'px' }"
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false"
          :class="{ active: isHovered }"
          v-dragged="onDragged"
        ></div>
        <div id="transatlantic-iframe" :style="{ width: iframeWidth + 'px' }">
          <iframe
            :width="iframeWidth"
            v-if="showTransatlanticSidebar"
            src="https://transatlantic.netlify.app/login"
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
  handleResizeMove(data) {
    this.iframeWidth = data.width;
    this.resizableWidth = data.width;
    console.log(data);
  }
  mounted() {
    this.resizableWidth = this.iframeWidth;
    this.resizableLeft = window.innerWidth - this.resizableWidth;
  }
  onDragged(data) {
    this.isDragged = true;
    this.handleResizeMove({ width: window.innerWidth - data.clientX });
    this.sidebarPosition = data.offsetX;
    if (data.last) {
      this.isDragged = false;
    }
    console.log(data);
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
