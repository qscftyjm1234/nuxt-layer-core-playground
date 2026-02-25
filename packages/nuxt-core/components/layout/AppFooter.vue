<script setup lang="ts">
/**
 * 應用程式頁尾 - 框架無關
 * 框架無關的頁尾
 */
import { useAppStore } from '../../stores/app'

const appStore = useAppStore()
</script>

<template>
  <footer
    v-if="appStore.config.footer.visible"
    class="app-footer"
  >
    {{ appStore.config.footer.content }}
  </footer>
</template>
