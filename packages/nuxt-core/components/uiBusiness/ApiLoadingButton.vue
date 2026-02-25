<script setup lang="ts">
/**
 *ApiLoadingButton - 業務邏輯層
 *
 * 用途：
 * 1. 封裝 API 呼叫邏輯
 * 2. 自動處理 Global Loading (透過 useApi)
 * 3. 觸發延遲 Mock API
 */

import ILoadingButton from '../uiInterface/ILoadingButton.vue'

interface Props {
  label?: string
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '發送 API 請求',
  url: '/users'
})

// 使用 useApi，它內部已經整合了 useLoading
const api = useApi

const handleClick = async () => {
  try {
    // 呼叫傳入的 Mock API URL
    // globalLoading: true (預設值) 會觸發全域 Loading
    await api(props.url, {
      globalLoading: true,
      autoSuccess: true // 自動顯示成功訊息
    })
  } catch (e) {
    console.error(e)
  }
}

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <ILoadingButton
    v-bind="$attrs"
    variant="primary"
    @click="handleClick"
  >
    {{ label }}
  </ILoadingButton>
</template>
```
