<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { getComponentDoc } from '~/utils/doc-data'
import DocViewer from '~/components/DocViewer.vue'

const route = useRoute()
const componentName = computed(() => route.params.name as string)

// 取得該元件的文檔資料
const docData = computed(() => {
  return getComponentDoc(componentName.value) || {
    name: componentName.value,
    description: `[文件建置中] 本頁面為 ${componentName.value} 的預設展示頁面，詳細 API 請參閱原始碼。`,
    importPath: `import { ${componentName.value} } from "#components"`,
    props: [],
    emits: [],
    slots: [],
    codeExample: ''
  }
})
</script>

<template>
  <div class="component-page">
    <DocViewer
      :name="docData.name"
      :description="docData.description"
      :import-path="docData.importPath"
      :api-props="docData.props"
      :api-emits="docData.emits"
      :api-slots="docData.slots"
      :code-example="docData.codeExample"
    >
      <template #demo>
        <div class="demo-placeholder">
          <p>這裡將展示 <strong>{{ componentName }}</strong> 的實際渲染結果</p>
          <div class="demo-interactive">
             <component :is="componentName" v-if="componentName === 'IButton'" variant="primary">SoftLeader Button</component>
             <p v-else class="text-slate-400 text-sm">請將對應的互動範例放入 slot</p>
          </div>
        </div>
      </template>
    </DocViewer>
  </div>
</template>

<style scoped>
.demo-placeholder {
  text-align: center;
  padding: 2rem;
  width: 100%;
}
.demo-interactive {
  margin-top: 1.5rem;
  padding: 2rem;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  background-color: #f8fafc;
}
</style>
