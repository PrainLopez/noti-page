<script setup lang="ts">
import { ref } from "vue";
import { API_ENDPOINTS, BEARER_TOKEN } from "@/config/api";
import { set } from "@vueuse/core";

const amount = ref<number>(0);
const remark = ref<string>("");
const toastSuccessOn = ref(false);
const toastErrorOn = ref(false);

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
        toastSuccessOn.value = true;
        setTimeout(() => {
          toastSuccessOn.value = false;
        }, 3000);
        break;
      default:
        console.error("Error: Unexpected response status");
        toastErrorOn.value = true;
        setTimeout(() => {
          toastErrorOn.value = false;
        }, 3000);
        break;
    }
  } else {
    console.error("Error: Request fail!");
    toastErrorOn.value = true;
    setTimeout(() => {
      toastErrorOn.value = false;
    }, 3000);
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
            <input
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
            <input
              id="remark"
              type="text"
              v-model="remark"
              placeholder="Enter remark (optional)"
              class="input input-bordered w-full"
            />
          </label>
        </div>

        <div class="w-full sm:w-auto">
          <div class="toast toast-top toast-center">
            <div
              class="alert alert-success flex items-center space-x-2"
              v-if="toastSuccessOn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Expend recorded.</span>
            </div>
            <div
              class="alert alert-error flex items-center space-x-2"
              v-if="toastErrorOn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Request failed.</span>
            </div>
          </div>
          <button class="btn btn-primary w-full sm:w-auto" @click="submitForm">
            Submit Transaction
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
