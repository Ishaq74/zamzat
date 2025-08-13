import { glob, file } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';
import { createClient } from '@supabase/supabase-js';


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
    sameAs: z.array(z.string()).optional(),
    identifier: z.string().optional(),
    slogan: z.string().optional(),
    awards: z.array(z.string()).optional(),
    dissolutionDate: z.string().datetime().optional(),
    memberOf: z.array(z.string()).optional(),
    openingHours: z.array(z.string()).optional(),
    openingHoursSpecification: z.array(z.object({
      dayOfWeek: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
      opens: z.string(),
      closes: z.string(),
    })).optional(),
    geo: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }).optional(),
    priceRange: z.string().optional(),
    servesCuisine: z.string().optional(),
    currenciesAccepted: z.array(z.string()).optional(),
    paymentAccepted: z.array(z.string()).optional(),
    branchCode: z.string().optional(),
    hasMap: z.string().optional(),
    areaServed: z.string().or(z.array(z.string())).optional(),
    aggregateRating: z.object({
      ratingValue: z.number(),
      reviewCount: z.number(),
    }).optional(),
    review: z.array(z.object({
      author: z.string(),
      reviewBody: z.string(),
      reviewRating: z.number().optional(),
    })).optional(),
    menu: z.string().optional(),
    acceptsReservations: z.boolean().optional(),
    branchOf: z.string().optional(),

    // Nouveaux éléments ajoutés
    services: z.array(z.string()).optional(), // Soins visage, Soins corps, etc.
    defaultTitle: z.string().optional(), // Titre par défaut pour les métadonnées
    defaultDescription: z.string().optional(), // Description par défaut pour les métadonnées
    defaultKeywords: z.string().optional(), // Mots-clés par défaut pour les métadonnées
    defaultAuthor: z.string().optional(), // Auteur par défaut pour les métadonnées
    defaultAddress: z.string().optional(), // Adresse par défaut pour les métadonnées
    defaultEmail: z.string().email().optional(), // Email par défaut pour les métadonnées
    defaultPhone: z.string().optional(), // Téléphone par défaut pour les métadonnées
    googleMaps: z.string().optional(), // Lien vers Google Maps
    imageMaps: z.string().optional(), // Image de la carte
    siteDev: z.string().optional(), // Développeur du site
    siteDevUrl: z.string().optional(), // URL du développeur du site
    siteDevEmail: z.string().email().optional(), // Email du développeur du site
    siteHostName: z.string().optional(), // Nom de l'hébergeur du site
    siteHostAddress: z.string().optional(), // Adresse de l'hébergeur du site
    siteHoststring: z.string().optional(), // string de l'hébergeur du site
    siteHostContact: z.string().optional(), // Contact de l'hébergeur du site
    siteMediateurName: z.string().optional(), // Nom du médiateur du site
    siteMediateurAdresse: z.string().optional(), // Adresse du médiateur du site
    siteMediateurUrl: z.string().optional(), // URL du médiateur du site
    siteMediateurContact: z.string().optional(), // Contact du médiateur du site
    defaultLang: z.string().optional(), // Langue par défaut du site
    siteUrl: z.string().optional(), // URL du site
    defaultOgImage: z.string().optional(), // Image par défaut pour les réseaux sociaux
    defaultCanonicalUrl: z.string().optional(), // URL canonique par défaut
    defaultPrefetchUrls: z.array(z.string()).optional(), // URLs à précharger par défaut
    defaultCssFiles: z.array(z.string()).optional(), // Fichiers CSS par défaut
    defaultJsFiles: z.array(z.string()).optional(), // Fichiers JS par défaut
    logoUrl: z.string().optional(), // URL du logo
    logoAlt: z.string().optional(), // Texte alternatif du logo
    logoSizes: z.object({
      default: z.object({
        width: z.number(),
        height: z.number(),
      }),
      sm: z.object({
        width: z.number(),
        height: z.number(),
      }),
      md: z.object({
        width: z.number(),
        height: z.number(),
      }),
      lg: z.object({
        width: z.number(),
        height: z.number(),
      }),
    }).optional(),
    stats: z.array(z.object({
      icon: z.string(),
      number: z.string(),
      desc: z.string(),
    })).optional(),
    navLinks: z.array(z.object({
      name: z.string(),
      url: z.string(),
      icon: z.string().optional(),
      dropdown: z.boolean().optional(),
    })).optional(),
    navLinksSecondary: z.array(z.object({
      name: z.string(),
      url: z.string(),
    })).optional(),
    footerText: z.string().optional(), // Texte du pied de page
    socialMedia: z.array(z.object({
      name: z.string(),
      iconClass: z.string(),
      url: z.string(),
    })).optional(),
  }),
});


