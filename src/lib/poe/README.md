# POE2 Database Service

A type-safe database service for accessing POE2 game data.

## Usage

### Using Helper Functions (Recommended)

The simplest way to access POE2 data with full type safety:

```typescript
import { getSkills, getPassiveSkills, getCharacters, getActiveSkills } from '@/lib/poe/poe2-db';

// Get skills data
const skills = await getSkills();  // Type: SkillItem[]

// Get passive skills
const passives = await getPassiveSkills();  // Type: PassiveSkillItem[]

// Get characters
const characters = await getCharacters();  // Type: CharacterItem[]

// Get active skills
const activeSkills = await getActiveSkills();  // Type: ActiveSkillItem[]
```

### Using POE2Database Class

For accessing POE2 data types directly:

```typescript
import { poe2DB } from '@/lib/poe/poe2-db';

// Get skills with type safety
const skills = await poe2DB.getData('Skills');  // Type: SkillItem[]

// Get passive skills
const passives = await poe2DB.getData('Passiveskills');  // Type: PassiveSkillItem[]
```

### Using Generic Database Service

For working with custom data types:

```typescript
import { poeDB, type DatabaseRecord } from '@/lib/poe/db-service';

// Define your custom type
interface CustomType extends DatabaseRecord {
  name: string;
  value: number;
}

// Get data with custom type
const data = await poeDB.getData<CustomType>('customfile');  // Type: CustomType[]
```

### Working with Metadata

```typescript
import { poe2DB } from '@/lib/poe/poe2-db';

// Get metadata for a category
const metadata = await poe2DB.getMetadata('items');

// Get metadata with subcategory
const subMetadata = await poe2DB.getMetadata('items', 'weapons');
```

### Utility Functions

```typescript
import { poe2DB } from '@/lib/poe/poe2-db';

// Get list of available data files
const files = await poe2DB.getAvailableDataFiles();

// Get list of metadata categories
const categories = await poe2DB.getAvailableMetadataCategories();

// Clear the cache if needed
poe2DB.clearCache();
```

## Type Definitions

The service provides several type definitions for working with POE2 data:

- `SkillItem`: Type for skill data
- `PassiveSkillItem`: Type for passive skill data
- `CharacterItem`: Type for character data
- `ActiveSkillItem`: Type for active skill data
- `DatabaseRecord`: Base type for all database records
- `POE2DataTypes`: Type mapping for all POE2 data types

## Caching

The service includes built-in caching to improve performance. Data is cached after the first request and reused for subsequent requests. Use `clearCache()` if you need to force a refresh of the data.

## Project Structure

```
src/lib/poe/
├── db-service.ts     # Base database service with generic types
├── poe2-types.ts     # POE2-specific type definitions
├── poe2-db.ts        # Type-safe wrapper for POE2 data
└── README.md         # This documentation
```

## Path Aliasing

The examples use the `@/` path alias which should be configured in your tsconfig.json:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## Example Usage

Here's a complete example of using the database service:

```typescript
import { poe2DB } from '@/lib/poe/poe2-db';
import type { SkillItem } from '@/lib/poe/poe2-types';

async function getSkillByName(name: string): Promise<SkillItem | undefined> {
  const skills = await poe2DB.getData('Skills');
  return skills.find(skill => skill.DisplayedName === name);
}

// Usage
const skill = await getSkillByName('Fireball');
if (skill) {
  console.log(`Found skill: ${skill.DisplayedName}`);
  console.log(`Description: ${skill.Description}`);
}
