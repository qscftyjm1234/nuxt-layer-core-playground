<script setup lang="ts">
/**
 * 這是專案的示範首頁。
 * 核心層的所有組件 (IButton, IAlert) 與 Composables (useDateTime, useNotify) 均可直接使用。
 */
const { formatDateTime } = useDateTime()
const notify = useNotify()

const now = ref(formatDateTime(new Date()))

function handleClick() {
  notify.success('你點擊了按鈕！核心層連動成功。')
}
</script>

<template>
  <div class="pa-10">
    <IAlert
      type="info"
      title="恭喜！你的 Nuxt 3 專案已準備就緒"
      text="這是一個繼承了 softleader-nuxt-core 核心層的專案。你可以直接使用封裝好的 UI 組件與工具函式。"
      class="mb-6"
    />

    <ICard title="核心功能示範" class="mb-6">
      <div class="d-flex align-center gap-4">
        <div>當前時間：<strong>{{ now }}</strong></div>
        <IButton variant="primary" @click="handleClick">
          點我測試通知
        </IButton>
      </div>
    </ICard>

    <IAlert border="left" colored-border type="success" elevation="2">
      接下來，你可以到 <code>configs/default.json</code> 修改專案名稱 or API 設定。
    </IAlert>
  </div>
</template>
