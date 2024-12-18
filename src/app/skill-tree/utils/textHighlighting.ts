import DOMPurify from 'isomorphic-dompurify';

// Load keywords and skills from data files
// For now, using placeholder data - this should be updated to use actual data
const KEYWORDS = [
  'Damage', 'Life', 'Mana', 'Attack', 'Spell', 'Critical', 'Physical',
  'Fire', 'Cold', 'Lightning', 'Chaos', 'Poison', 'Bleed', 'Ignite',
  'Block', 'Dodge', 'Armor', 'Evasion', 'Energy Shield', 'Resistance',
  'Speed', 'Area', 'Duration', 'Projectile', 'Minion', 'Totem', 'Trap',
  'Mine', 'Curse', 'Aura', 'Channeling', 'Trigger', 'Guard', 'Brand'
];

const SKILLS = [
  'Fireball', 'Lightning Strike', 'Cleave', 'Shield Bash', 'Ice Nova',
  'Arc', 'Cyclone', 'Blade Vortex', 'Raise Zombie', 'Summon Skeletons',
  'Flame Dash', 'Dash', 'Blink Arrow', 'Frost Bomb', 'Storm Brand',
  'Vortex', 'Blade Blast', 'Explosive Arrow', 'Ground Slam', 'Smite'
];

/**
 * Highlights keywords in text with special styling
 * @param text The text to process
 * @returns Sanitized HTML string with highlighted keywords
 */
export function highlightKeywords(text: string): string {
  // Create a regex pattern that matches whole words only
  const pattern = `\\b(${KEYWORDS.join('|')})\\b`;
  const regex = new RegExp(pattern, 'gi');
  
  // Replace matches with highlighted HTML
  const highlighted = text.replace(regex, (match) => 
    `<span class="is-keyword">${match}</span>`
  );

  // Sanitize the HTML to prevent XSS
  return DOMPurify.sanitize(highlighted, {
    ALLOWED_TAGS: ['span'],
    ALLOWED_ATTR: ['class']
  });
}

/**
 * Highlights skill names in text with special styling
 * @param text The text to process
 * @returns Sanitized HTML string with highlighted skill names
 */
export function highlightSkills(text: string): string {
  // Create a regex pattern that matches whole words only
  const pattern = `\\b(${SKILLS.join('|')})\\b`;
  const regex = new RegExp(pattern, 'gi');
  
  // Replace matches with highlighted HTML
  const highlighted = text.replace(regex, (match) => 
    `<span class="is-skill">${match}</span>`
  );

  // Sanitize the HTML to prevent XSS
  return DOMPurify.sanitize(highlighted, {
    ALLOWED_TAGS: ['span'],
    ALLOWED_ATTR: ['class']
  });
}

/**
 * Combines both keyword and skill highlighting
 * @param text The text to process
 * @returns Sanitized HTML string with both keywords and skills highlighted
 */
export function highlightText(text: string): string {
  return highlightSkills(highlightKeywords(text));
}

/**
 * Sanitizes HTML string
 * @param html The HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['span'],
    ALLOWED_ATTR: ['class']
  });
}
