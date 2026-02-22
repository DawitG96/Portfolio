<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { Github, ExternalLink, Mail, Linkedin } from 'lucide-vue-next'

const { t, tm, rt } = useI18n()

// Retrieve projects and jobs from i18n dynamically
const projects = computed(() => {
  const items = tm('projects.items') || []
  return (Array.isArray(items) ? items : []).map(item => ({
    title: rt(item.title) || '',
    description: rt(item.description) || '',
    image: rt(item.image) || '',
    link: rt(item.link) || '',
    source: rt(item.source) || ''
  }))
})

const jobs = computed(() => {
  const items = tm('experience.items') || []
  return (Array.isArray(items) ? items : []).map(item => ({
    title: rt(item.title) || '',
    company: rt(item.company) || '',
    period: rt(item.period) || '',
    description: rt(item.description) || ''
  }))
})
</script>

<template>
  <div class="flex flex-col">
    <!-- Hero Section -->
    <section class="py-20 lg:py-32 bg-slate-900 text-center px-4 relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 z-0">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
      
      <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <img src="/img/my-logo.png" alt="Dawit Gulino" class="w-40 h-40 rounded-full object-cover border-4 border-slate-800 shadow-2xl mb-8 ring-4 ring-blue-500/20" />
        <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
          {{ t('hero.title') }}
        </h1>
        <p v-if="t('hero.subtitle')" class="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl text-balance">
          {{ t('hero.subtitle') }}
        </p>
        
        <div class="flex space-x-6 mt-6">
          <a href="https://www.linkedin.com/in/dawitgulino" target="_blank" rel="noopener" class="text-slate-400 hover:text-blue-400 transition-colors bg-slate-800 p-3 rounded-full hover:bg-slate-700 ring-1 ring-slate-700">
            <Linkedin class="w-6 h-6" />
          </a>
          <a href="https://github.com/DawitG96" target="_blank" rel="noopener" class="text-slate-400 hover:text-white transition-colors bg-slate-800 p-3 rounded-full hover:bg-slate-700 ring-1 ring-slate-700">
            <Github class="w-6 h-6" />
          </a>
          <a href="mailto:dawit.gulino@gmail.com" class="text-slate-400 hover:text-emerald-400 transition-colors bg-slate-800 p-3 rounded-full hover:bg-slate-700 ring-1 ring-slate-700">
            <Mail class="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-20 bg-slate-800 px-4">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-white mb-12">
          {{ t('projects.title') }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <template v-for="project in projects" :key="project.title">
            <div v-if="project.image" class="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-xl transition-transform hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/30 flex flex-col">
              <div class="aspect-video overflow-hidden">
                <img :src="project.image" :alt="project.title" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-xl font-bold text-white mb-2">{{ project.title }}</h3>
                <p class="text-slate-400 mb-6 flex-grow text-sm text-balance">
                  {{ project.description }}
                </p>
                
                <div class="mt-auto flex flex-wrap gap-4">
                  <a v-if="project.link" :href="project.link" target="_blank" rel="noopener"
                     class="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300">
                    <ExternalLink class="w-4 h-4 mr-2" />
                    {{ t('projects.viewSite') }}
                  </a>
                  <a v-if="project.source" :href="project.source" target="_blank" rel="noopener"
                     class="inline-flex items-center text-sm font-medium text-slate-300 hover:text-white">
                    <Github class="w-4 h-4 mr-2" />
                    {{ t('projects.sourceCode') }}
                  </a>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="py-20 bg-slate-900 px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-white mb-12">
          {{ t('experience.title') }}
        </h2>
        
        <div class="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
          <div v-for="(job, index) in jobs" :key="index" class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div class="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-800 text-slate-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ring-4 ring-slate-900">
              <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
            
            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl hover:border-blue-500/30 transition-colors">
              <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-start sm:items-center justify-between mb-4">
                <div>
                  <h3 class="font-bold text-lg text-white">{{ job.title }}</h3>
                  <div class="text-blue-400 font-medium">{{ job.company }}</div>
                </div>
                <time class="text-sm font-medium text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full whitespace-nowrap border border-slate-700">
                  {{ job.period.includes('Present') ? job.period.replace('Present', t('experience.present')) : job.period.includes('Presente') ? job.period.replace('Presente', t('experience.present')) : job.period }}
                </time>
              </div>
              <p class="text-slate-300 text-sm leading-relaxed text-balance">
                {{ job.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section id="education" class="py-20 bg-slate-800 px-4 border-t border-slate-700">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-white mb-12">
          {{ t('education.title') }}
        </h2>
        
        <div class="bg-slate-900 p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div class="relative z-10">
            <h3 class="text-xl font-bold text-emerald-400 mb-6">
              {{ t('education.degree') }}
            </h3>
            
            <ul class="space-y-4 text-slate-300 mb-8 list-none">
              <li class="flex items-start">
                <div class="w-2 h-2 mt-2 mr-3 bg-emerald-400 rounded-full shrink-0"></div>
                <span>{{ t('education.skills.c') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-2 h-2 mt-2 mr-3 bg-blue-400 rounded-full shrink-0"></div>
                <span>{{ t('education.skills.java') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-2 h-2 mt-2 mr-3 bg-purple-400 rounded-full shrink-0"></div>
                <span>{{ t('education.skills.csharp') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-2 h-2 mt-2 mr-3 bg-yellow-400 rounded-full shrink-0"></div>
                <span>{{ t('education.skills.python') }}</span>
              </li>
              <li class="flex items-start">
                <div class="w-2 h-2 mt-2 mr-3 bg-slate-400 rounded-full shrink-0"></div>
                <span>{{ t('education.skills.tools') }}</span>
              </li>
            </ul>
            
            <div v-if="t('education.note')" class="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex items-start">
              <div class="mr-3 text-blue-400 shrink-0">ℹ️</div>
              <p class="text-sm text-slate-400 italic">
                {{ t('education.note') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
</style>
