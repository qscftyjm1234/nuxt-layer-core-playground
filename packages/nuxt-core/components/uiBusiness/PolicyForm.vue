<script setup lang="ts">
import ICard from '@/components/uiInterface/ICard.vue'
import IInput from '@/components/uiInterface/IInput.vue'
import IButton from '@/components/uiInterface/IButton.vue'
import { ref } from 'vue'

const policyName = ref('')
const policyType = ref('')

const handleSubmit = () => {
  console.log('Policy submitted', { name: policyName.value, type: policyType.value })
}
</script>

<template>
  <ICard class="policy-form">
    <template #header>
      <h3 class="text-lg font-bold text-slate-100">Policy Form</h3>
    </template>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <IInput
        v-model="policyName"
        label="Policy Name"
        placeholder="Enter policy name"
      />
      <IInput
        v-model="policyType"
        label="Policy Type"
        placeholder="Enter policy type"
      />
      
      <div class="flex justify-end pt-4">
        <IButton type="submit" color="primary">
          Submit Policy
        </IButton>
      </div>
    </form>
  </ICard>
</template>

<style scoped>
.policy-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
