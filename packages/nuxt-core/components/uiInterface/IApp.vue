<script setup lang="ts">
/**
 * IApp - 介面層
 *
 * 用途：應用程式根容器
 * 職責：封裝底層框架的 App Wrapper (如 Vuetify 的 v-app)
 * 目的：讓 Layout 層解耦，不綁定特定框架
 */

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <!-- 
    Vuetify 需要 v-app 作為最外層容器來提供 Theme 和 Overlay context。
    在此處封裝，讓外部 Layout 只需使用 <IApp>。
  -->
  <v-app v-bind="$attrs">
    <slot />
  </v-app>
</template>

<style scoped>
/* 可以在此定義全域的 App 層級樣式，或讓 slot 內容決定 */
</style>
