interface StorageProvider {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  isChromeSync: () => boolean;
}

interface ChromeStorageSync {
  get(keys: string[] | string | null): Promise<{ [key: string]: any }>;
  set(items: { [key: string]: any }): Promise<void>;
  remove(keys: string[]): Promise<void>;
  getBytesInUse?(keys: string[]): Promise<number>;
}

interface ChromeStorage {
  sync: ChromeStorageSync;
}

interface Chrome {
  storage?: ChromeStorage;
}

declare global {
  interface Window {
    chrome?: Chrome;
  }
}

const STORAGE_KEYS = ["gift-list-groups", "gift-list-members", "gift-list-gifts"];

class LocalStorageProvider implements StorageProvider {
  isChromeSync(): boolean {
    return false;
  }

  async getItem(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }

  async setItem(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}

class ServerStorageProvider implements StorageProvider {
  isChromeSync(): boolean {
    return false;
  }

  async getItem(): Promise<string | null> {
    return null;
  }

  async setItem(): Promise<void> {}

  async removeItem(): Promise<void> {}
}

class StorageService {
  private static instance: StorageService | null = null;
  private provider: StorageProvider | null = null;
  private initPromise: Promise<void> | null = null;

  private constructor() {}

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  private async initialize(): Promise<void> {
    if (this.provider) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      if (typeof window === "undefined") {
        this.provider = new ServerStorageProvider();
        return;
      }

      this.provider = new LocalStorageProvider();
    })();

    return this.initPromise;
  }

  async get<T>(key: string): Promise<T | null> {
    await this.initialize();

    try {
      const data = await this.provider!.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error getting data from storage for key ${key}:`, error);
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    await this.initialize();

    try {
      await this.provider!.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting data in storage for key ${key}:`, error);
      throw error;
    }
  }

  async remove(key: string): Promise<void> {
    await this.initialize();

    try {
      await this.provider!.removeItem(key);
    } catch (error) {
      console.error(`Error removing data from storage for key ${key}:`, error);
      throw error;
    }
  }

  isChromeSync(): boolean {
    return false;
  }
}

export const storageService = StorageService.getInstance();
