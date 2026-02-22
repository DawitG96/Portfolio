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
      subtitle: ''
    },
    projects: {
      title: 'Projects',
      viewSite: 'Visit site',
      sourceCode: 'Source code',
      items: [
        {
          title: 'ifh-webapp',
          description: 'Angular app deployed on Firebase hosting — integrates Keycloak for authentication and Firebase for content storage; includes a lightweight CMS and dashboard.',
          image: '/img/ifh-webapp.png', // We'll resolve this in the component
          link: 'https://italian-family-hospitality.web.app/',
          source: '' // We can set empty if none
        },
        {
          title: 'Minefield',
          description: "Java development of the classic Microsoft game 'Minesweeper'.",
          image: '/img/minesweeper.png',
          link: '',
          source: 'https://github.com/DawitG96/Minefield'
        },
        {
          title: 'SeniorAssistant',
          description: 'Java development of a home station for the Smart City Challenge 2018 on a Raspberry Pi.',
          image: '/img/seniorstation.png',
          link: '',
          source: 'https://github.com/DawitG96/SeniorAssistant'
        },
        {
          title: 'SeniorAssistant Cloud',
          description: 'Web platform implemented using ASP.NET (academic / proof-of-concept).',
          image: '/img/seniorcloud.png',
          link: '',
          source: 'https://github.com/DawitG96/SeniorAssistant-Web'
        },
        {
          title: 'MyHome',
          description: 'A microservices backend in Java (Quarkus) and Angular micro-frontends for managing home, inventory, recipes, and tools.',
          image: '', // Can add placeholder later
          link: '',
          source: ''
        },
        {
          title: 'Trading Project',
          description: 'A platform to analyze trading strategies. Uses FastAPI for backend algorithms and Vue 3 for frontend insights.',
          image: '',
          link: '',
          source: ''
        }
      ]
    },
    experience: {
      title: 'Experience',
      present: 'Present',
      items: [
        {
          title: 'Software Engineer',
          company: 'Olivetti S.p.A.',
          period: 'Mar 2023 - Present',
          description: 'Engineering and maintaining a high-throughput data monetization platform. Working with Java/Spring Boot for backend, Apache Kafka for real-time streaming, Docker and Kubernetes (GKE) for deployments, CI/CD integrations via Bitbucket/Bamboo. Additionally contributing to frontend functionalities in Angular.'
        },
        {
          title: 'FrontEnd Developer',
          company: 'Alten Italia',
          period: 'May 2021 - Mar 2023',
          description: 'Worked as a consultant modernizing client-facing web applications: implemented responsive UIs, interactive components, and improved frontend performance for banking clients.'
        }
      ]
    },
    education: {
      title: 'Education',
      degree: 'MSc in Smart Product Design 4.0 — Politecnico di Torino (Summa Cum Laude)',
      note: '',
      skills: {
        c: 'Proficient in C (data structures, threads & synchronization).',
        java: 'Strong command of Java; projects include Minesweeper, a simple compiler and a Raspberry Pi application.',
        csharp: 'Basic knowledge of C# / ASP.NET (MVC).',
        python: 'Python for ML experiments.',
        tools: 'Linux shell, Git, Docker, Kubernetes.'
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
      subtitle: ''
    },
    projects: {
      title: 'Progetti',
      viewSite: 'Visita il sito',
      sourceCode: 'Codice sorgente',
      items: [
        {
          title: 'ifh-webapp',
          description: 'Web app in Angular pubblicata su Firebase Hosting. Integra Keycloak per l\'autenticazione, Firebase per lo storage e Firestore, include un CMS per la gestione dinamica del sito.',
          image: '/img/ifh-webapp.png',
          link: 'https://italian-family-hospitality.web.app/',
          source: ''
        },
        {
          title: 'Minefield',
          description: 'Sviluppo in Java del classico gioco Microsoft "Prato fiorito".',
          image: '/img/minesweeper.png',
          link: '',
          source: 'https://github.com/DawitG96/Minefield'
        },
        {
          title: 'SeniorAssistant',
          description: 'Sviluppo in Java di una home station per la Smart City Challenge 2018 su dispositivo Raspberry Pi.',
          image: '/img/seniorstation.png',
          link: '',
          source: 'https://github.com/DawitG96/SeniorAssistant'
        },
        {
          title: 'SeniorAssistant Cloud',
          description: 'Piattaforma web implementata con ASP.NET (progetto universitario / proof-of-concept).',
          image: '/img/seniorcloud.png',
          link: '',
          source: 'https://github.com/DawitG96/SeniorAssistant-Web'
        },
        {
          title: 'MyHome',
          description: 'Architettura a microservizi backend in Java (Quarkus) e micro-frontend Angular (Module Federation) per la gestione della casa, inventario e ricette.',
          image: '',
          link: '',
          source: ''
        },
        {
          title: 'Trading Project',
          description: 'Sistema per l\'analisi automatica di logiche di trading. Combina un backend FastAPI con un frontend in Vue 3.',
          image: '',
          link: '',
          source: ''
        }
      ]
    },
    experience: {
      title: 'Esperienza',
      present: 'Presente',
      items: [
        {
          title: 'Software Engineer',
          company: 'Olivetti S.p.A.',
          period: 'Mar 2023 - Presente',
          description: 'Progettazione e manutenzione di una piattaforma ad alto throughput per la monetizzazione dati. Backend in Java/Spring Boot, streaming con Apache Kafka, deploy con Docker e Kubernetes (GKE) integrato via Bitbucket/Bamboo. Contributi anche in ambito frontend con Angular.'
        },
        {
          title: 'FrontEnd Developer',
          company: 'Alten Italia',
          period: 'Mag 2021 - Mar 2023',
          description: 'Attività di consulenza per l\'ammodernamento di applicazioni web orientate al cliente in campo bancario. Implementate interfacce responsive e ottimizzata la resa grafica complessiva.'
        }
      ]
    },
    education: {
      title: 'Formazione',
      degree: 'Laurea Magistrale in Smart Product Design 4.0 — Politecnico di Torino (Summa Cum Laude)',
      note: '',
      skills: {
        c: 'Competente in C (strutture dati, thread e sincronizzazione).',
        java: 'Ottima padronanza di Java; i progetti includono Campo Minato, un compilatore e una app per Raspberry Pi.',
        csharp: 'Conoscenze base di C# / ASP.NET (MVC).',
        python: 'Python per progetti accademici legati al ML.',
        tools: 'Esperienza pratica con Linux shell, Git, Docker, Kubernetes.'
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