// Initialise Supabase avec les variables d'environnement
const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY
);

// Helper function to check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.SUPABASE_URL;
  const key = import.meta.env.SUPABASE_ANON_KEY;
  return url && key && 
         url !== 'your_supabase_url_here' && 
         url !== 'https://example.supabase.co' &&
         key !== 'your_supabase_anon_key_here' &&
         key !== 'dummy_key_for_testing';
};

// Wrapper function pour les collections Supabase avec fallback vers des données vides
const createSupabaseCollection = (schema, tableName, mapFn, fallbackData = []) => {
  return defineCollection({
    schema,
    loader: async () => {
      if (!isSupabaseConfigured()) {
        console.warn(`Supabase non configuré - collection ${tableName} vide`);
        return fallbackData;
      }
      
      try {
        // Ici on ferait l'appel Supabase réel quand configuré
        console.warn(`Supabase configuré mais collection ${tableName} désactivée temporairement`);
        return fallbackData;
      } catch (error) {
        console.warn(`Erreur ${tableName}:`, error.message);
        return fallbackData;
      }
    }
  });
};


// Collection "profiles" 
const profiles = createSupabaseCollection(
  z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string().optional(),
    city: z.string().optional(),
    bio: z.string().optional(),
    user_id: z.string().optional(),
  }),
  'profiles',
  null,
  []
);

// Collection "productCategories"
const productcategories = defineCollection({
  schema: z.object({
    id: z.string(),
	slug : z.string(),
    name: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    alt: z.string().optional(),
    parentcategory: z.string().optional(),
  }),
  loader: async () => {
    const { data, error } = await supabaseQuery(
      () => supabase
        .from('productcategories')
        .select('id, slug, name, description, image, alt, parentcategory'),
      [
        {
          id: '1',
          slug: 'air-fryers',
          name: 'Air Fryers',
          description: 'Friteuses à air pour une cuisine saine',
          image: null,
          alt: 'Air Fryers',
          parentcategory: null
        }
      ]
    );

    if (error) {
      throw new Error('Erreur lors de la récupération des catégories de produits : ' + error.message);
    }

    return data.map(category => ({
      id: category.id.toString(),
      slug: category.slug,
      name: category.name,
      description: category.description,
      image: category.image,
      alt: category.alt,
      parentCategory: category.parentcategory?.toString(),
    }));
  },
});

// Collection "airfryers"
const airfryers = defineCollection({
  schema: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    category: z.string().optional(),
    brand: z.string(),
    description: z.string().optional(),
    price: z.number(),
    availability: z.string(),
    rating: z.number().optional(),
    reviewcount: z.number().optional(),
    image: z.string().optional(),
    capacity: z.string().optional(),
    wattage: z.string().optional(),
    voltage: z.string().optional(),
    dimensions: z.string().optional(),
    weight: z.string().optional(),
    color: z.string().optional(),
    material: z.string().optional(),
    noiselevel: z.string().optional(),
    energyEfficiency: z.string().optional(),
    warranty: z.string().optional(),
    modelnumber: z.string().optional(),
    ean: z.string().optional(),
    upc: z.string().optional(),
    pubdate: z.string(),
    lastupdated: z.string(),
  }),
  loader: async () => {
    try {
      const { data, error } = await supabase
        .from('airfryers')
        .select('id, name, slug, category, brand, description, price, availability, rating, reviewcount, image, capacity, wattage, voltage, dimensions, weight, color, material, noiselevel, energyefficiency, warranty, modelnumber, ean, upc, pubdate, lastupdated');

      if (error) throw error;

      return data.map(airfryer => ({
        id: airfryer.id.toString(),
        name: airfryer.name,
        slug: airfryer.slug,
        category: airfryer.category?.toString(),
        brand: airfryer.brand,
        description: airfryer.description,
        price: airfryer.price,
        availability: airfryer.availability,
        rating: airfryer.rating,
        reviewcount: airfryer.reviewcount,
        image: airfryer.image,
        capacity: airfryer.capacity,
        wattage: airfryer.wattage,
        voltage: airfryer.voltage,
        dimensions: airfryer.dimensions,
        weight: airfryer.weight,
        color: airfryer.color,
        material: airfryer.material,
        noiselevel: airfryer.noiselevel,
        energyefficiency: airfryer.energyefficiency,
        warranty: airfryer.warranty,
        modelnumber: airfryer.modelnumber,
        ean: airfryer.ean,
        upc: airfryer.upc,
        pubdate: airfryer.pubdate,
        lastupdated: airfryer.lastupdated,
      }));
    } catch (error) {
      throw new Error('Erreur lors de la récupération des airfryers : ' + error.message);
    }
  },
});

