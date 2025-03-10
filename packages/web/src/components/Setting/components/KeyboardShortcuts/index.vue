<template>
  <div ref="rootRef">
    <KeyRow v-model="settingStore.data.keyboardShortcuts.prevChapter" :title="`上一章: ${readStore.preTitle}`" :key-text="keyText" />
    <KeyRow v-model="settingStore.data.keyboardShortcuts.nextChapter" :title="`下一章: ${readStore.nextTitle}`" :key-text="keyText" />
    <KeyRow v-model="settingStore.data.keyboardShortcuts.pageUp" title="上一屏" :key-text="keyText" />
    <KeyRow v-model="settingStore.data.keyboardShortcuts.pageDown" title="下一屏" :key-text="keyText" />
    <KeyRow v-model="settingStore.data.keyboardShortcuts.tts" title="朗读" :key-text="keyText" />
  </div>
</template>

<script setup>
import { useMagicKeys } from '@/hooks/useMagicKeys';
import { useReadStore } from '@/stores/read';
import { useSettingStore } from '@/stores/setting';
import KeyRow from './KeyRow.vue';

const rootRef = ref();

const readStore = useReadStore();

const { keyText } = useMagicKeys({
  target: rootRef,
  onEventFired(e) {
    e.stopImmediatePropagation();
  }
});

const settingStore = useSettingStore();
</script>
