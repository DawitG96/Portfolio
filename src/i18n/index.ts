import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      projects: 'Projects',
      experience: 'Experience',
      education: 'Education',
      admin: 'Admin'
    },
    hero: {
      title: 'Full Stack Engineer',
      subtitle: 'Building scalable applications and delightful web experiences.'
    },
    projects: {
      title: 'Projects',
      viewSite: 'Visit site',
      sourceCode: 'Source code'
    },
    experience: {
      title: 'Experience',
      present: 'Present'
    },
    education: {
      title: 'Education',
      degree: 'MSc in Smart Product Design 4.0 — Politecnico di Torino (Summa Cum Laude)',
      note: 'Note: this site and some related services (Keycloak) are deployed on a home Kubernetes cluster.',
      skills: {
        c: 'Proficient in C (data structures, threads & synchronization)',
        java: 'Strong command of Java; projects include Minesweeper, a simple compiler and a Raspberry Pi application',
        csharp: 'Basic C# / ASP.NET (MVC)',
        python: 'Python for ML experiments',
        tools: 'Linux shell, Git, Docker, Kubernetes'
      }
    },
    footer: {
      copyright: 'Copyright © Dawit Gulino {year}'
    }
  },
  it: {
    nav: {
      projects: 'Progetti',
      experience: 'Esperienza',
      education: 'Formazione',
      admin: 'Admin'
    },
    hero: {
      title: 'Ingegnere Full Stack',
      subtitle: 'Sviluppo applicazioni scalabili e interfacce web accattivanti.'
    },
    projects: {
      title: 'Progetti',
      viewSite: 'Visita il sito',
      sourceCode: 'Codice sorgente'
    },
    experience: {
      title: 'Esperienza',
      present: 'Presente'
    },
    education: {
      title: 'Formazione',
      degree: 'Laurea Magistrale in Smart Product Design 4.0 — Politecnico di Torino (Summa Cum Laude)',
      note: 'Nota: questo sito e alcuni servizi correlati (Keycloak) sono distribuiti in un cluster Kubernetes domestico.',
      skills: {
        c: 'Competente in C (strutture dati, thread e sincronizzazione)',
        java: 'Ottima padronanza di Java; i progetti includono Campo Minato, un compilatore e una app Raspberry Pi',
        csharp: 'Conoscenze base di C# / ASP.NET (MVC)',
        python: 'Python per progetti ML',
        tools: 'Linux shell, Git, Docker, Kubernetes'
      }
    },
    footer: {
      copyright: 'Copyright © Dawit Gulino {year}'
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'en', // default locale
  fallbackLocale: 'it',
  messages,
})
