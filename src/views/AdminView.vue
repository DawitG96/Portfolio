<script setup lang="ts">
</script>

<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center p-4">
    <div class="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl max-w-md w-full text-center">
      <h1 class="text-3xl font-bold text-white mb-4">Admin Dashboard</h1>
      <p class="text-slate-400 mb-8">
        Welcome to the admin area. This section is protected by Keycloak authentication.
      </p>
      
      <div class="space-y-4">
        <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
          <h2 class="text-lg font-medium text-emerald-400 mb-2">Authenticated successfully</h2>
          <p class="text-sm text-slate-300">You can now manage your portfolio projects and experience entries.</p>
        </div>
        
        <button class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          Manage Projects (Coming Soon)
        </button>
        <button class="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
