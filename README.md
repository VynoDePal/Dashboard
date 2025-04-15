# Vite + React + TypeScript Starter

Un starter moderne pour applications React avec TypeScript, Vite et Tailwind CSS.

## Fonctionnalités

- ⚡ Vite pour un développement ultra-rapide
- 🏗️ Configuration TypeScript stricte et prête à l'emploi
- 🎨 Tailwind CSS pour un styling utility-first
- ✅ ESLint pour la qualité du code
- 🛣️ React Router pour la navigation
- 📊 Recharts pour les visualisations de données
- 🧩 dnd-kit pour le drag-and-drop
- 🔒 Context API et Guards pour la gestion de l'état global et la sécurité
- 🧩 Hooks personnalisés pour la logique réutilisable
- 🧪 Mock data pour faciliter le prototypage et les tests

## Technologies

- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS 3
- React Router 6

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Build pour production
- `npm run lint` - Vérifie la qualité du code
- `npm run preview` - Prévisualise le build de production

## Structure détaillée

```
.
├── src/
│   ├── components/       # Composants organisés par domaine métier ou fonctionnalité
│   │   ├── analytics/    # Composants d'analytics (KPIStatCard, PerformanceTable...)
│   │   ├── calendar/     # Composants de calendrier (CalendarGrid, EventForm...)
│   │   ├── chat/         # Composants de chat (ChatWindow, ConversationsList...)
│   │   ├── email/        # Composants d'email (EmailViewer, NewEmailModal...)
│   │   ├── feed/         # Flux d'activité
│   │   ├── layout/       # Structure globale (DashboardLayout, Sidebar...)
│   │   ├── notes/        # Prise de notes
│   │   ├── notifications/# Notifications (toasts, badges...)
│   │   ├── payments/     # Paiements
│   │   ├── projects/     # Gestion de projets
│   │   ├── settings/     # Paramètres
│   │   ├── tasks/        # Gestion des tâches
│   │   ├── users/        # Gestion des utilisateurs
│   │   ├── widgets/      # Mini-composants autonomes
│   │   └── ui/           # Composants UI génériques réutilisables
│   ├── context/          # Contextes React (ThemeContext...)
│   ├── guards/           # Protection des routes (AuthGuard...)
│   ├── hooks/            # Hooks personnalisés (useFocusTrap, useToast...)
│   ├── pages/            # Pages principales de l'application (Dashboard, Analytics, Calendar, Chat, Email, ErrorPage, etc.)
│   ├── types/            # Types TypeScript centralisés par domaine (user, task, project, etc.)
│   └── utils/            # Fonctions utilitaires et mock data (GetWidgetConfig, mockAnalyticsData, etc.)
├── index.html            # Point d'entrée HTML
├── vite.config.ts        # Configuration Vite
├── tailwind.config.js    # Configuration Tailwind
├── tsconfig.json         # Configuration TypeScript
└── package.json          # Dépendances et scripts
```

## Architecture et bonnes pratiques

- **Component-driven** : Composants spécialisés par domaine, UI génériques dans `ui/`, layouts partagés dans `layout/`.
- **Context API & Guards** : Gestion de l'état global (ex : thème) et sécurisation des routes (AuthGuard).
- **Hooks personnalisés** : Extraction de logique réutilisable (`useFocusTrap`, `useToast`, etc.).
- **Types centralisés** : Tous les types et interfaces sont regroupés par domaine dans `types/` pour robustesse et maintenabilité.
- **Utils & Mock data** : Fonctions utilitaires et données de test pour faciliter le développement et les tests sans backend.
- **Pages** : Chaque page correspond à une vue métier principale, orchestrant composants, hooks et contextes.
- **Séparation stricte des responsabilités** : Logique métier, UI, typage, utilitaires et navigation sont découplés.
- **Conventions** :
  - PascalCase pour les composants/pages/types
  - kebab-case pour les dossiers/fichiers
  - camelCase pour les fonctions, hooks, props
- **Scalabilité** : L’architecture permet d’ajouter facilement de nouvelles features, pages ou domaines.

## Installation

1. Cloner le dépôt
2. `npm install`
3. `npm run dev`

## Dépendances principales

- react, react-dom
- react-router-dom
- recharts
- @dnd-kit/core
- date-fns
- clsx

## Dépendances de développement

- @vitejs/plugin-react
- typescript
- eslint
- tailwindcss
- postcss