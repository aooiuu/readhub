export const useReadStore = defineStore('read', () => {
  const title = ref<string>('');
  /** 上一章标题 */
  const preTitle = ref<string>('');
  /** 下一章标题 */
  const nextTitle = ref<string>('');
  const path = ref<string>('');

  /** 设置当前章标题 */
  function setTitle(val: string) {
    title.value = val;
  }

  /** 设置上一章标题 */
  function setPreTitle(val: string) {
    preTitle.value = val;
  }

  /** 设置下一章标题 */
  function setNextTitle(val: string) {
    nextTitle.value = val;
  }

  function setPath(val: string) {
    path.value = val;
  }

  return { title, path, preTitle, nextTitle, setTitle, setPreTitle, setNextTitle, setPath };
});
