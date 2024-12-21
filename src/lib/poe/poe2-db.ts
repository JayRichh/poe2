import { type DatabaseRecord, poeDB } from "./db-service";
import type { POE2DataType, POE2DataTypes } from "./poe2-types";

/**
 * Type-safe wrapper for POE2 database access
 */
export class POE2Database {
  /**
   * Get strongly typed data from a POE2 database file
   * @param filename The name of the file without extension
   * @returns Promise resolving to the typed data
   */
  public static async getData<K extends keyof POE2DataTypes>(
    filename: K
  ): Promise<POE2DataTypes[K]>;
  public static async getData<T extends DatabaseRecord>(filename: string): Promise<T[]>;
  public static async getData<T extends DatabaseRecord>(filename: string): Promise<T[]> {
    return poeDB.getData<T>(filename);
  }

  /**
   * Get metadata for a specific category
   * @param category The metadata category (e.g. 'items', 'skills')
   * @param subcategory Optional subcategory
   * @returns Promise resolving to the metadata
   */
  public static async getMetadata(category: string, subcategory?: string): Promise<any> {
    return poeDB.getMetadata(category, subcategory);
  }

  /**
   * Get all available data files
   * @returns Promise resolving to list of available data files
   */
  public static async getAvailableDataFiles(): Promise<string[]> {
    return poeDB.getAvailableDataFiles();
  }

  /**
   * Get all available metadata categories
   * @returns Promise resolving to list of available metadata categories
   */
  public static async getAvailableMetadataCategories(): Promise<string[]> {
    return poeDB.getAvailableMetadataCategories();
  }

  /**
   * Clear the cache
   */
  public static clearCache(): void {
    poeDB.clearCache();
  }
}

// Helper functions for type-safe access to specific POE2 data types
export function getSkills() {
  return POE2Database.getData<"Skills">("Skills");
}

export function getPassiveSkills() {
  return POE2Database.getData<"Passiveskills">("Passiveskills");
}

export function getCharacters() {
  return POE2Database.getData<"Characters">("Characters");
}

export function getActiveSkills() {
  return POE2Database.getData<"Activeskills">("Activeskills");
}

// Export the class and a default instance
export const poe2DB = POE2Database;
