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
            <a href="#" class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Dawit Gulino
            </a>
          </div>
          
          <div class="hidden md:flex flex-1 justify-center">
            <div class="flex space-x-8">
              <a v-for="link in NAV_LINKS" :key="link.href" :href="link.href" 
                 class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {{ t(link.label) }}
              </a>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <button @click="toggleLanguage" 
                    class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-sm font-medium transition-colors ring-1 ring-slate-700">
              {{ locale === 'en' ? 'IT' : 'EN' }}
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
    <footer class="bg-slate-900 border-t border-slate-800 py-8">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-slate-400 text-sm">
          {{ t('footer.copyright', { year }) }}
        </p>
      </div>
    </footer>
  </div>
</template>
