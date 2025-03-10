<template>
  <div class="h-full w-full flex flex-col overflow-hidden">
    <div
      id="text-container"
      class="flex flex-1 flex-col overflow-hidden whitespace-pre-wrap break-words p-10 text-[#b3b3b3] lh-1.5em"
      :style="{
        fontSize: settingStore.data.readStyle.fontSize + 'px',
        letterSpacing: settingStore.data.readStyle.letterSpacing + 'px'
      }"
    >
      <!-- 加载 -->
      <a-spin v-if="loading" :spinning="loading" class="h-full w-full items-center justify-center !flex" />
      <!-- 阅读区域 -->
      <div ref="contentRef" v-focus tabindex="0" class="relative h-full flex flex-1 flex-col overflow-y-auto indent-2em outline-none sm:px-60">
        <!-- 漫画 -->
        <template v-if="contentType === ContentType.MANGA">
          <img v-for="(row, idx) in content" :key="idx" :src="row" />
        </template>
        <!-- 小说 -->
        <template v-else>
          <div v-for="(row, idx) in content" :key="idx" class="center-row transition-300 transition-color ease" :data-idx="idx" v-html="row"></div>
        </template>

        <!-- 上下章节按钮 -->
        <div class="flex justify-center">
          <a-button-group>
            <a-button
              type="text"
              :disabled="!lastChapter"
              :style="{ color: settingStore.data.readStyle.textColor }"
              :title="readStore.preTitle"
              @click="onPrevChapter"
            >
              <LeftOutlined />
              上一章
            </a-button>
            <a-button type="text" :style="{ color: settingStore.data.readStyle.textColor }" @click="showChapters">目录</a-button>
            <a-button type="text" :style="{ color: settingStore.data.readStyle.textColor }" :title="readStore.title" @click="init(true)"
              >重载</a-button
            >
            <a-button
              type="text"
              :disabled="!nextChapter"
              :style="{ color: settingStore.data.readStyle.textColor }"
              :title="readStore.nextTitle"
              @click="onNextChapter"
            >
              下一章
              <RightOutlined />
            </a-button>
          </a-button-group>
        </div>
      </div>
      <a-back-top class="hidden sm:block" :visibility-height="100" :target="topTarget" />
    </div>
  </div>

  <!-- 目录 -->
  <div v-if="chaptersVisible" class="fixed bottom-0 left-0 right-0 top-0 z-10 bg-[#000000cc]">
    <div
      ref="chaptersRef"
      class="fixed left-0 right-0 top-0 h-400 flex flex-col overflow-hidden sm:left-50% sm:top-5 sm:w-400 sm:translate-x--50% sm:rounded-4"
      :style="{
        boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.2)',
        color: settingStore.data.readStyle.textColor,
        backgroundColor: settingStore.data.readStyle.backgroundColor
      }"
    >
      <div
        class="app-region-drag mb-4 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap b-b-1 b-b-[#00000033] b-b-solid p-10 pb-4 text-center"
        @click="scrollIntoViewChapter"
      >
        {{ readStore.title || '-' }}
      </div>

      <div class="h-full overflow-auto" style="scrollbar-width: none">
        <div
          v-for="chapter in chaptersStore.chapters"
          :key="chapter.name"
          :title="chapter.name"
          :class="[
            'px-10 overflow-hidden whitespace-nowrap text-ellipsis lh-24 hover:bg-[#00000026] cursor-pointer',
            readStore.path === chapter.chapterPath ? 'bg-[#00000026]' : ''
          ]"
          @click="toChapter(chapter.chapterPath)"
        >
          {{ chapter.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ContentType } from '@any-reader/rule-utils';
import { onClickOutside } from '@vueuse/core';
import { useChaptersStore } from '@/stores/chapters';
import { useReadStore } from '@/stores/read';
import { useBus, EVENT_CHAPTERS_BOX } from '@/utils/bus';
import { useContent, useTheme } from '@/pages/common/content';

const chaptersStore = useChaptersStore();
const readStore = useReadStore();

const chaptersVisible = ref(false);
const contentRef = ref();
const chaptersRef = ref();

const topTarget = () => contentRef.value as HTMLElement;

onClickOutside(chaptersRef, () => (chaptersVisible.value = false));

const { settingStore, content, contentType, toChapter, lastChapter, nextChapter, onPrevChapter, onNextChapter, loading, init } =
  useContent(contentRef);
useTheme(contentRef);

function scrollIntoViewChapter() {
  const el = chaptersRef.value.querySelector(`[title="${readStore.title}"]`);
  el.scrollIntoView({ behavior: 'instant' });
}

function showChapters() {
  chaptersVisible.value = true;
  nextTick(scrollIntoViewChapter);
}

useBus(EVENT_CHAPTERS_BOX).on(showChapters);
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

#text-container {
  font-family: var(--font);
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
