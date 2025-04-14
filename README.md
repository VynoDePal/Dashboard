# Vite + React + TypeScript Starter

Un starter moderne pour applications React avec TypeScript, Vite et Tailwind CSS.

## Fonctionnalités

- ⚡ Vite pour un développement ultra-rapide
- 🏗️ Configuration TypeScript prête à l'emploi
- 🎨 Tailwind CSS pour le styling
- ✅ ESLint pour la qualité du code
- 🛣️ React Router pour la navigation
- 📊 Recharts pour les visualisations de données
- 🧩 dnd-kit pour le drag-and-drop

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
│   ├── components/       # Composants organisés par fonctionnalité
│   │   ├── analytics/    # Composants d'analytics
│   │   ├── calendar/     # Composants de calendrier
│   │   ├── chat/         # Composants de chat
│   │   ├── layout/       # Composants de mise en page
│   │   └── ui/           # Composants génériques
│   ├── context/          # Contextes React
│   │   └── ThemeContext.tsx
│   ├── guards/           # Protection des routes
│   │   └── AuthGuard.tsx
│   ├── hooks/            # Hooks personnalisés
│   │   ├── useFocusTrap.ts
│   │   └── useToast.tsx
│   ├── pages/            # Pages de l'application
│   │   ├── Dashboard.tsx
│   │   ├── Analytics.tsx
│   │   └── ErrorPage.tsx
│   ├── types/            # Types TypeScript
│   │   ├── user.ts
│   │   ├── task.ts
│   │   └── project.ts
│   └── utils/            # Utilitaires et mock data
│       ├── GetWidgetConfig.tsx
│       └── mock*.ts
├── index.html            # Point d'entrée HTML
├── vite.config.ts        # Configuration Vite
├── tailwind.config.js    # Configuration Tailwind
├── tsconfig.json         # Configuration TypeScript
└── package.json          # Dépendances et scripts
```

## Architecture des composants

L'application est organisée en composants spécialisés par fonctionnalité :

### Fonctionnalités principales

- **Analytics** : Tableaux de bord et visualisations
  - KPIStatCard : Affichage des indicateurs clés
  - PerformanceTable : Tableau de performances détaillé

- **Calendar** : Gestion d'événements
  - CalendarGrid : Grille interactive
  - EventForm : Création/modification d'événements

- **Chat** : Messagerie instantanée
  - ChatWindow : Fenêtre de discussion
  - ConversationsList : Liste des conversations

- **Email** : Client email
  - EmailViewer : Visualisation des emails
  - NewEmailModal : Création de nouveaux emails

### Composants génériques

- **UI** : Composants réutilisables
- **Layout** : Structure de l'application
  - DashboardLayout : Structure principale
  - Sidebar : Navigation latérale

### Bonnes pratiques

- Structure modulaire
- Taille raisonnable des composants
- Nommage clair et cohérent
- Séparation des responsabilités

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