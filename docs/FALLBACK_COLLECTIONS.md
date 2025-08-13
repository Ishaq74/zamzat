# Fallback Content Collections

Ce document décrit le système de collections de fallback pour Supabase dans le projet Zamzat.

## Vue d'ensemble

Le système de fallback permet au site de fonctionner avec des données d'exemple significatives même lorsque Supabase n'est pas disponible ou configuré. Au lieu d'afficher des états vides, le site montre du contenu de démonstration réaliste.

## Collections avec fallback

Les collections suivantes ont un système de fallback :

- **profiles** - Profils utilisateurs avec noms, villes, bios
- **reviews** - Avis produits avec notes et commentaires
- **likes** - J'aime sur recettes et produits  
- **comments** - Commentaires sur différents éléments

## Structure des fichiers

```
src/content/fallback/
├── profiles.json     # 5 profils d'exemple
├── reviews.json      # 7 avis produits
├── likes.json        # 10 likes sur recettes/produits
└── comments.json     # 8 commentaires d'exemple
```

## Comment ça fonctionne

1. **Détection automatique** - Le service vérifie si Supabase est configuré
2. **Fallback transparent** - Si Supabase n'est pas disponible, charge les données JSON locales
3. **Cache intelligent** - Les données sont mises en cache pour de meilleures performances
4. **Compatibilité complète** - Les schémas de fallback correspondent exactement aux schémas Supabase

## Utilisation

Les collections fonctionnent exactement comme les collections Astro normales :

```astro
---
import { getCollection } from 'astro:content';

// Récupère les données (Supabase ou fallback automatiquement)
const profiles = await getCollection('profiles');
const reviews = await getCollection('reviews');
---

<div>
  {profiles.map(profile => (
    <div>{profile.data.name}</div>
  ))}
</div>
```

## Configuration Supabase

Pour activer Supabase, configurez les variables d'environnement dans `.env` :

```env
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_ANON_KEY=votre_cle_anonyme
```

## Messages de log

- ✅ `Loaded X fallback items for collection: profiles` - Fallback chargé avec succès
- ⚠️ `Supabase non configuré - client mock utilisé` - Mode fallback actif
- ℹ️ `Loaded X items from Supabase for collection: profiles` - Supabase fonctionnel

## Tests

Le système de fallback est testé automatiquement :

```bash
npm run test
```

Les tests vérifient :
- Chargement correct des données de fallback
- Structure des données conforme aux schémas
- Mise en cache fonctionnelle
- Gestion des erreurs

## Ajout de nouvelles collections

Pour ajouter une nouvelle collection avec fallback :

1. Créer le fichier JSON dans `src/content/fallback/`
2. Définir le schéma dans `src/content.config.ts`
3. Utiliser `FallbackContentService.getCollectionData()`
4. Ajouter des tests appropriés

## Avantages

- **Développement sans dépendance** - Pas besoin de Supabase pour développer
- **Démo réaliste** - Contenu significatif au lieu d'états vides
- **Performance** - Cache et chargement optimisés
- **Maintenabilité** - Code propre et bien structuré
- **Compatibilité** - Transition transparente vers Supabase