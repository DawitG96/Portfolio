<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'
import type { Project, Experience, Education } from '../stores/portfolio'
import { keycloak } from '../services/keycloak'
import { useRouter } from 'vue-router'

const store = usePortfolioStore()
const router = useRouter()

const activeTab = ref<'projects' | 'experiences' | 'educations'>('projects')

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

const newEducation = ref<Education>({
  school: '',
  orderIndex: 0,
  degreeEn: '',
  periodEn: '',
  descriptionEn: '',
  degreeIt: '',
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
    newProject.value = {
      imageUrl: '', linkUrl: '', sourceUrl: '', orderIndex: store.projects.length + 1,
      titleEn: '', descriptionEn: '', titleIt: '', descriptionIt: ''
    }
  } catch (e) {
    alert('Failed to save project')
  }
}

const handleEditProject = (p: Project) => {
  newProject.value = { ...p }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelEditProject = () => {
  newProject.value = {
    imageUrl: '', linkUrl: '', sourceUrl: '', orderIndex: store.projects.length + 1,
    titleEn: '', descriptionEn: '', titleIt: '', descriptionIt: ''
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

const handleEditExperience = (e: Experience) => {
  newExperience.value = { ...e }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelEditExperience = () => {
  newExperience.value = {
    company: '', orderIndex: store.experiences.length + 1,
    titleEn: '', periodEn: '', descriptionEn: '',
    titleIt: '', periodIt: '', descriptionIt: ''
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

const handleSaveEducation = async () => {
  try {
    await store.saveEducation({ ...newEducation.value })
    newEducation.value = {
      school: '', orderIndex: store.educations.length + 1,
      degreeEn: '', periodEn: '', descriptionEn: '',
      degreeIt: '', periodIt: '', descriptionIt: ''
    }
  } catch (e) {
    alert('Failed to save education')
  }
}

const handleEditEducation = (e: Education) => {
  newEducation.value = { ...e }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelEditEducation = () => {
  newEducation.value = {
    school: '', orderIndex: store.educations.length + 1,
    degreeEn: '', periodEn: '', descriptionEn: '',
    degreeIt: '', periodIt: '', descriptionIt: ''
  }
}

const handleDeleteEducation = async (id: number | undefined) => {
  if (id && confirm('Delete this education?')) {
    try {
      await store.deleteEducation(id)
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
        <button @click="router.push('/')" aria-label="Back to Site" class="py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none">
          Back to Site
        </button>
        <button @click="handleLogout" aria-label="Logout" class="py-2 px-4 bg-red-600/80 hover:bg-red-600 text-white rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none">
          Logout
        </button>
      </div>
    </div>


    <div class="flex space-x-4 mb-6 border-b border-slate-700 pb-2">
      <button @click="activeTab = 'projects'" aria-label="Projects tab" :class="['px-4 py-2 font-medium rounded-t-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none', activeTab === 'projects' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800']">
        Projects
      </button>
      <button @click="activeTab = 'experiences'" aria-label="Experiences tab" :class="['px-4 py-2 font-medium rounded-t-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none', activeTab === 'experiences' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800']">
        Experiences
      </button>
      <button @click="activeTab = 'educations'" aria-label="Education tab" :class="['px-4 py-2 font-medium rounded-t-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none', activeTab === 'educations' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800']">
        Education
      </button>
    </div>


    <div v-if="activeTab === 'projects'" class="space-y-8 animate-in fade-in">
      <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
        <h2 class="text-xl font-bold text-white mb-4">Add New Project</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input v-model="newProject.titleEn" aria-label="Project Title EN" placeholder="Title (EN)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />
          <input v-model="newProject.titleIt" aria-label="Project Title IT" placeholder="Title (IT)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />
          
          <textarea v-model="newProject.descriptionEn" aria-label="Project Description EN" placeholder="Description (EN)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-24 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"></textarea>
          <textarea v-model="newProject.descriptionIt" aria-label="Project Description IT" placeholder="Description (IT)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-24 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"></textarea>
          
          <input v-model="newProject.imageUrl" aria-label="Project Image URL" placeholder="Image URL e.g. /img/portfolio.png" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />
          <input v-model.number="newProject.orderIndex" type="number" aria-label="Project Order Index" placeholder="Order Index (0, 1, 2...)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />
          
          <input v-model="newProject.linkUrl" aria-label="Project Link URL" placeholder="Website Link URL (Optional)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />
          <input v-model="newProject.sourceUrl" aria-label="Project Source URL" placeholder="Source Code URL (Optional)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />
        </div>
        <div class="flex gap-4">
          <button @click="handleSaveProject" :aria-label="newProject.id ? 'Update Project' : 'Save Project'" class="mt-4 py-2 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none">
            {{ newProject.id ? 'Update Project' : 'Save Project' }}
          </button>
          <button v-if="newProject.id" @click="cancelEditProject" aria-label="Cancel edit" class="mt-4 py-2 px-6 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none">
            Cancel
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <div v-for="p in store.projects" :key="p.id" class="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center group">
          <div>
            <h3 class="text-lg font-bold text-white">{{ p.titleEn }} / {{ p.titleIt }} <span class="text-xs ml-2 bg-slate-700 px-2 py-1 rounded">Order: {{ p.orderIndex }}</span></h3>
            <p class="text-sm text-slate-400 mt-1 truncate max-w-2xl">{{ p.descriptionEn }}</p>
          </div>
          <div class="flex gap-2">
            <button @click="handleEditProject(p)" :aria-label="'Edit project ' + p.titleEn" class="text-blue-400 hover:text-blue-300 bg-blue-400/10 hover:bg-blue-400/20 px-3 py-1.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none">
              Edit
            </button>
            <button @click="handleDeleteProject(p.id)" :aria-label="'Delete project ' + p.titleEn" class="text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 px-3 py-1.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>


    <div v-if="activeTab === 'experiences'" class="space-y-8 animate-in fade-in">
      <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
        <h2 class="text-xl font-bold text-white mb-4">Add New Experience</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input v-model="newExperience.titleEn" aria-label="Job Title EN" placeholder="Job Title (EN)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />
          <input v-model="newExperience.titleIt" aria-label="Job Title IT" placeholder="Job Title (IT)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />
          
          <input v-model="newExperience.company" aria-label="Company Name" placeholder="Company Name" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />
          <input v-model.number="newExperience.orderIndex" type="number" aria-label="Experience Order Index" placeholder="Order Index (0, 1, 2...)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />

          <input v-model="newExperience.periodEn" aria-label="Job Period EN" placeholder="Period (EN) e.g. Jan 2021 - Present" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />
          <input v-model="newExperience.periodIt" aria-label="Job Period IT" placeholder="Period (IT) e.g. Gen 2021 - Presente" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />
          
          <textarea v-model="newExperience.descriptionEn" aria-label="Job Description EN" placeholder="Description (EN)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-24 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"></textarea>
          <textarea v-model="newExperience.descriptionIt" aria-label="Job Description IT" placeholder="Description (IT)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-24 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"></textarea>
        </div>
        <div class="flex gap-4">
          <button @click="handleSaveExperience" :aria-label="newExperience.id ? 'Update Experience' : 'Save Experience'" class="mt-4 py-2 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none">
            {{ newExperience.id ? 'Update Experience' : 'Save Experience' }}
          </button>
          <button v-if="newExperience.id" @click="cancelEditExperience" aria-label="Cancel edit" class="mt-4 py-2 px-6 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none">
            Cancel
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <div v-for="e in store.experiences" :key="e.id" class="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center group">
          <div>
            <h3 class="text-lg font-bold text-white">{{ e.titleEn }} at {{ e.company }} <span class="text-xs ml-2 bg-slate-700 px-2 py-1 rounded">Order: {{ e.orderIndex }}</span></h3>
            <p class="text-sm text-slate-400 mt-1 truncate max-w-2xl">{{ e.descriptionEn }}</p>
          </div>
          <div class="flex gap-2">
            <button @click="handleEditExperience(e)" :aria-label="'Edit experience at ' + e.company" class="text-blue-400 hover:text-blue-300 bg-blue-400/10 hover:bg-blue-400/20 px-3 py-1.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none">
              Edit
            </button>
            <button @click="handleDeleteExperience(e.id)" :aria-label="'Delete experience at ' + e.company" class="text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 px-3 py-1.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>


    <div v-if="activeTab === 'educations'" class="space-y-8 animate-in fade-in">
      <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
        <h2 class="text-xl font-bold text-white mb-4">Add New Education</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input v-model="newEducation.degreeEn" aria-label="Degree EN" placeholder="Degree (EN)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />
          <input v-model="newEducation.degreeIt" aria-label="Degree IT" placeholder="Degree (IT)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />
          
          <input v-model="newEducation.school" aria-label="School/University Name" placeholder="School/University Name" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />
          <input v-model.number="newEducation.orderIndex" type="number" aria-label="Education Order Index" placeholder="Order Index (0, 1, 2...)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />

          <input v-model="newEducation.periodEn" aria-label="Education Period EN" placeholder="Period (EN) e.g. 2018 - 2021" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />
          <input v-model="newEducation.periodIt" aria-label="Education Period IT" placeholder="Period (IT) e.g. 2018 - 2021" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none" />
          
          <textarea v-model="newEducation.descriptionEn" aria-label="Education Description EN" placeholder="Description (EN)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-24 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"></textarea>
          <textarea v-model="newEducation.descriptionIt" aria-label="Education Description IT" placeholder="Description (IT)" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-24 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"></textarea>
        </div>
        <div class="flex gap-4">
          <button @click="handleSaveEducation" :aria-label="newEducation.id ? 'Update Education' : 'Save Education'" class="mt-4 py-2 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none">
            {{ newEducation.id ? 'Update Education' : 'Save Education' }}
          </button>
          <button v-if="newEducation.id" @click="cancelEditEducation" aria-label="Cancel edit" class="mt-4 py-2 px-6 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none">
            Cancel
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <div v-for="e in store.educations" :key="e.id" class="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center group">
          <div>
            <h3 class="text-lg font-bold text-white">{{ e.degreeEn }} at {{ e.school }} <span class="text-xs ml-2 bg-slate-700 px-2 py-1 rounded">Order: {{ e.orderIndex }}</span></h3>
            <p class="text-sm text-slate-400 mt-1 truncate max-w-2xl">{{ e.descriptionEn }}</p>
          </div>
          <div class="flex gap-2">
            <button @click="handleEditEducation(e)" :aria-label="'Edit education at ' + e.school" class="text-blue-400 hover:text-blue-300 bg-blue-400/10 hover:bg-blue-400/20 px-3 py-1.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none">
              Edit
            </button>
            <button @click="handleDeleteEducation(e.id)" :aria-label="'Delete education at ' + e.school" class="text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 px-3 py-1.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
