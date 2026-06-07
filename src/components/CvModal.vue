<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { Download, X } from 'lucide-vue-next'

const { t } = useI18n()
const emit = defineEmits<{ close: [] }>()

const modalRef = ref<HTMLElement | null>(null)
const downloading = ref<string | null>(null)
const error = ref<string | null>(null)

async function downloadCv(lang: 'it' | 'en') {
  if (downloading.value) return
  error.value = null
  downloading.value = lang
  try {
    const base = import.meta.env.VITE_API_URL ?? '/portfolio/api'
    const res = await fetch(`${base}/cv/download?lang=${lang}`)
    if (res.status === 429) { error.value = t('cv.rateLimitError'); return }
    if (!res.ok) { error.value = t('cv.downloadError'); return }
    const url = URL.createObjectURL(await res.blob())
    const a = document.createElement('a')
    a.href = url
    a.download = `dawit_gulino_cv_${lang}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  } catch {
    error.value = t('cv.downloadError')
  } finally {
    downloading.value = null
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') { emit('close'); return }
  if (e.key !== 'Tab') return
  const focusable = Array.from(
    modalRef.value?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])'
    ) ?? []
  )
  if (!focusable.length) return
  const first = focusable[0]!
  const last = focusable[focusable.length - 1]!
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
}

onMounted(async () => {
  document.addEventListener('keydown', onKeydown)
  await nextTick()
  modalRef.value?.querySelector<HTMLElement>('button')?.focus()
})
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center" @click.self="$emit('close')">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" @click="$emit('close')"></div>

    <div
      ref="modalRef"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      class="relative bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-8 w-full max-w-sm mx-4"
    >
      <button
        @click="$emit('close')"
        :aria-label="t('cv.close')"
        class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none rounded-sm p-1"
      >
        <X class="w-5 h-5" aria-hidden="true" />
      </button>

      <h2 id="cv-modal-title" class="text-lg font-semibold text-white mb-1">
        {{ t('cv.modalTitle') }}
      </h2>
      <p class="text-slate-400 text-sm mb-6">{{ t('cv.modalSubtitle') }}</p>

      <div class="flex gap-3">
        <button
          @click="downloadCv('it')"
          :disabled="!!downloading"
          :aria-label="t('cv.downloadAriaIt')"
          :aria-busy="downloading === 'it'"
          class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
        >
          <Download class="w-4 h-4" aria-hidden="true" />
          IT
        </button>

        <button
          @click="downloadCv('en')"
          :disabled="!!downloading"
          :aria-label="t('cv.downloadAriaEn')"
          :aria-busy="downloading === 'en'"
          class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
        >
          <Download class="w-4 h-4" aria-hidden="true" />
          EN
        </button>
      </div>

      <p v-if="error" role="alert" class="mt-4 text-red-400 text-sm text-center">{{ error }}</p>
    </div>
  </div>
</template>
