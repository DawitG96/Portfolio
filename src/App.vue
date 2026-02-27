<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale, t } = useI18n()

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'it' : 'en'
}

const year = computed(() => new Date().getFullYear())

const NAV_LINKS = [
  { href: '#projects', label: 'nav.projects' },
  { href: '#experience', label: 'nav.experience' },
  { href: '#education', label: 'nav.education' }
]
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-slate-900/90 backdrop-blur-sm z-50 border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex-shrink-0 flex items-center">
            <a href="#" aria-label="Home" tabindex="0" class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none rounded-sm">
              Dawit Gulino
            </a>
          </div>
          
          <div class="hidden md:flex flex-1 justify-center">
            <ul class="flex space-x-8">
              <li v-for="link in NAV_LINKS" :key="link.href">
                <a :href="link.href" tabindex="0"
                   class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none block">
                  {{ t(link.label) }}
                </a>
              </li>
            </ul>
          </div>

          <div class="flex items-center space-x-4">
            <button @click="toggleLanguage" aria-label="Toggle language"
                    class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-sm font-medium transition-colors ring-1 ring-slate-700 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none">
              {{ locale.toUpperCase() }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content routing -->
    <main class="flex-grow pt-16">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 border-t border-slate-800 py-8 relative">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-slate-400 text-sm flex items-center justify-center gap-2">
          {{ t('footer.copyright', { year }) }}
          <router-link to="/admin" aria-label="Admin Dashboard" tabindex="0" title="Admin Dashboard" class="w-1.5 h-1.5 rounded-full bg-slate-700 opacity-20 hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"></router-link>
        </p>
      </div>
    </footer>
  </div>
</template>
