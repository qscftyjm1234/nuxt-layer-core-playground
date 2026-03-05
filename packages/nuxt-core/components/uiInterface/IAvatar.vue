<script setup lang="ts">
/**
 * IAvatar - UI 介面層頭像/圖示容器
 *
 * 用途：統一的 Avatar 介面，內部可使用原生 HTML 或 UI 框架
 * 未來要換 UI 框架，只需要修改這個檔案
 */

interface Props {
  size?: number | string
  color?: string
  rounded?: boolean | string
  icon?: string
  image?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 40,
  color: '#e0e0e0',
  rounded: true,
  icon: '',
  image: ''
})

const avatarStyle = computed(() => ({
  width: typeof props.size === 'number' ? `${props.size}px` : props.size,
  height: typeof props.size === 'number' ? `${props.size}px` : props.size,
  backgroundColor: props.image ? 'transparent' : props.color,
  borderRadius:
    props.rounded === true ? '50%' : typeof props.rounded === 'string' ? props.rounded : '0'
}))
</script>

<template>
  <!-- 目前使用原生 HTML -->
  <div
    class="ui-avatar"
    :style="avatarStyle"
  >
    <img
      v-if="image"
      :src="image"
      alt="Avatar"
      class="ui-avatar__image"
    />
    <span
      v-else-if="icon"
      class="ui-avatar__icon"
    >
      {{ icon }}
    </span>
    <slot v-else />
  </div>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VAvatar
    :size="size"
    :color="color"
    :rounded="rounded"
    :image="image"
  >
    <VIcon v-if="icon" :icon="icon" />
    <slot v-else />
  </VAvatar>
  -->
</template>

<style scoped>
.ui-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.ui-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ui-avatar__icon {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
