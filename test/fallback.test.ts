import { describe, it, expect, beforeEach } from 'vitest';
import FallbackContentService from '../src/lib/fallback';

describe('FallbackContentService', () => {
  beforeEach(() => {
    FallbackContentService.clearCache();
  });

  it('should detect when Supabase is not configured', () => {
    const isConfigured = FallbackContentService.isSupabaseConfigured();
    // In test environment, Supabase should not be configured
    expect(isConfigured).toBe(false);
  });

  it('should load fallback data for profiles collection', async () => {
    const profiles = await FallbackContentService.loadFallbackData('profiles');
    
    expect(Array.isArray(profiles)).toBe(true);
    expect(profiles.length).toBeGreaterThan(0);
    
    // Check profile structure
    const firstProfile = profiles[0];
    expect(firstProfile).toHaveProperty('id');
    expect(firstProfile).toHaveProperty('name');
    expect(firstProfile).toHaveProperty('bio');
    expect(typeof firstProfile.id).toBe('string');
    expect(typeof firstProfile.name).toBe('string');
  });

  it('should load fallback data for reviews collection', async () => {
    const reviews = await FallbackContentService.loadFallbackData('reviews');
    
    expect(Array.isArray(reviews)).toBe(true);
    expect(reviews.length).toBeGreaterThan(0);
    
    // Check review structure
    const firstReview = reviews[0];
    expect(firstReview).toHaveProperty('id');
    expect(firstReview).toHaveProperty('rating');
    expect(firstReview).toHaveProperty('comment');
    expect(firstReview).toHaveProperty('productId');
    expect(firstReview).toHaveProperty('userId');
    expect(firstReview).toHaveProperty('createdAt');
    expect(typeof firstReview.rating).toBe('number');
    expect(firstReview.rating).toBeGreaterThan(0);
    expect(firstReview.rating).toBeLessThanOrEqual(5);
  });

  it('should load fallback data for likes collection', async () => {
    const likes = await FallbackContentService.loadFallbackData('likes');
    
    expect(Array.isArray(likes)).toBe(true);
    expect(likes.length).toBeGreaterThan(0);
    
    // Check like structure
    const firstLike = likes[0];
    expect(firstLike).toHaveProperty('id');
    expect(firstLike).toHaveProperty('userId');
    expect(firstLike).toHaveProperty('itemId');
    expect(firstLike).toHaveProperty('itemType');
    expect(typeof firstLike.itemType).toBe('string');
    expect(['recipe', 'product']).toContain(firstLike.itemType);
  });

  it('should load fallback data for comments collection', async () => {
    const comments = await FallbackContentService.loadFallbackData('comments');
    
    expect(Array.isArray(comments)).toBe(true);
    expect(comments.length).toBeGreaterThan(0);
    
    // Check comment structure
    const firstComment = comments[0];
    expect(firstComment).toHaveProperty('id');
    expect(firstComment).toHaveProperty('content');
    expect(firstComment).toHaveProperty('userId');
    expect(firstComment).toHaveProperty('itemId');
    expect(firstComment).toHaveProperty('itemType');
    expect(firstComment).toHaveProperty('createdAt');
    expect(typeof firstComment.content).toBe('string');
    expect(firstComment.content.length).toBeGreaterThan(0);
  });

  it('should cache loaded data', async () => {
    const profiles1 = await FallbackContentService.loadFallbackData('profiles');
    const profiles2 = await FallbackContentService.loadFallbackData('profiles');
    
    // Should return same reference (cached)
    expect(profiles1).toBe(profiles2);
  });

  it('should return empty array for non-existent collection', async () => {
    const nonExistent = await FallbackContentService.loadFallbackData('non-existent-collection');
    
    expect(Array.isArray(nonExistent)).toBe(true);
    expect(nonExistent.length).toBe(0);
  });

  it('should use fallback data when Supabase is not configured', async () => {
    const data = await FallbackContentService.getCollectionData('profiles');
    
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    
    const firstProfile = data[0];
    expect(firstProfile).toHaveProperty('id');
    expect(firstProfile).toHaveProperty('name');
  });
});