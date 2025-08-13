import { glob, file } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';

// Const For the Website Settings

const organizations = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/organizations" }),
  schema: z.object({
    // Éléments existants
    name: z.string(), // Obligatoire
    alternateName: z.array(z.string()).optional(),
    description: z.string().optional(),
    url: z.string().optional(),
    logo: z.string().optional(),
    image: z.string().optional(),
    email: z.string().email().optional(),
    telephone: z.string().optional(),
    faxNumber: z.string().optional(),
    address: z.object({
      streetAddress: z.string(),
      addressLocality: z.string(),
      addressRegion: z.string().optional(),
      postalCode: z.string(),
      addressCountry: z.string(),
    }).optional(),
    contactPoint: z.array(z.object({
      contactType: z.string(),
      telephone: z.string().optional(),
      email: z.string().email().optional(),
      hoursAvailable: z.string().optional(),
    })).optional(),
    founder: z.string().or(z.array(z.string())).optional(),
    foundingDate: z.string().datetime().optional(),
    foundingLocation: z.string().optional(),
    legalName: z.string().optional(),
    taxID: z.string().optional(),
    vatID: z.string().optional(),
    leiCode: z.string().optional(),
    duns: z.string().optional(),
    isicV4: z.string().optional(),
    naics: z.string().optional(),
    numberOfEmployees: z.number().optional(),
    employee: z.array(z.string()).optional(),
    parentOrganization: z.string().optional(),
    subOrganization: z.array(z.string()).optional(),
    department: z.array(z.string()).optional(),
    owns: z.array(z.string()).optional(),
    brand: z.array(z.string()).optional(),
    makesOffer: z.array(z.string()).optional(),
    seeks: z.array(z.string()).optional(),
    areaServed: z.array(z.string()).optional(),
    award: z.array(z.string()).optional(),
    knowsLanguage: z.array(z.string()).optional(),
    memberOf: z.array(z.string()).optional(),
    sameAs: z.array(z.string().url()).optional(),
    publishingPrinciples: z.string().url().optional(),
    actionableFeedbackPolicy: z.string().url().optional(),
    correctionsPolicy: z.string().url().optional(),
    diversityPolicy: z.string().url().optional(),
    ethicsPolicy: z.string().url().optional(),
    masthead: z.string().url().optional(),
    missionCoveragePrioritiesPolicy: z.string().url().optional(),
    noBylines: z.string().url().optional(),
    ownershipFundingInfo: z.string().url().optional(),
    unnamedSourcesPolicy: z.string().url().optional(),
    verificationFactCheckingPolicy: z.string().url().optional(),
    diversityStaffingReport: z.string().url().optional(),
    slogan: z.string().optional(),
    interactionStatistic: z.array(z.object({
      interactionType: z.string(),
      userInteractionCount: z.number(),
    })).optional(),
    keywords: z.string().optional(),
    knowsAbout: z.array(z.string()).optional(),
    nonprofitStatus: z.string().optional(),
    review: z.array(z.string()).optional(),
    serviceArea: z.array(z.string()).optional(),
    hasOfferCatalog: z.array(z.string()).optional(),
    aggregateRating: z.object({
      ratingValue: z.number(),
      bestRating: z.number(),
      worstRating: z.number(),
      ratingCount: z.number(),
    }).optional(),
    event: z.array(z.string()).optional(),
    alumni: z.array(z.string()).optional(),
    hasCredential: z.array(z.string()).optional(),
  }),
});

// File-based collections (these work without Supabase)
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const blogCategories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blogCategories" }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/authors" }),
  schema: z.object({
    name: z.string(),
    avatar: z.string().optional(),
    bio: z.string().optional(),
    social: z.array(z.object({
      platform: z.string(),
      url: z.string().url(),
    })).optional(),
  }),
});

