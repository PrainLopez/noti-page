<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { RecordDto } from "../types/accounting";
import { formatDate } from "../utils/date";
import Button from "./ui/button.vue";
import { API_ENDPOINTS } from "@/config/api";

const records = ref<RecordDto[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const fetchRecords = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(API_ENDPOINTS.records);
    if (!response.ok) throw new Error("Failed to fetch records");
    records.value = await response.json();
  } catch (err) {
    error.value = "Failed to load accounting records";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchRecords();
});
</script>

<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div class="p-4 sm:p-6">
        <div
          class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6"
        >
          <h2
            class="text-xl sm:text-2xl font-semibold leading-none tracking-tight"
          >
            Transaction History
          </h2>
          <Button
            variant="outline"
            @click="fetchRecords"
            class="w-full sm:w-auto"
          >
            Refresh
          </Button>
        </div>

        <div v-if="isLoading" class="text-center py-8">
          <div
            class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"
          ></div>
          <p class="mt-2 text-sm text-muted-foreground">Loading records...</p>
        </div>

        <div v-else-if="error" class="text-center py-8 text-destructive">
          {{ error }}
        </div>

        <div
          v-else-if="records.length === 0"
          class="text-center py-8 text-muted-foreground"
        >
          No transactions found
        </div>

        <div v-else class="relative overflow-x-auto -mx-4 sm:mx-0">
          <div class="block sm:hidden">
            <div
              v-for="record in records"
              :key="record.id"
              class="border-b p-4 space-y-2"
            >
              <div class="flex justify-between items-start">
                <span class="text-sm font-medium">Amount</span>
                <span class="text-sm">{{ record.amount.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-sm font-medium">Time</span>
                <span class="text-sm">{{ formatDate(record.timestamp) }}</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-sm font-medium">Remark</span>
                <span class="text-sm">{{ record.remark || "-" }}</span>
              </div>
            </div>
          </div>

          <table class="w-full text-sm text-left hidden sm:table">
            <thead class="text-xs uppercase bg-muted">
              <tr>
                <th scope="col" class="px-6 py-3">Time</th>
                <th scope="col" class="px-6 py-3">Amount</th>
                <th scope="col" class="px-6 py-3">Remark</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="record in records"
                :key="record.id"
                class="border-b hover:bg-muted/50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ formatDate(record.timestamp) }}
                </td>
                <td class="px-6 py-4">
                  {{ record.amount.toFixed(2) }}
                </td>
                <td class="px-6 py-4">
                  {{ record.remark || "-" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