// Collection "blogCategories"
const blogcategories = defineCollection({
  schema: z.object({
    id: z.string(),
	slug: z.string(),
    name: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    alt: z.string().optional(),
    parentcategory: z.string().optional(),
  }),
  loader: async () => {
    try {
      const { data, error } = await supabase
        .from('blogcategories')
        .select('id, slug, name, description, image, alt, parentcategory');

      if (error) throw error;

      return data.map(category => ({
        id: category.id.toString(),
		slug: category.slug,
        name: category.name,
        description: category.description,
        image: category.image,
        alt: category.alt,
        parentcategory: category.parentcategory?.toString(),
      }));
    } catch (error) {
      throw new Error('Erreur lors de la récupération des catégories de blog : ' + error.message);
    }
  },
});

// Collection "blog"
const blog = defineCollection({
  schema: z.object({
    id: z.string(),
	slug: z.string(),
    title: z.string(),
    category: z.string().optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    pubdate: z.string(),
    updateddate: z.string(),
    heroimage: z.string().optional(),
  }),
  loader: async () => {
    try {
      const { data, error } = await supabase
        .from('blog')
        .select('id, slug, title, category, author, description, pubdate, updateddate, heroimage');

      if (error) throw error;

      return data.map(post => ({
        id: post.id.toString(),
		slug: post.slug,
        title: post.title,
        category: post.category?.toString(),
        author: post.author?.toString(),
        description: post.description,
        pubdate: post.pubdate,
        updateddate: post.updateddate,
        heroimage: post.heroimage,
      }));
    } catch (error) {
      throw new Error('Erreur lors de la récupération des articles de blog : ' + error.message);
    }
  },
});

// Collection "recipeCategories"
const recipecategories = defineCollection({
  schema: z.object({
    id: z.string(),
	slug: z.string(),
    name: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    parentcategory: z.string().optional(),
  }),
  loader: async () => {
    try {
      const { data, error } = await supabase
        .from('recipecategories')
        .select('id, name, slug, description, image, parentcategory');

      if (error) throw error;

      return data.map(category => ({
        id: category.id.toString(),
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: category.image,
        parentcategory: category.parentcategory?.toString(),
      }));
    } catch (error) {
      throw new Error('Erreur lors de la récupération des catégories de recettes : ' + error.message);
    }
  },
});

// Collection "recipes"
const recipes = defineCollection({
  schema: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    featured: z.boolean().optional(),
    description: z.string().optional(),
    preptime: z.string().optional(),
    cooktime: z.string().optional(),
    totaltime: z.string().optional(),
    recipeyield: z.string().optional(),
    ingredients: z.array(z.string()).optional(),
    instructions: z.string().optional(),
    nutrition: z.string().optional(),
    pricerange: z.string().optional(),
    cuisinetype: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    mealtype: z.string().optional(),
    diettype: z.string().optional(),
    author: z.string().optional(),
  }),
  loader: async () => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('id, name, slug, featured, description, preptime, cooktime, totaltime, recipeyield, ingredients, instructions, nutrition, pricerange, cuisinetype, tags, image, category, mealtype, diettype, author');

      if (error) throw error;

      return data.map(recipe => ({
        id: recipe.id.toString(),
        name: recipe.name,
        slug: recipe.slug,
        featured: recipe.featured,
        description: recipe.description,
        preptime: recipe.preptime,
        cooktime: recipe.cooktime,
        totaltime: recipe.totaltime,
        recipeyield: recipe.recipeyield,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        nutrition: recipe.nutrition,
        pricerange: recipe.pricerange,
        cuisinetype: recipe.cuisinetype,
        tags: recipe.tags,
        image: recipe.image,
        category: recipe.category?.toString(),
        mealtype: recipe.mealtype,
        diettype: recipe.diettype,
        author: recipe.author?.toString(),
      }));
    } catch (error) {
      throw new Error('Erreur lors de la récupération des recettes : ' + error.message);
    }
  },
});

