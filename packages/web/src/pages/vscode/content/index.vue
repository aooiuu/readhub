<template>
  <div class="relative h-full w-full flex flex-col overflow-hidden">
    <div v-if="loading" class="flex flex-1 items-center justify-center">
      <vscode-progress-ring></vscode-progress-ring>
    </div>
    <div
      id="text-container"
      ref="contentRef"
      v-focus
      tabindex="0"
      class="flex-1 overflow-y-auto whitespace-pre-wrap break-words p-10 indent-2em lh-1.5em outline-none"
      :style="{
        fontSize: settingStore.data.readStyle.fontSize + 'px',
        letterSpacing: settingStore.data.readStyle.letterSpacing + 'px'
      }"
    >
      <template v-if="contentType === ContentType.MANGA">
        <img v-for="(row, idx) in content" :key="idx" class="center-row" :data-idx="idx" :src="row" />
      </template>
      <template v-else>
        <div v-for="(row, idx) in content" :key="idx" class="center-row" :data-idx="idx" v-html="row"></div>
      </template>

      <div class="my-10 flex justify-center">
        <div v-if="lastChapter" class="cursor-pointer hover:op-70" :title="readStore.preTitle" @click="onPrevChapter">上一章</div>
        <div class="cursor-pointer hover:op-70" :title="readStore.title" @click="init(true)">重载</div>
        <div v-if="nextChapter" class="cursor-pointer hover:op-70" :title="readStore.nextTitle" @click="onNextChapter">下一章</div>
      </div>
    </div>

    <div class="topbar absolute left-0 top-0 h-30 w-full px-10">
      <div class="topbar__menu flex justify-end bg-[--vscode-sideBar-background]">
        <div
          v-if="lastChapter"
          class="codicon codicon-arrow-left vsc-toolbar-btn"
          :title="`上一章: ${readStore.preTitle}`"
          @click="onPrevChapter"
        ></div>
        <div
          v-if="nextChapter"
          class="codicon codicon-arrow-right vsc-toolbar-btn"
          :title="`下一章: ${readStore.nextTitle}`"
          @click="onNextChapter"
        ></div>
        <div class="codicon codicon-arrow-up vsc-toolbar-btn" title="上一屏" @click="onPageUp"></div>
        <div class="codicon codicon-arrow-down vsc-toolbar-btn" title="下一屏" @click="onPageDown"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ContentType } from '@any-reader/rule-utils';
import { useContent, useTheme } from '@/pages/common/content';
import { useReadStore } from '@/stores/read';

const contentRef = ref();

const readStore = useReadStore();

const { content, contentType, settingStore, lastChapter, nextChapter, onPageUp, onPageDown, onPrevChapter, onNextChapter, loading, init } =
  useContent(contentRef);

useTheme(contentRef);
</script>

<style scoped>
:deep(p) {
  margin: 0;
  padding: 0;
}
:deep(img) {
  max-width: 100%;
  margin: 0 auto;
  display: block;
}

.topbar {
  .topbar__menu {
    transform: translateY(-100%);
    transition: all ease 0.3s;
  }

  &:hover {
    .topbar__menu {
      transform: translateY(0);
    }
  }
}

#text-container {
  /* font-family: var(--font); */
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: var(--line-height);
}

.center-row {
  margin-bottom: var(--section-spacing);
  font-weight: var(--font-weight);
  opacity: var(--text-opacity);
}
</style>
