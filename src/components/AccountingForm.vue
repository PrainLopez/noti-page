<script setup lang="ts">
import { ref } from 'vue'
import Button from './ui/button.vue'
import Input from './ui/input.vue'
import { API_ENDPOINTS } from '@/config/api'

const amount = ref<number>(0)
const remark = ref<string>('')

const submitForm = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.createRecord, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount.value,
        remark: remark.value || null
      })
    })
    
    if (response.ok) {
      alert('Transaction recorded successfully!')
      // Reset form
      amount.value = 0
      remark.value = ''
    } else {
      throw new Error('Failed to record transaction')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Failed to submit transaction')
  }
}
</script>

<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div class="p-4 sm:p-6">
        <h2 class="text-xl sm:text-2xl font-semibold leading-none tracking-tight mb-4">
          Accounting Entry
        </h2>
        <form @submit.prevent="submitForm">
          <div class="flex flex-col sm:flex-row gap-4 sm:items-end">
            <div class="flex-1">
              <label for="amount" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                Amount *
              </label>
              <Input
                id="amount"
                type="number"
                v-model="amount"
                required
                step="0.01"
                placeholder="Enter amount"
              />
            </div>

            <div class="flex-1">
              <label for="remark" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                Remark
              </label>
              <Input
                id="remark"
                type="text"
                v-model="remark"
                placeholder="Enter remark (optional)"
              />
            </div>

            <div class="w-full sm:w-auto">
              <Button type="submit" class="w-full sm:w-auto">
                Submit Transaction
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>