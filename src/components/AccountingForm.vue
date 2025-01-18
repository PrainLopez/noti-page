<script setup lang="ts">
import { ref } from "vue";
import { API_ENDPOINTS, BEARER_TOKEN } from "@/config/api";

const amount = ref<number>(0);
const remark = ref<string>("");

async function submitForm() {
  // TODO: block submit button while processing

  const response = await fetch(API_ENDPOINTS.createRecord.uri, {
    method: API_ENDPOINTS.createRecord.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    body: JSON.stringify({
      amount: amount.value,
      remark: remark.value || null,
    }),
  });

  if (response.ok) {
    switch (response.status) {
      case 200:
        console.log("Success: Transaction created!");
        break;
      default:
        console.error("Error: Unexpected response status");
        break;
    }
  } else {
    console.error("Error: Request fail!");
    alert("Failed to submit transaction");
  }
}
</script>

<template>
  <div class="card border w-full max-w-4xl mx-auto shadow-md">
    <div class="card-body p-4 sm:p-6">
      <h2
        class="text-xl sm:text-2xl font-semibold leading-none tracking-tight mb-4"
      >
        Accounting Entry
      </h2>
      <div class="flex flex-col sm:flex-row gap-4 sm:items-end">
        <div class="flex-1">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Amount</span>
              <span class="label-text-alt text-red-400">(required)</span>
            </div>
            <Input
              id="amount"
              type="number"
              v-model="amount"
              required
              step="0.01"
              min="0"
              placeholder="Enter amount"
              class="input input-bordered w-full"
            />
          </label>
        </div>
        <div class="flex-1">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Remark</span>
            </div>
            <Input
              id="amount"
              type="text"
              v-model="amount"
              placeholder="Enter remark (optional)"
              class="input input-bordered w-full"
            />
          </label>
        </div>

        <div class="w-full sm:w-auto">
          <Toaster />
          <button class="btn btn-primary w-full sm:w-auto">
            Submit Transaction
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
