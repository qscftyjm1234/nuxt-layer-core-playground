<script setup lang="ts">
const options = useOptions()
const appConfig = useAppConfig()
console.log(appConfig)
</script>

<template>
  <div class="pa-6">
    <Welcome />

    <v-divider class="my-6" />

    <div class="text-h6 mb-4">自動掃描選項測試 (Automated Discovery Test)</div>
    
    <v-card variant="outlined" class="mb-4">
      <v-card-title>專案專屬選項：保險類型 (insuranceType)</v-card-title>
      <v-card-text>
        <div class="d-flex ga-2">
          <pre>{{ options.insuranceType.withAll }}</pre>
          <pre>{{ options.yesNo.withAll }}</pre>
          <pre>{{ options.abc }}</pre>
          <pre>{{ options.abcb }}</pre>
          <div v-for="item in options.yesNo.value">{{ item }}</div>
        </div>
      </v-card-text>
    </v-card>

    <v-card variant="outlined">
      <v-card-title>專案專屬選項：理賠狀態 (claimStatus)</v-card-title>
      <v-card-text>
        <div class="d-flex ga-2">
          <v-chip 
            v-for="item in options.claimStatus" 
            :key="item.value"
            :color="item.color"
          >
            {{ item.label }}
          </v-chip>
        </div>
      </v-card-text>
    </v-card>

    <v-alert type="info" class="mt-4" variant="tonal">
      💡 這些選項是從 <code>apps/playground-app/options/insurance.ts</code> 自動讀取的，沒有進行任何手動註冊。
    </v-alert>
  </div>
</template>
