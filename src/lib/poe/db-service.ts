import path from 'path';
import fs from 'fs/promises';

// Type for the database records
type DatabaseRecord = {
  Id?: string;
  [key: string]: any;
};

// Type for collections of records
type DatabaseCollection<T extends DatabaseRecord = DatabaseRecord> = T[];

/**
 * Service for accessing POE2 database JSON files
 * Uses singleton pattern and caching for performance
 */
export class POEDatabaseService {
  private static instance: POEDatabaseService;
  private cache: Map<string, DatabaseCollection>;
  private dataPath: string;
  private metadataPath: string;

  private constructor() {
    this.cache = new Map();
    // Paths relative to project root
    this.dataPath = path.join(process.cwd(), 'src/lib/poe/data/poe2-data-main/data');
    this.metadataPath = path.join(process.cwd(), 'src/lib/poe/data/poe2-data-main/xt/metadata');
  }

  public static getInstance(): POEDatabaseService {
    if (!POEDatabaseService.instance) {
      POEDatabaseService.instance = new POEDatabaseService();
    }
    return POEDatabaseService.instance;
  }

  /**
   * Get data from a specific database file
   * @param filename The name of the file without extension
   * @returns Promise resolving to the typed data
   */
  public async getData<T extends DatabaseRecord>(
    filename: string
  ): Promise<DatabaseCollection<T>> {
    const cacheKey = `data:${filename}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as DatabaseCollection<T>;
    }

    try {
      const filePath = path.join(this.dataPath, `${filename}.json`);
      const data = await fs.readFile(filePath, 'utf-8');
      const parsed = JSON.parse(data) as DatabaseCollection<T>;
      
      this.cache.set(cacheKey, parsed);
      return parsed;
    } catch (error) {
      console.error(`Error loading data file ${filename}:`, error);
      throw new Error(`Failed to load data file ${filename}`);
    }
  }

  /**
   * Get metadata for a specific category
   * @param category The metadata category (e.g. 'items', 'skills')
   * @param subcategory Optional subcategory
   * @returns Promise resolving to the metadata
   */
  public async getMetadata(category: string, subcategory?: string): Promise<any> {
    const cacheKey = `metadata:${category}${subcategory ? `:${subcategory}` : ''}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const categoryPath = path.join(this.metadataPath, category);
      const filePath = subcategory 
        ? path.join(categoryPath, subcategory, 'metadata.json')
        : path.join(categoryPath, 'metadata.json');

      const data = await fs.readFile(filePath, 'utf-8');
      const parsed = JSON.parse(data);
      
      this.cache.set(cacheKey, parsed);
      return parsed;
    } catch (error) {
      console.error(`Error loading metadata for ${category}/${subcategory}:`, error);
      throw new Error(`Failed to load metadata for ${category}/${subcategory}`);
    }
  }

  /**
   * Clear the cache
   */
  public clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get all available data files
   * @returns Promise resolving to list of available data files
   */
  public async getAvailableDataFiles(): Promise<string[]> {
    try {
      const files = await fs.readdir(this.dataPath);
      return files
        .filter(file => file.endsWith('.json'))
        .map(file => file.replace('.json', ''));
    } catch (error) {
      console.error('Error listing data files:', error);
      throw new Error('Failed to list data files');
    }
  }

  /**
   * Get all available metadata categories
   * @returns Promise resolving to list of available metadata categories
   */
  public async getAvailableMetadataCategories(): Promise<string[]> {
    try {
      const categories = await fs.readdir(this.metadataPath);
      return categories.filter(category => 
        fs.stat(path.join(this.metadataPath, category))
          .then(stat => stat.isDirectory())
      );
    } catch (error) {
      console.error('Error listing metadata categories:', error);
      throw new Error('Failed to list metadata categories');
    }
  }
}

// Export singleton instance
export const poeDB = POEDatabaseService.getInstance();

// Create a helper type file for POE2 data types
export type { DatabaseRecord, DatabaseCollection };