// Collection "ingredients"
const ingredients = defineCollection({
  schema: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    quantity: z.string().optional(),
    unit: z.string().optional(),
    description: z.string().optional(),
    allergens: z.array(z.string()).optional(),
    category: z.string().optional(),
    image: z.string().optional(),
  }),
  loader: async () => {
    try {
      const { data, error } = await supabase
        .from('ingredients')
        .select('id, name, slug, quantity, unit, description, allergens, category, image');

      if (error) throw error;

      return data.map(ingredient => ({
        id: ingredient.id.toString(),
        name: ingredient.name,
        slug: ingredient.slug,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        description: ingredient.description,
        allergens: ingredient.allergens,
        category: ingredient.category,
        image: ingredient.image,
      }));
    } catch (error) {
      throw new Error('Erreur lors de la récupération des ingrédients : ' + error.message);
    }
  },
});

// Collection "tags"
const tags = defineCollection({
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    color: z.string().optional(),
  }),
  loader: async () => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('id, name, description, color');

      if (error) throw error;

      return data.map(tag => ({
        id: tag.id.toString(),
        name: tag.name,
        description: tag.description,
        color: tag.color,
      }));
    } catch (error) {
      throw new Error('Erreur lors de la récupération des tags : ' + error.message);
    }
  },
});

// Collection "reviews"
const reviews = defineCollection({
  schema: z.object({
    id: z.string(),
    userid: z.string(),
    airfryerid: z.string(),
    datepublished: z.string(),
    reviewbody: z.string(),
    rating: z.number(),
    verifiedpurchase: z.boolean().optional(),
  }),
  loader: async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('id, userid, airfryerid, datepublished, reviewbody, rating, verifiedpurchase');

      if (error) throw error;

      return data.map(review => ({
        id: review.id.toString(),
        userid: review.userid.toString(),
        airfryerid: review.airfryerid.toString(),
        datepublished: review.datepublished,
        reviewbody: review.reviewbody,
        rating: review.rating,
        verifiedpurchase: review.verifiedpurchase,
      }));
    } catch (error) {
      throw new Error('Erreur lors de la récupération des avis : ' + error.message);
    }
  },
});

// Collection "likes"
const likes = defineCollection({
  schema: z.object({
    id: z.string(),
    userid: z.string(),
    airfryerid: z.string(),
    createdat: z.string(),
  }),
  loader: async () => {
    try {
      const { data, error } = await supabase
        .from('likes')
        .select('id, userid, airfryerid, createdat');

      if (error) throw error;

      return data.map(like => ({
        id: like.id.toString(),
        userid: like.userid.toString(),
        airfryerid: like.airfryerid.toString(),
        createdat: like.createdat,
      }));
    } catch (error) {
      throw new Error('Erreur lors de la récupération des likes : ' + error.message);
    }
  },
});

// Collection "comments"
const comments = defineCollection({
  schema: z.object({
    id: z.string(),
    userid: z.string(),
    airfryerid: z.string(),
    content: z.string(),
    createdat: z.string(),
  }),
  loader: async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('id, userid, airfryerid, content, createdat');

      if (error) throw error;

      return data.map(comment => ({
        id: comment.id.toString(),
        userid: comment.userid.toString(),
        airfryerid: comment.airfryerid.toString(),
        content: comment.content,
        createdat: comment.createdat,
      }));
    } catch (error) {
      throw new Error('Erreur lors de la récupération des commentaires : ' + error.message);
    }
  },
});

// Collection "gallery"
const gallery = defineCollection({
  schema: z.object({
    id: z.string(),
    images: z.array(z.string()),
    caption: z.string().optional(),
    imageorder: z.number().optional(),
  }),
  loader: async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('id, images, caption, imageorder');

      if (error) throw error;

      return data.map(item => ({
        id: item.id.toString(),
        images: item.images,
        caption: item.caption,
        imageorder: item.imageorder,
      }));
    } catch (error) {
      throw new Error('Erreur lors de la récupération de la galerie : ' + error.message);
    }
  },
});

// Collection "productTags"
const productTags = defineCollection({
  schema: z.object({
    id: z.string(),
    airfryerid: z.string(),
    tagid: z.string(),
  }),
  loader: async () => {
    try {
      const { data, error } = await supabase
        .from('producttags')
        .select('id, airfryerid, tagid');

      if (error) throw error;

      return data.map(tag => ({
        id: tag.id.toString(),
        airfryerid: tag.airfryerid.toString(),
        tagid: tag.tagid.toString(),
      }));
    } catch (error) {
      throw new Error('Erreur lors de la récupération des tags de produits : ' + error.message);
    }
  },
});

// Exporter les collections
export const collections = {
  organizations,
  profiles,
  productcategories,
  airfryers,
  blogcategories,
  blog,
  recipecategories,
  recipes,
  ingredients,
  tags,
  reviews,
  likes,
  comments,
  gallery,
  productTags,
};
