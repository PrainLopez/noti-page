<script setup lang="ts">
import AccountingForm from "./components/AccountingForm.vue";
import AccountingDashboard from "./components/AccountingDashboard.vue";
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#1e2329] base">
    <div class="container px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
      <AccountingForm />
      <AccountingDashboard />
    </div>
  </div>
</template>
