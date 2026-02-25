<script setup lang="ts">
/**
 * Header 通知中心 - 框架無關
 * 框架無關的通知中心
 */
import { useAppStore } from '../../../stores/app'

const appStore = useAppStore()
const isOpen = ref(false)

const notifications = [
  {
    title: '新訂單通知',
    subtitle: '收到一筆來自 Google 的新訂單',
    time: '5m',
    color: 'success',
    icon: 'cart'
  },
  {
    title: '系統警告',
    subtitle: 'CPU 使用率超過 90%',
    time: '2h',
    color: 'warning',
    icon: 'alert'
  },
  {
    title: '備份完成',
    subtitle: '每日自動備份已成功',
    time: '1d',
    color: 'info',
    icon: 'check'
  }
]

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

// 點擊外部關閉
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.dropdown')) {
      isOpen.value = false
    }
  })
})
</script>

<template>
  <div
    v-if="appStore.config.header.notifications"
    class="dropdown"
    :class="{ 'is-open': isOpen }"
  >
    <button
      class="dropdown-toggle btn-icon"
      @click.stop="toggleMenu"
    >
      <div style="position: relative">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        <span
          class="badge badge-dot"
          style="position: absolute; top: -2px; right: -2px"
        />
      </div>
    </button>

    <div class="dropdown-menu">
      <div style="padding: 1rem; font-weight: 600; border-bottom: 1px solid var(--color-gray-200)">
        通知中心
      </div>
      <div>
        <a
          v-for="(item, i) in notifications"
          :key="i"
          href="#"
          class="dropdown-menu-item"
          style="display: flex; gap: 0.75rem; padding: 0.75rem 1rem"
        >
          <div
            style="
              width: 32px;
              height: 32px;
              border-radius: var(--radius-full);
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            "
            :style="{
              backgroundColor:
                item.color === 'success'
                  ? 'var(--color-success)'
                  : item.color === 'warning'
                    ? 'var(--color-warning)'
                    : 'var(--color-info)',
              opacity: 0.2
            }"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
              />
            </svg>
          </div>
          <div style="flex: 1; min-width: 0">
            <div style="font-weight: 600; font-size: 0.875rem">
              {{ item.title }}
            </div>
            <div style="font-size: 0.75rem; color: var(--color-gray-600)">
              {{ item.subtitle }}
            </div>
          </div>
          <div style="font-size: 0.75rem; color: var(--color-gray-500); flex-shrink: 0">
            {{ item.time }}
          </div>
        </a>
      </div>
      <div class="dropdown-menu-divider" />
      <a
        href="#"
        class="dropdown-menu-item"
        style="text-align: center; color: var(--color-primary); font-weight: 500"
      >
        查看所有通知
      </a>
    </div>
  </div>
</template>
