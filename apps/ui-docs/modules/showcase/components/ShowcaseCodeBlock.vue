<script setup lang="ts">
/**
 * ShowcaseCodeBlock
 */
import { ref } from 'vue'

interface Props {
  code: string
  language?: string
  label?: string
  filename?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: 'html',
  label: '',
  filename: ''
})
</script>

<template>
  <ICodeBlock
    class="mt-4"
    :code="code"
    :language="language"
    :label="label"
    :filename="filename"
  />
</template>

<style scoped>
/* Styles removed - using ICodeBlock */
</style>