const recipes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/recipes" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    title: z.string().optional(), // Optional for backward compatibility
    description: z.string(),
    image: z.string().optional(),
    prepTime: z.string(),
    cookTime: z.string(),
    totalTime: z.string().optional(),
    recipeYield: z.string().optional(),
    servings: z.number().optional(), // Optional, can be derived from recipeYield
    difficulty: z.enum(['facile', 'moyen', 'difficile']).optional(),
    ingredients: z.array(z.string()),
    instructions: z.string(), // Keep as string to match existing content
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    nutrition: z.string().optional(),
    priceRange: z.string().optional(),
    cuisineType: z.string().optional(),
    mealType: z.string().optional(),
    dietType: z.string().optional(),
    featured: z.boolean().optional(),
    reviews: z.array(z.string()).default([]),
    gallery: z.array(z.string()).default([]),
  }),
});

const recipeCategories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/recipeCategories" }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

const airfryers = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/airfryers" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    brand: z.string(),
    category: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    currency: z.string().optional(),
    availability: z.string().optional(),
    rating: z.number().optional(),
    reviewCount: z.number().optional(),
    image: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    capacity: z.string().optional(),
    wattage: z.string().optional(),
    voltage: z.string().optional(),
    dimensions: z.string().optional(),
    weight: z.string().optional(),
    color: z.string().optional(),
    material: z.string().optional(),
    noiseLevel: z.string().optional(),
    features: z.array(z.string()).default([]),
    presets: z.array(z.string()).default([]),
    temperatureRange: z.string().optional(),
    timer: z.string().optional(),
    autoShutOff: z.boolean().optional(),
    dishwasherSafeParts: z.boolean().optional(),
    energyEfficiency: z.string().optional(),
    pricePerLitre: z.number().optional(),
    warranty: z.string().optional(),
    accessoriesIncluded: z.array(z.string()).default([]),
    compatibleAccessories: z.array(z.string()).default([]),
    modelNumber: z.string().optional(),
    ean: z.string().optional(),
    upc: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    lastUpdated: z.coerce.date().optional(),
  }),
});

const ingredients = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/ingredients" }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    nutritionFacts: z.object({
      calories: z.number().optional(),
      protein: z.number().optional(),
      carbs: z.number().optional(),
      fat: z.number().optional(),
    }).optional(),
  }),
});

const tags = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/tags" }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/gallery" }),
  schema: z.object({
    images: z.array(z.string()).default([]),
    caption: z.string().optional(),
    imageOrder: z.number().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    alt: z.string().optional(),
    recipe: z.string().optional(), // Reference to recipe
    photographer: z.string().optional(),
    date: z.coerce.date().optional(),
  }),
});

const productCategories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/productCategories" }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

// Collections Supabase temporairement désactivées (retournent des données vides)
// Ces collections seront réactivées une fois Supabase configuré

const profiles = defineCollection({
  schema: z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string().optional(),
    city: z.string().optional(),
    bio: z.string().optional(),
    user_id: z.string().optional(),
  }),
  loader: async () => {
    console.warn('Collection profiles désactivée - Supabase requis');
    return [];
  }
});

const reviews = defineCollection({
  schema: z.object({
    id: z.string(),
    rating: z.number(),
    comment: z.string(),
    productId: z.string(),
    userId: z.string(),
    createdAt: z.string(),
  }),
  loader: async () => {
    console.warn('Collection reviews désactivée - Supabase requis');
    return [];
  }
});

const likes = defineCollection({
  schema: z.object({
    id: z.string(),
    userId: z.string(),
    itemId: z.string(),
    itemType: z.string(),
  }),
  loader: async () => {
    console.warn('Collection likes désactivée - Supabase requis');
    return [];
  }
});

const comments = defineCollection({
  schema: z.object({
    id: z.string(),
    content: z.string(),
    userId: z.string(),
    itemId: z.string(),
    itemType: z.string(),
    createdAt: z.string(),
  }),
  loader: async () => {
    console.warn('Collection comments désactivée - Supabase requis');
    return [];
  }
});

// Exporter les collections
export const collections = {
  organizations,
  blog,
  blogCategories, 
  authors,
  recipes,
  recipeCategories,
  airfryers,
  ingredients,
  tags,
  gallery,
  productCategories,
  // Collections Supabase (temporairement vides)
  profiles,
  reviews,
  likes,
  comments,
};