<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'
import type { Project, Experience } from '../stores/portfolio'
import { keycloak } from '../services/keycloak'
import { useRouter } from 'vue-router'

const store = usePortfolioStore()
const router = useRouter()

const activeTab = ref<'projects' | 'experiences'>('projects')

const newProject = ref<Project>({
  imageUrl: '',
  linkUrl: '',
  sourceUrl: '',
  orderIndex: 0,
  titleEn: '',
  descriptionEn: '',
  titleIt: '',
  descriptionIt: ''
})

const newExperience = ref<Experience>({
  company: '',
  orderIndex: 0,
  titleEn: '',
  periodEn: '',
  descriptionEn: '',
  titleIt: '',
  periodIt: '',
  descriptionIt: ''
})

onMounted(() => {
  store.fetchAll()
})

const handleLogout = () => {
  keycloak.logout()
}

const handleSaveProject = async () => {
  try {
    await store.saveProject({ ...newProject.value })
    // reset form
    newProject.value = {
      imageUrl: '', linkUrl: '', sourceUrl: '', orderIndex: store.projects.length + 1,
      titleEn: '', descriptionEn: '', titleIt: '', descriptionIt: ''
    }
  } catch (e) {
    alert('Failed to save project')
  }
}

const handleDeleteProject = async (id: number | undefined) => {
  if (id && confirm('Are you sure you want to delete this project?')) {
    try {
      await store.deleteProject(id)
    } catch (e) {
      alert('Delete failed')
    }
  }
}

const handleSaveExperience = async () => {
  try {
    await store.saveExperience({ ...newExperience.value })
    newExperience.value = {
      company: '', orderIndex: store.experiences.length + 1,
      titleEn: '', periodEn: '', descriptionEn: '',
      titleIt: '', periodIt: '', descriptionIt: ''
    }
  } catch (e) {
    alert('Failed to save experience')
  }
}

const handleDeleteExperience = async (id: number | undefined) => {
  if (id && confirm('Delete this experience?')) {
    try {
      await store.deleteExperience(id)
    } catch (e) {
      alert('Delete failed')
    }
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex flex-col p-4 md:p-8 max-w-6xl mx-auto w-full">
    <div class="flex justify-between items-center mb-8 bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p class="text-slate-400">Authenticated as: <span class="text-emerald-400">{{ keycloak?.tokenParsed?.preferred_username }}</span></p>
      </div>
      <div class="flex gap-4">
        <button @click="router.push('/')" class="py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
          Back to Site
        </button>
        <button @click="handleLogout" class="py-2 px-4 bg-red-600/80 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
          Logout
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex space-x-4 mb-6 border-b border-slate-700 pb-2">
      <button @click="activeTab = 'projects'" :class="['px-4 py-2 font-medium rounded-t-lg transition-colors', activeTab === 'projects' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800']">
        Projects
      </button>
      <button @click="activeTab = 'experiences'" :class="['px-4 py-2 font-medium rounded-t-lg transition-colors', activeTab === 'experiences' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800']">
        Experiences
      </button>
    </div>

    <!-- Projects Section -->
    <div v-if="activeTab === 'projects'" class="space-y-8 animate-in fade-in">
      <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
        <h2 class="text-xl font-bold text-white mb-4">Add New Project</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input v-model="newProject.titleEn" placeholder="Title (EN)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          <input v-model="newProject.titleIt" placeholder="Title (IT)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          
          <textarea v-model="newProject.descriptionEn" placeholder="Description (EN)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-24"></textarea>
          <textarea v-model="newProject.descriptionIt" placeholder="Description (IT)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-24"></textarea>
          
          <input v-model="newProject.imageUrl" placeholder="Image URL e.g. /img/portfolio.png" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          <input v-model.number="newProject.orderIndex" type="number" placeholder="Order Index (0, 1, 2...)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          
          <input v-model="newProject.linkUrl" placeholder="Website Link URL (Optional)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          <input v-model="newProject.sourceUrl" placeholder="Source Code URL (Optional)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
        </div>
        <button @click="handleSaveProject" class="mt-4 py-2 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors">
          Save Project
        </button>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <div v-for="p in store.projects" :key="p.id" class="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center group">
          <div>
            <h3 class="text-lg font-bold text-white">{{ p.titleEn }} / {{ p.titleIt }} <span class="text-xs ml-2 bg-slate-700 px-2 py-1 rounded">Order: {{ p.orderIndex }}</span></h3>
            <p class="text-sm text-slate-400 mt-1 truncate max-w-2xl">{{ p.descriptionEn }}</p>
          </div>
          <button @click="handleDeleteProject(p.id)" class="text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 px-3 py-1.5 rounded-lg transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Experiences Section -->
    <div v-if="activeTab === 'experiences'" class="space-y-8 animate-in fade-in">
      <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
        <h2 class="text-xl font-bold text-white mb-4">Add New Experience</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input v-model="newExperience.titleEn" placeholder="Job Title (EN)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          <input v-model="newExperience.titleIt" placeholder="Job Title (IT)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          
          <input v-model="newExperience.company" placeholder="Company Name" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          <input v-model.number="newExperience.orderIndex" type="number" placeholder="Order Index (0, 1, 2...)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />

          <input v-model="newExperience.periodEn" placeholder="Period (EN) e.g. Jan 2021 - Present" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          <input v-model="newExperience.periodIt" placeholder="Period (IT) e.g. Gen 2021 - Presente" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          
          <textarea v-model="newExperience.descriptionEn" placeholder="Description (EN)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-24"></textarea>
          <textarea v-model="newExperience.descriptionIt" placeholder="Description (IT)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-24"></textarea>
        </div>
        <button @click="handleSaveExperience" class="mt-4 py-2 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors">
          Save Experience
        </button>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <div v-for="e in store.experiences" :key="e.id" class="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center group">
          <div>
            <h3 class="text-lg font-bold text-white">{{ e.titleEn }} at {{ e.company }} <span class="text-xs ml-2 bg-slate-700 px-2 py-1 rounded">Order: {{ e.orderIndex }}</span></h3>
            <p class="text-sm text-slate-400 mt-1 truncate max-w-2xl">{{ e.descriptionEn }}</p>
          </div>
          <button @click="handleDeleteExperience(e.id)" class="text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 px-3 py-1.5 rounded-lg transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
