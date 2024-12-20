# POE2 Tools Architecture

## Core Features

### Authentication & User Management

- [x] Email/password authentication via Supabase
- [x] GitHub OAuth integration
- [x] POE account connectivity via OAuth
  - Character data sync
  - League information
  - Profile management
- [x] User preferences storage
- [ ] Build saving/sharing capabilities

### Navigation Structure

- Main navigation
  - Build Planner
    - Equipment
    - Skills
    - Stats
    - Notes
    - Import/Export
  - DPS Calculator
  - Tools & Calculators
    - Resistance Calculator
    - Life/Mana Calculator
  - Resources
    - Skill Gem Database
    - Equipment Database
    - Maps & Content Guide
  - Search (Global)

### Build Planner

- Character build creation and management
- Equipment selection and comparison
- Skill gem configuration
- Stat calculations and optimization
- Build sharing and importing
- Progress tracking
- Build templates

### DPS Calculator

- [x] Weapon damage comparison
- [x] Skill damage calculations
- [ ] Global settings for calculations
  - [ ] Character level
  - [ ] Base stats (Str/Dex/Int)
  - [ ] Global modifiers
  - [ ] Skill tree effects
- [ ] Results visualization
  - [ ] Damage breakdown
  - [ ] Comparison charts
  - [ ] Export options
  - [ ] Save configurations

### Tools & Calculators

- Resistance calculator
- Life/mana calculator
- Stat comparison tools
- Equipment comparison

### Resources

- Printable guides and checklists
- Skill gem database
  - Leveling guides
  - Gem information
- Equipment database
  - Item stats
  - Comparison tools
- Maps and content guides
- Search functionality across all content

## Technical Architecture

### Frontend

- [x] Next.js 15+ with App Router
- [x] TailwindCSS for styling
- [x] Framer Motion for animations
- [x] Server Actions for form handling
- [x] Proper cookie management
- [x] Route handlers with async/await

### Backend & Data

- Supabase for:
  - [x] User authentication
  - [x] Profile management
  - [ ] Build storage
  - [x] Preferences
- POE API Integration:
  - [x] OAuth authentication
  - [x] Profile data
  - [ ] Character data
  - [ ] League information

### Components Structure

- /components
  - [x] /ui - Reusable UI components
  - [ ] /build-planner - Build planning components
  - [ ] /calculators - Calculator components
  - [ ] /resources - Resource display components
  - [ ] /search - Search components
  - [ ] /auth - Authentication components

### Data Management

- [x] Server-side cookie storage
- [x] Supabase for persistent storage
- [ ] Client-side caching for performance
- [ ] POE API data caching

### Planned Features

#### Phase 1 (Current)

- [x] Basic authentication
  - [x] Email/password
  - [x] GitHub OAuth
  - [x] POE OAuth
- [x] DPS Calculator
- [ ] Build Planner foundation
  - [ ] Basic layout
  - [ ] Navigation
  - [ ] Data models
- [x] POE account connectivity
  - [x] OAuth flow
  - [x] Profile sync
  - [ ] Character sync

#### Phase 2 (Next)

- [ ] Build Planner MVP
  - [ ] Equipment slots
  - [ ] Basic stats
  - [ ] Skill gems
  - [ ] Save/load builds
- [ ] Equipment comparison
- [ ] Resistance calculator
- [ ] Life/mana calculator
- [ ] Global search

#### Phase 3

- [ ] Skill gem database
- [ ] Equipment database
- [ ] Build templates
- [ ] Progress tracking

#### Phase 4

- [ ] Maps & content guide
- [ ] Printable resources
- [ ] Build sharing
- [ ] Community features

## Directory Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── actions/           # Server actions
│   ├── api/               # API routes
│   ├── auth/              # Auth pages & callbacks
│   ├── build-planner/     # Build planner routes
│   ├── dps-calc/          # DPS calculator
│   ├── tools/             # Calculator tools
│   ├── resources/         # Static resources
│   └── search/            # Search functionality
├── components/            # React components
├── hooks/                # Custom React hooks
├── lib/                  # Shared utilities
├── services/            # API services
├── types/               # TypeScript types
└── utils/               # Utility functions
```

## Data Models

### User Profile

```typescript
interface Profile {
  id: string;
  email?: string;
  name?: string;
  poe_account?: {
    connected: boolean;
    accountName?: string;
    lastSync?: string;
  };
  poe_refresh_token?: string;
  created_at: string;
  updated_at: string;
}
```

### Character Build

```typescript
interface CharacterBuild {
  id: string;
  userId: string;
  name: string;
  description?: string;
  visibility: "public" | "private";
  equipment: Equipment[];
  skills: SkillGem[];
  stats: CharacterStats;
  notes?: string;
  created: string;
  updated: string;
}
```

### Equipment

```typescript
interface Equipment {
  id: string;
  slot: EquipmentSlot;
  name: string;
  type: string;
  stats: ItemStat[];
  requirements?: {
    level?: number;
    strength?: number;
    dexterity?: number;
    intelligence?: number;
  };
}
```

### Skill Gem

```typescript
interface SkillGem {
  id: string;
  name: string;
  level: number;
  quality: number;
  type: "active" | "support";
  tags: string[];
  stats: GemStat[];
}
```

## API Integration

### POE OAuth Flow

- [x] User initiates POE account connection
- [x] Redirect to POE OAuth endpoint with PKCE
- [x] Handle callback with authorization code
- [x] Exchange code for access token
- [x] Store refresh token for future use
- [ ] Fetch account/character data

### Data Synchronization

- [x] Manual profile sync
- [ ] Periodic sync of character data
- [x] Error handling and retry logic
- [x] Rate limiting compliance

## Performance Considerations

- [ ] Client-side caching of static data
- [ ] Incremental Static Regeneration for resources
- [ ] Optimistic UI updates
- [ ] Progressive loading of large datasets
- [ ] Image optimization for equipment/gems

## Next Steps

1. DPS Calculator Completion

   - Add global settings panel
   - Implement skill tree effects
   - Create damage breakdown view
   - Add comparison visualization
   - Enable configuration saving

2. Build Planner Foundation

   - Create basic layout
   - Set up navigation
   - Implement data models
   - Add save/load functionality

3. Character Data Integration

   - Implement character sync
   - Add character selection
   - Display character stats
   - Show equipped items

4. Equipment System

   - Create equipment slots
   - Add item database
   - Implement comparison
   - Show requirements

5. Skill System
   - Add skill gem database
   - Create gem socket system
   - Show gem requirements
   - Calculate skill stats
