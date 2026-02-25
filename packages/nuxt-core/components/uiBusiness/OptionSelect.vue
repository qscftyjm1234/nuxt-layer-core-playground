<script setup lang="ts">
/**
 * OptionSelect - 通用選項選擇器 (業務層)
 *
 * 用途：
 * 通用的業務選擇器，透過 useOptions 統一取得選項。
 *
 * 例子：
 * <OptionSelect code="job" v-model="form.job" />
 */
import ISelect from '../uiInterface/ISelect.vue'

interface Props {
  modelValue?: string
  code: 'job' | 'interest' | 'city' // 對應 options registry keys
  label?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// 使用核心 Options 工具
const opts = useOptions()

// 自動綁定對應的選項資料
const options = computed(() => {
  const target = opts[props.code]
  return target ? target.value : []
})

// 自動決定 Label
const displayLabel = computed(() => props.label || '請選擇')

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <ISelect
    v-bind="$attrs"
    :model-value="modelValue"
    :label="displayLabel"
    :items="options"
    placeholder="請選擇..."
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
