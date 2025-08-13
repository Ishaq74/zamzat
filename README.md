# Zamzat - Site Web Air Fryer 🍟

Site web dédié aux friteuses à air (air fryers) avec des recettes, des tests de produits, et des guides d'utilisation.

## À propos du projet

Zamzat est un site web conçu pour les amateurs de friteuses à air. Il propose :
- Des recettes optimisées pour air fryer
- Des tests et comparatifs de différents modèles
- Des guides d'utilisation et conseils
- Des avis d'utilisateurs
- Une galerie de photos de plats réalisés

Le site est construit avec Astro et utilise Supabase pour la gestion des données.

## ✨ Fonctionnalités

- ✅ Design responsive optimisé pour mobile
- ✅ Performance 100/100 Lighthouse
- ✅ SEO-friendly avec URLs canoniques et OpenGraph
- ✅ Support Sitemap et RSS Feed
- ✅ Support Markdown & MDX
- ✅ Collections de contenu structurées
- ✅ Intégration Supabase pour la gestion des profils utilisateurs
- ✅ Système de tags et catégories
- ✅ Galerie d'images intégrée

## 📊 État Actuel du Projet

### ✅ Ce qui fonctionne
- Structure Astro configurée correctement
- Collections de contenu définies (recettes, air fryers, avis, etc.)
- Configuration TypeScript
- Dépendances installées
- Système de contenu avec MDX
- **Build réussi** - Le projet se compile maintenant sans erreur
- **Serveur de développement** - Fonctionne sur localhost:4321
- **Collections de fallback** - Données d'exemple réalistes quand Supabase n'est pas disponible

### ⚠️ Ce qui fonctionne avec limitations
- Collections Supabase (profiles, reviews, likes, comments) - Utilisent maintenant des données de fallback réalistes
- API de rendu de composants - Temporairement désactivée

### 🚧 Ce qui manque
- Variables d'environnement Supabase pour les fonctionnalités dynamiques
- Données de démonstration pour les collections Supabase
- Tests automatisés (infrastructure en place)
- Configuration CI/CD
- Guide de contribution

## 📁 Structure du Projet

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Le répertoire `src/content/` contient les "collections" de documents Markdown et MDX organisées par type : recettes air fryer, fiches produits, avis, galerie photos, etc.

Astro recherche les fichiers `.astro` ou `.md` dans le répertoire `src/pages/`. Chaque page est exposée comme une route basée sur son nom de fichier.

Les composants Astro/React/Vue/Svelte/Preact sont placés dans `src/components/`.

Utilisez `getCollection()` pour récupérer le contenu et vérifiez votre frontmatter avec un schéma. Voir la [documentation Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) pour en savoir plus.

Les assets statiques, comme les images, peuvent être placés dans le répertoire `public/`.

## ⚙️ Installation et Configuration

### 1. Prérequis
- Node.js (version 18+ recommandée)
- npm ou pnpm

### 2. Installation des dépendances
```bash
npm install
```

### 3. Configuration Supabase (OPTIONNELLE)
Créez un fichier `.env` à la racine du projet avec les variables suivantes pour activer les fonctionnalités dynamiques :

```env
SUPABASE_URL=votre_url_supabase
SUPABASE_ANON_KEY=votre_cle_anonyme_supabase
```

**Note** : Le projet peut maintenant être buildé et développé sans Supabase. Les collections dynamiques (profiles, reviews, etc.) retourneront simplement des données vides.

## 🧞 Commandes

Toutes les commandes sont exécutées depuis la racine du projet, depuis un terminal :

| Commande                  | Action                                              |
| :------------------------ | :-------------------------------------------------- |
| `npm install`             | Installe les dépendances                            |
| `npm run dev`             | Lance le serveur de développement sur `localhost:4321` |
| `npm run build`           | Build le site de production dans `./dist/`         |
| `npm run preview`         | Prévisualise le build localement avant déploiement |
| `npm run test`            | Lance les tests avec Vitest                        |
| `npm run astro ...`       | Execute les commandes CLI comme `astro add`, `astro check` |
| `npm run astro -- --help` | Affiche l'aide de la CLI Astro                     |

## 📚 En savoir plus

- [Documentation Astro](https://docs.astro.build)
- [Serveur Discord Astro](https://astro.build/chat)
- [Documentation Supabase](https://supabase.com/docs)

## 🏗️ Développement

Le site est en cours de développement actif. Consultez le fichier `TASKS.md` pour voir la roadmap et les tâches en cours.

## 📄 Licence

Ce projet est basé sur le template [Bear Blog](https://github.com/HermanMartinus/bearblog/) d'Astro.
