import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Service for handling fallback content when Supabase is unavailable
 * Provides sample data for collections that would normally come from Supabase
 */
export class FallbackContentService {
  private static fallbackDataCache: Map<string, any[]> = new Map();

  /**
   * Check if Supabase is properly configured
   */
  static isSupabaseConfigured(): boolean {
    // In test/Node.js environment, use process.env
    // In Astro runtime, this would use import.meta.env
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;
    
    return !!(url && key && 
           url !== 'your_supabase_url_here' && 
           url !== 'https://example.supabase.co' &&
           key !== 'your_supabase_anon_key_here' &&
           key !== 'dummy_key_for_testing');
  }

  /**
   * Load fallback data from JSON file
   */
  static async loadFallbackData(collectionName: string): Promise<any[]> {
    // Check cache first
    if (this.fallbackDataCache.has(collectionName)) {
      return this.fallbackDataCache.get(collectionName)!;
    }

    try {
      // Load from file system in build/development context
      let fallbackData: any[] = [];
      
      if (typeof window === 'undefined') {
        // Server-side or build time
        try {
          const fallbackPath = join(process.cwd(), 'src', 'content', 'fallback', `${collectionName}.json`);
          const jsonContent = readFileSync(fallbackPath, 'utf-8');
          fallbackData = JSON.parse(jsonContent);
        } catch (fileError) {
          console.warn(`Could not load fallback file for ${collectionName}:`, fileError);
          fallbackData = [];
        }
      } else {
        // Client-side fallback (should rarely be needed)
        try {
          const response = await fetch(`/fallback/${collectionName}.json`);
          if (response.ok) {
            fallbackData = await response.json();
          }
        } catch (fetchError) {
          console.warn(`Could not fetch fallback data for ${collectionName}:`, fetchError);
          fallbackData = [];
        }
      }

      // Cache the data
      this.fallbackDataCache.set(collectionName, fallbackData);
      
      console.info(`Loaded ${fallbackData.length} fallback items for collection: ${collectionName}`);
      return fallbackData;
    } catch (error) {
      console.error(`Error loading fallback data for ${collectionName}:`, error);
      return [];
    }
  }

  /**
   * Get collection data with automatic fallback
   */
  static async getCollectionData(
    collectionName: string, 
    supabaseLoader?: () => Promise<any[]>
  ): Promise<any[]> {
    // Try Supabase first if configured and loader provided
    if (this.isSupabaseConfigured() && supabaseLoader) {
      try {
        const data = await supabaseLoader();
        if (data && data.length > 0) {
          console.info(`Loaded ${data.length} items from Supabase for collection: ${collectionName}`);
          return data;
        }
      } catch (error) {
        console.warn(`Supabase failed for ${collectionName}, falling back to local data:`, error);
      }
    }

    // Fall back to local data
    return this.loadFallbackData(collectionName);
  }

  /**
   * Clear cache (useful for testing)
   */
  static clearCache(): void {
    this.fallbackDataCache.clear();
  }
}

export default FallbackContentService;