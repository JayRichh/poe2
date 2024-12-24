import type { ContentCategory, ContentIcon, BaseContent, ContentWithMeta } from "~/lib/shared/types";

export const mechanics: Record<ContentCategory, BaseContent> = {
  "status-effects": {
    title: "Status Effects",
    description: "Master guide to POE2's elemental and status effect mechanics",
    sections: [
      {
        title: "Elemental Effects Overview",
        content: [
          "Path of Exile 2's elemental system introduces a sophisticated interplay of three primary effects: Ignite, Freeze, and Shock. Each effect serves a distinct purpose in combat, offering both offensive and defensive capabilities that can dramatically alter the flow of battle.",
          "These effects form the cornerstone of many powerful builds, enabling complex strategies that combine different elements for maximum impact. Understanding their mechanics and interactions is crucial for creating effective characters.",
          "Effect application follows a threshold-based system, where both raw damage and effect chance play crucial roles. This creates interesting build considerations, as you'll need to balance pure damage with effect scaling."
        ],
        image: {
          src: "/mechanics/elemental-overview.jpg",
          alt: "Visual guide to elemental effects showing Ignite, Freeze, and Shock interactions"
        },
        subsections: [
          {
            title: "Core Mechanics",
            content: [
              "Ignite inflicts fire damage over time, dealing 125% of the hit's base damage over 4 seconds. This makes it particularly potent against high-health targets like bosses. The damage can be further scaled through various passive skills and modifiers.",
              "Freeze completely immobilizes enemies, with duration scaling based on cold damage relative to the enemy's life pool. A minimum 0.3 second freeze is required for the full effect, making damage thresholds particularly important for freeze builds.",
              "Shock creates a vulnerability state that amplifies all damage taken by up to 50%. The magnitude scales with lightning damage relative to enemy life, making it incredibly powerful when properly built around.",
              "These effects can be strategically combined - for example, shocking a frozen enemy will amplify all damage they take when they unfreeze, creating powerful burst damage opportunities."
            ],
            image: {
              src: "/mechanics/effect-scaling.jpg",
              alt: "Detailed graph showing effect scaling with damage thresholds"
            }
          },
          {
            title: "Advanced Strategies",
            content: [
              "Critical strikes guarantee elemental effect application, making crit builds excellent for consistent status effects. This is particularly powerful with skills that hit multiple times quickly, allowing for rapid effect stacking.",
              "Effect duration and magnitude can be scaled through passive skills and gear modifiers. Key modifiers include 'Effect of Non-Damaging Ailments' and 'Duration of Elemental Ailments', which can dramatically increase your control potential.",
              "Different enemy types have varying resistances to effects. Bosses have 66% reduced effect duration and higher thresholds, requiring specialized builds for reliable status application. Understanding these mechanics is crucial for endgame content.",
              "Consider using skills with built-in effect chance or damage conversion to enable hybrid strategies. For example, converting physical damage to cold allows you to scale both hit damage and freeze chance simultaneously."
            ],
            image: {
              src: "/mechanics/boss-effects.jpg",
              alt: "Boss fight demonstration showing multiple status effects in action"
            }
          }
        ]
      },
      {
        title: "Effect Optimization",
        content: [
          "Optimizing status effects requires careful consideration of multiple scaling factors. Understanding how different modifiers interact can help you create more powerful and consistent builds.",
          "Effect chance and magnitude scaling often require specific passive tree investment and gear choices. Planning your build around these requirements early can make progression much smoother.",
          "The ability to apply multiple effects reliably can dramatically increase your character's power, but requires careful build planning and gear selection."
        ],
        subsections: [
          {
            title: "Scaling Mechanics",
            content: [
              "Effect magnitude scales primarily with damage relative to enemy life. This creates interesting breakpoints where increasing your damage can suddenly make effects much more reliable.",
              "Duration scaling is separate from magnitude scaling, allowing for specialized builds that focus on keeping effects active for longer periods.",
              "Some unique items and passive skills can modify how effects work entirely, enabling new build strategies and combinations.",
              "Understanding the difference between local and global effect modifiers is crucial for proper build optimization."
            ]
          },
          {
            title: "Build Considerations",
            content: [
              "Different skills have varying effectiveness at applying status effects. Consider base damage, hit rate, and any built-in effect chances when choosing your main skills.",
              "Certain ascendancy classes have natural synergies with specific effects. For example, Elementalist has powerful ignite scaling, while Occultist excels with cold effects.",
              "Support gems can dramatically alter how effects work. Understanding these interactions helps create more effective builds.",
              "Consider defensive layers when building around effects - some strategies require getting close to dangerous enemies."
            ]
          }
        ]
      }
    ],
    relatedContent: [
      {
        title: "Combat Guide",
        description: "Master the fundamentals of POE2 combat mechanics",
        href: "/guides?category=combat",
        type: "guide"
      },
      {
        title: "Character Building",
        description: "Learn how to create effective elemental builds",
        href: "/guides?category=character-building",
        type: "guide"
      }
    ]
  },
  // Add other categories with similar detailed content structure
  "damage-types": {
    title: "Damage Types",
    description: "Comprehensive guide to POE2's damage systems and mechanics",
    sections: [
      {
        title: "Physical Damage",
        content: [
          "Physical damage forms the foundation of POE2's combat system. It's the most common damage type and serves as the base for many conversion and scaling mechanics that enable powerful build combinations.",
          "Understanding physical damage is crucial because it can be converted to other damage types, allowing you to benefit from both physical and elemental damage modifiers. This conversion mechanic is key to many endgame builds.",
          "Physical damage comes in two main forms: hit damage and damage over time effects like bleeding. Each has distinct scaling mechanics and defensive counters that you need to understand for effective building."
        ],
        image: {
          src: "/mechanics/physical-damage.jpg",
          alt: "Physical damage types and conversion diagram"
        },
        subsections: [
          {
            title: "Hit Damage Mechanics",
            content: [
              "Physical hit damage is reduced by armor, making it less effective against heavily armored targets. However, armor penetration and overwhelming force can bypass this defense.",
              "Critical strikes with physical damage have a chance to cause bleeding without any special modifiers, providing a natural synergy for physical damage builds.",
              "Physical damage reflection can be deadly - always check map modifiers and consider conversion strategies if reflection is a concern.",
              "Impale is a powerful physical damage mechanic that stores a portion of hit damage and releases it over subsequent hits, enabling massive damage scaling."
            ],
            image: {
              src: "/mechanics/physical-scaling.jpg",
              alt: "Physical damage scaling mechanics visualization"
            }
          },
          {
            title: "Conversion and Scaling",
            content: [
              "Damage conversion follows a strict order: Physical → Lightning → Cold → Fire → Chaos. Understanding this order is crucial for planning conversion strategies.",
              "Converting 100% of physical damage to elemental types lets you double-dip on damage modifiers and ignore physical reflection mechanics.",
              "Partial conversion can be powerful when combined with effects that scale with multiple damage types. For example, converting 50% to fire lets you benefit from both physical and fire modifiers.",
              "Some skills have built-in conversion - check skill gems carefully when planning your build to take advantage of these natural synergies."
            ],
            image: {
              src: "/mechanics/damage-conversion.jpg",
              alt: "Damage conversion flow chart and examples"
            }
          }
        ]
      },
      {
        title: "Elemental Damage",
        content: [
          "Elemental damage in POE2 is divided into three types: Fire, Cold, and Lightning. Each has unique properties and status effects that can dramatically impact your combat effectiveness.",
          "Understanding elemental penetration and resistance mechanics becomes increasingly important in endgame content where enemies have high resistances.",
          "Elemental damage can be scaled through various means, including conversion, penetration, and exposure effects. Combining these mechanics effectively is key to maximizing damage output."
        ],
        subsections: [
          {
            title: "Element Types",
            content: [
              "Fire damage excels at consistent damage over time through ignites, making it particularly effective for boss fights and sustained damage scenarios.",
              "Cold damage provides powerful control through freeze and chill effects, offering both offensive and defensive benefits through enemy control.",
              "Lightning damage has the highest damage variance but provides shock for damage amplification, making it excellent for burst damage builds.",
              "Combining different elements can provide both damage and utility through various status effects, but requires careful build planning."
            ]
          },
          {
            title: "Resistance Mechanics",
            content: [
              "Enemy elemental resistances cap at 75% by default, making penetration and resistance reduction crucial for high-level content.",
              "Exposure effects provide a powerful way to reduce enemy resistances, stacking with penetration for maximum effect.",
              "Multiple sources of penetration stack additively, allowing for specialized builds that can effectively ignore enemy resistances.",
              "Some endgame bosses have additional resistance mechanics that require specific strategies to overcome."
            ]
          }
        ]
      }
    ],
    relatedContent: [
      {
        title: "Status Effects Guide",
        description: "Learn how damage types interact with status effects",
        href: "/mechanics/status-effects",
        type: "mechanic"
      },
      {
        title: "Combat Guide",
        description: "Master the fundamentals of POE2 combat",
        href: "/guides?category=combat",
        type: "guide"
      }
    ]
  },
  "character-stats": {
    title: "Character Stats",
    description: "Complete guide to POE2's character statistics and attributes",
    sections: [
      {
        title: "Core Attributes",
        content: [
          "Path of Exile 2's attribute system revolves around three primary stats: Strength, Dexterity, and Intelligence. Each attribute provides inherent bonuses and serves as the foundation for different character archetypes.",
          "Understanding how attributes scale and interact with various mechanics is crucial for optimizing your build. Each point invested has both direct benefits and enables access to powerful gear and skill gems.",
          "Attribute requirements become increasingly important as you progress, with high-tier equipment and skill gems often requiring substantial investment in specific attributes."
        ],
        image: {
          src: "/mechanics/core-attributes.jpg",
          alt: "Core attributes diagram showing Strength, Dexterity, and Intelligence scaling"
        },
        subsections: [
          {
            title: "Primary Benefits",
            content: [
              "Strength provides life and physical damage bonuses. Each point grants +0.5 life and +1% melee physical damage, making it crucial for melee-focused builds and overall survivability.",
              "Dexterity increases accuracy and evasion. Each point provides +2 accuracy and +0.5% evasion, essential for attack-based builds and defensive layering.",
              "Intelligence grants mana and energy shield. Each point gives +0.5 mana and +1% energy shield, forming the foundation of caster and energy shield-based builds.",
              "Hybrid builds need to carefully balance multiple attributes to meet gear requirements while maximizing synergistic benefits."
            ],
            image: {
              src: "/mechanics/attribute-scaling.jpg",
              alt: "Detailed attribute scaling and benefits breakdown"
            }
          },
          {
            title: "Secondary Stats",
            content: [
              "Life is your primary defense against damage. Base life increases with level, and can be further scaled through strength and passive tree nodes.",
              "Mana powers your skills and can be reserved for auras and other permanent effects. Effective mana management is crucial for all builds.",
              "Energy Shield acts as a secondary life pool that regenerates automatically. It can be scaled to extremely high values through intelligence and specialized gear.",
              "Accuracy determines your chance to hit enemies with attacks. Spells automatically hit but can be evaded by certain enemies."
            ]
          }
        ]
      },
      {
        title: "Defensive Mechanics",
        content: [
          "POE2's defense system is built around multiple layers working together. Understanding how different defensive mechanics interact is crucial for survival.",
          "Each defensive layer has strengths and weaknesses against different types of damage. Building multiple complementary layers is key to creating a robust character.",
          "Defensive stats can be obtained from gear, passive skills, and various temporary buffs. Planning your defensive strategy early is crucial for successful progression."
        ],
        subsections: [
          {
            title: "Primary Defenses",
            content: [
              "Armour reduces physical damage from hits based on a percentage calculation. It's most effective against many small hits rather than single large hits.",
              "Evasion provides a chance to completely avoid attacks. It works on an entropy system to prevent streaks of bad luck.",
              "Energy Shield absorbs damage before your life pool. It can be specialized into with various mechanics like Chaos Inoculation.",
              "Block and Dodge provide chances to completely avoid damage from hits. They can be obtained from shields, dual wielding, and passive skills."
            ],
            image: {
              src: "/mechanics/defense-layers.jpg",
              alt: "Visual guide to defense mechanics and layering"
            }
          },
          {
            title: "Recovery Mechanics",
            content: [
              "Life Recovery comes from flasks, regeneration, and leech. Each has its own mechanics and can be scaled through various means.",
              "Mana Recovery is crucial for sustaining skill usage. Understanding mana costs and recovery options is essential for build planning.",
              "Energy Shield Recovery has unique mechanics like recharge delay and rate. Various modifiers can improve its recovery speed.",
              "Recovery Rate affects all forms of recovery and can be modified by various sources. Understanding recovery mechanics is crucial for survival."
            ]
          }
        ]
      }
    ],
    relatedContent: [
      {
        title: "Character Building",
        description: "Learn how to plan and optimize your character build",
        href: "/guides?category=character-building",
        type: "guide"
      },
      {
        title: "Combat Guide",
        description: "Master POE2's combat mechanics",
        href: "/guides?category=combat",
        type: "guide"
      }
    ]
  },
  economy: {
    title: "Currency & Economy",
    description: "Master guide to POE2's economy and currency systems",
    sections: [
      {
        title: "Currency System",
        content: [
          "POE2's economy revolves around a unique currency system where crafting materials serve as both crafting tools and trading currency. Understanding this dual-purpose system is crucial for efficient wealth building.",
          "Each currency item has specific crafting functions that affect items in different ways. Learning these functions helps you understand item value and make informed trading decisions.",
          "Currency items have different tiers of rarity and usefulness, creating a natural hierarchy that forms the basis of the game's economy."
        ],
        image: {
          src: "/mechanics/currency-overview.jpg",
          alt: "Overview of POE2's main currency types and their uses"
        },
        subsections: [
          {
            title: "Primary Currencies",
            content: [
              "Exalted Orbs are one of the most valuable standard currencies, used for high-value trades and adding powerful modifiers to items. Save these for important crafting projects or significant purchases.",
              "Divine Orbs are crucial for optimizing numeric values on unique items and serve as a stable high-value currency for trading.",
              "Chaos Orbs are the standard trading currency for mid-tier items and are useful for rerolling rare item modifiers.",
              "Lesser currencies like Orbs of Alteration and Jeweller's Orbs are vital for early crafting and can be traded in bulk for more valuable currencies."
            ],
            image: {
              src: "/mechanics/currency-tiers.jpg",
              alt: "Currency hierarchy and exchange rates visualization"
            }
          },
          {
            title: "Special Currencies",
            content: [
              "Waystones are essential for accessing and modifying endgame maps. Their value increases as players progress into endgame content.",
              "Crafting-specific currencies like Essences and Catalysts provide deterministic modification options for specific item types.",
              "League-specific currencies often have unique functions and can be particularly valuable during their respective leagues.",
              "Specialized currencies for specific crafting outcomes become more valuable as players optimize endgame gear."
            ]
          }
        ]
      },
      {
        title: "Market Dynamics",
        content: [
          "POE2's economy is player-driven, with prices fluctuating based on supply, demand, and the current stage of a league.",
          "Understanding market trends and price movements helps you make profitable trades and efficiently gear your characters.",
          "Different types of items have different market behaviors - learning these patterns is key to successful trading."
        ],
        subsections: [
          {
            title: "Trading Basics",
            content: [
              "Use the official trade site to find items and check prices. Learning to use search filters effectively is crucial for finding good deals.",
              "Price items competitively by checking similar listings. Consider both current prices and recent sales trends.",
              "Bulk trading of currency and crafting materials often offers better rates than individual trades.",
              "Set up premium stash tabs efficiently to streamline your trading process and maximize sales."
            ],
            image: {
              src: "/mechanics/trading-interface.jpg",
              alt: "Guide to using the trading interface effectively"
            }
          },
          {
            title: "Market Strategies",
            content: [
              "Early league strategies focus on quick sales and building initial currency reserves. Speed is often more important than maximizing individual sale prices.",
              "Mid-league trading involves more specialized items and higher-value transactions. Market knowledge becomes increasingly important.",
              "Late-league markets tend to focus on perfect or near-perfect items. Understanding high-end crafting becomes crucial.",
              "Cross-league trading requires understanding how item values change throughout a league's lifecycle."
            ]
          }
        ]
      }
    ],
    relatedContent: [
      {
        title: "Trading Guide",
        description: "Learn advanced trading strategies and market analysis",
        href: "/guides?category=trading",
        type: "guide"
      },
      {
        title: "Crafting Guide",
        description: "Master POE2's crafting systems",
        href: "/guides?category=equipment",
        type: "guide"
      }
    ]
  },
  gameplay: {
    title: "Gameplay Mechanics",
    description: "Essential guide to POE2's core gameplay systems and mechanics",
    sections: [
      {
        title: "Core Systems",
        content: [
          "POE2's gameplay revolves around a deep action-RPG system where character customization, skill combinations, and strategic decision-making create unique playstyles.",
          "The game features a classless character system where your starting class only determines your initial position on the passive skill tree and starting gems.",
          "Success depends on understanding the interplay between passive skills, active gems, support gems, and equipment choices."
        ],
        image: {
          src: "/mechanics/core-systems.jpg",
          alt: "Overview of POE2's core gameplay systems"
        },
        subsections: [
          {
            title: "Character Development",
            content: [
              "Level up by defeating monsters and completing objectives. Each level grants passive skill points and attribute points for customization.",
              "Skill gems provide active abilities and can be enhanced with support gems to create powerful combinations.",
              "Equipment provides both defensive stats and offensive capabilities, with sockets for skill gems being a crucial consideration.",
              "Ascendancy classes provide powerful specialized bonuses that define your character's strengths."
            ],
            image: {
              src: "/mechanics/character-development.jpg",
              alt: "Character progression and customization options"
            }
          },
          {
            title: "Combat Flow",
            content: [
              "Combat emphasizes quick decision-making and positioning. Movement skills and careful positioning are crucial for survival.",
              "Resource management between life, mana, and various buffs/debuffs creates strategic depth in combat encounters.",
              "Area control and monster management become increasingly important as you progress through harder content.",
              "Flask management provides crucial buffs and recovery options during combat."
            ]
          }
        ]
      },
      {
        title: "World Interaction",
        content: [
          "POE2's world is filled with interactive elements, from treasure chests and breakable objects to special encounters and events.",
          "Various league mechanics add unique gameplay elements and rewards to areas throughout the game.",
          "Understanding area levels and monster scaling helps you choose appropriate content for your character's progression."
        ],
        subsections: [
          {
            title: "Area Mechanics",
            content: [
              "Each area has a level that determines monster strength and item drop levels. Stay within appropriate level ranges for efficient progression.",
              "Special encounters like Strongboxes, Shrines, and League mechanics provide additional challenges and rewards.",
              "Environmental hazards and ground effects require constant awareness and proper positioning.",
              "Town areas serve as safe hubs for trading, crafting, and accessing various services."
            ],
            image: {
              src: "/mechanics/area-mechanics.jpg",
              alt: "Guide to area mechanics and special encounters"
            }
          },
          {
            title: "Quest System",
            content: [
              "Main story quests guide you through the game's acts while providing essential rewards and unlocks.",
              "Side quests offer additional rewards and often unlock important features or passive skill points.",
              "Optional objectives and hidden quests provide extra challenges and unique rewards for thorough players.",
              "Quest rewards often let you choose from various skill gems or equipment, helping you customize your build."
            ]
          }
        ]
      }
    ],
    relatedContent: [
      {
        title: "Combat Guide",
        description: "Master POE2's combat mechanics and strategies",
        href: "/guides?category=combat",
        type: "guide"
      },
      {
        title: "Character Building",
        description: "Learn how to create effective character builds",
        href: "/guides?category=character-building",
        type: "guide"
      }
    ]
  },
  combat: {
    title: "Combat System",
    description: "In-depth guide to POE2's combat mechanics and strategies",
    sections: [
      {
        title: "Combat Fundamentals",
        content: [
          "POE2's combat system combines fast-paced action with deep strategic elements. Success requires mastering both moment-to-moment gameplay and long-term tactical planning.",
          "Combat revolves around skill usage, positioning, and resource management. Each build has unique rhythms and patterns that emerge from their core mechanics.",
          "Understanding enemy behaviors, damage types, and defensive mechanics is crucial for survival in increasingly challenging content."
        ],
        image: {
          src: "/mechanics/combat-overview.jpg",
          alt: "Overview of POE2's combat mechanics and systems"
        },
        subsections: [
          {
            title: "Offensive Mechanics",
            content: [
              "Skills form the core of your offensive capabilities. Main skills are typically supported by multiple support gems to maximize effectiveness.",
              "Attack and cast speed affect your ability to deal damage consistently. Finding the right balance between speed and power is crucial.",
              "Critical strikes provide burst damage potential but require investment in accuracy and critical strike chance/multiplier.",
              "Area of Effect (AoE) versus single target damage creates important build considerations for different content types."
            ],
            image: {
              src: "/mechanics/offensive-mechanics.jpg",
              alt: "Guide to offensive combat mechanics and skill combinations"
            }
          },
          {
            title: "Defensive Layers",
            content: [
              "Multiple defensive layers work together to keep you alive. Relying on a single defense is usually insufficient for harder content.",
              "Active defenses like guard skills and counterattacks require proper timing and management of cooldowns.",
              "Passive defenses such as block, dodge, and damage reduction provide consistent protection but need investment.",
              "Recovery mechanics determine how quickly you can bounce back from damage taken."
            ]
          }
        ]
      },
      {
        title: "Advanced Combat",
        content: [
          "Advanced combat involves managing multiple systems simultaneously while reacting to various threats and opportunities.",
          "Understanding monster mechanics and attack patterns becomes increasingly important in endgame content.",
          "Resource management between offensive and defensive abilities creates dynamic decision-making during combat."
        ],
        subsections: [
          {
            title: "Combat Strategies",
            content: [
              "Movement and positioning are crucial for both offense and defense. Learn to use movement skills effectively.",
              "Curse and aura management can dramatically affect combat effectiveness. Prioritize the most impactful effects for your build.",
              "Flask timing and management provide crucial buffs and survival tools. Develop muscle memory for efficient flask usage.",
              "Crowd control and area management become vital in high-density situations."
            ],
            image: {
              src: "/mechanics/combat-strategies.jpg",
              alt: "Advanced combat strategies and positioning techniques"
            }
          },
          {
            title: "Build Synergies",
            content: [
              "Skills and support gems should work together to create powerful combinations. Look for synergies that multiply rather than just add damage.",
              "Defensive layers should complement each other and cover different types of threats.",
              "Utility skills can provide crucial advantages in specific situations. Keep situational tools available.",
              "Party play introduces new considerations for skill and aura synergies between players."
            ]
          }
        ]
      }
    ],
    relatedContent: [
      {
        title: "Character Building",
        description: "Learn how to create effective combat builds",
        href: "/guides?category=character-building",
        type: "guide"
      },
      {
        title: "Boss Fights",
        description: "Master POE2's challenging boss encounters",
        href: "/mechanics/boss-fights",
        type: "mechanic"
      }
    ]
  },
  "boss-fights": {
    title: "Boss Encounters",
    description: "Comprehensive guide to POE2's challenging boss encounters",
    sections: [
      {
        title: "Boss Mechanics Overview",
        content: [
          "POE2's boss fights are complex encounters that test both your build's capabilities and your mechanical skill. Understanding boss mechanics is crucial for consistent success.",
          "Each boss has unique attack patterns, phases, and mechanics that require specific strategies to counter effectively.",
          "Boss difficulty scales with content level and modifiers, making preparation and proper build optimization essential for endgame encounters."
        ],
        image: {
          src: "/mechanics/boss-overview.jpg",
          alt: "Overview of POE2's boss mechanics and phases"
        },
        subsections: [
          {
            title: "Core Concepts",
            content: [
              "Boss phases often introduce new mechanics and attack patterns. Learning phase transitions helps you prepare for upcoming challenges.",
              "Area effects and ground degens are common in boss arenas. Maintaining awareness of hazardous zones is crucial for survival.",
              "Many bosses have enrage mechanics or increasing difficulty over time. Understanding DPS checks and time pressure is important.",
              "Boss immunities and resistance phases require adaptable damage strategies or patience during invulnerable periods."
            ],
            image: {
              src: "/mechanics/boss-phases.jpg",
              alt: "Guide to boss phases and mechanics"
            }
          },
          {
            title: "Defensive Requirements",
            content: [
              "Boss damage often comes in large spikes. Having sufficient effective health pool and recovery is crucial.",
              "Certain boss mechanics require specific counters like curse immunity, stun resistance, or movement skills.",
              "Multiple defensive layers become increasingly important as boss difficulty increases.",
              "Recovery mechanics need to be reliable under pressure, as healing opportunities may be limited."
            ]
          }
        ]
      },
      {
        title: "Strategic Approaches",
        content: [
          "Success in boss fights requires combining mechanical skill with proper strategic preparation.",
          "Different builds have different approaches to boss encounters, from face-tanking to hit-and-run tactics.",
          "Understanding your build's strengths and limitations helps you choose appropriate strategies for each encounter."
        ],
        subsections: [
          {
            title: "Fight Preparation",
            content: [
              "Study boss mechanics and attack patterns before attempting difficult encounters. Knowledge prevents deaths from unexpected abilities.",
              "Configure your flasks and skill setup specifically for boss fights. Some mapping configurations may be suboptimal for bosses.",
              "Consider consumable buffs and temporary power boosts for challenging encounters.",
              "Have a plan for managing boss arena mechanics and adds (additional enemies) during the fight."
            ],
            image: {
              src: "/mechanics/boss-preparation.jpg",
              alt: "Boss fight preparation and strategy guide"
            }
          },
          {
            title: "Common Mechanics",
            content: [
              "Telegraphed attacks require proper positioning and timing to dodge. Learn to recognize wind-up animations.",
              "Add phases often require rapid target prioritization and crowd control.",
              "Arena-wide effects typically require specific positioning or timing to handle safely.",
              "Death effects and on-death mechanics can be particularly dangerous if not properly anticipated."
            ]
          }
        ]
      }
    ],
    relatedContent: [
      {
        title: "Combat Guide",
        description: "Master POE2's core combat mechanics",
        href: "/mechanics/combat",
        type: "mechanic"
      },
      {
        title: "Character Building",
        description: "Create effective boss-killing builds",
        href: "/guides?category=character-building",
        type: "guide"
      }
    ]
  },
  "character-building": {
    title: "Character Building",
    description: "Comprehensive guide to creating effective POE2 builds",
    sections: [
      {
        title: "Build Planning",
        content: [
          "Successful POE2 builds require careful planning and understanding of multiple game systems. A well-planned build considers offense, defense, and utility needs.",
          "Build planning starts with choosing a main skill and damage type, then developing supporting mechanics and defenses around that core concept.",
          "Understanding how different mechanics interact is crucial for creating powerful builds that can handle endgame content."
        ],
        image: {
          src: "/mechanics/build-planning.jpg",
          alt: "Guide to POE2 build planning and optimization"
        },
        subsections: [
          {
            title: "Core Concepts",
            content: [
              "Choose a main skill that fits your preferred playstyle. Consider both mechanical requirements and scaling potential.",
              "Plan your defensive layers early. Multiple defensive mechanics working together provide better survival than focusing on a single defense.",
              "Consider resource management - mana costs, life/ES recovery, and flask usage all need reliable solutions.",
              "Account for utility needs like movement skills, curse setup, and aura choices in your planning."
            ],
            image: {
              src: "/mechanics/build-core-concepts.jpg",
              alt: "Core concepts of build creation and planning"
            }
          },
          {
            title: "Passive Tree Planning",
            content: [
              "Efficient passive tree pathing is crucial. Plan routes that maximize value while minimizing point investment.",
              "Identify key notables and keystones that synergize with your build concept early in planning.",
              "Consider attribute requirements for gems and gear when planning tree paths.",
              "Leave flexibility for adapting to gear availability and specific content challenges."
            ]
          }
        ]
      },
      {
        title: "Build Optimization",
        content: [
          "Build optimization involves fine-tuning multiple systems to work together effectively. Each component should complement the others.",
          "Understanding damage scaling mechanics helps you identify the most efficient ways to increase your build's power.",
          "Defensive optimization requires balancing multiple layers while maintaining sufficient offensive capabilities."
        ],
        subsections: [
          {
            title: "Damage Scaling",
            content: [
              "Identify your main damage scaling mechanics and focus investment there. Spreading investment too thin reduces effectiveness.",
              "Support gems should be chosen to create multiplicative scaling rather than just additive bonuses.",
              "Consider conversion mechanics and damage type scaling to maximize damage potential.",
              "Balance investment between different scaling methods - penetration, increased damage, more multipliers, etc."
            ],
            image: {
              src: "/mechanics/damage-scaling.jpg",
              alt: "Guide to damage scaling and optimization"
            }
          },
          {
            title: "Build Refinement",
            content: [
              "Test your build against various content types to identify weaknesses. Different challenges may require specific adjustments.",
              "Keep track of common failure points and work on solutions through gear, passive tree, or gameplay adjustments.",
              "Consider quality of life improvements once core functionality is established.",
              "Maintain flexibility to adapt to specific content requirements while preserving core build identity."
            ]
          }
        ]
      }
    ],
    relatedContent: [
      {
        title: "Character Stats",
        description: "Understanding POE2's core character statistics",
        href: "/mechanics/character-stats",
        type: "mechanic"
      },
      {
        title: "Equipment Guide",
        description: "Master POE2's equipment and gearing systems",
        href: "/mechanics/equipment",
        type: "mechanic"
      }
    ]
  },
  equipment: {
    title: "Equipment Guide",
    description: "Comprehensive guide to POE2's equipment and gearing systems",
    sections: [
      {
        title: "Equipment Basics",
        content: [
          "POE2's equipment system features deep customization through various item types, modifiers, and socket systems. Understanding these systems is crucial for character optimization.",
          "Items come in different rarity tiers: Normal, Magic, Rare, and Unique. Each tier offers different modification possibilities and power levels.",
          "Equipment slots work together to provide your character's core defensive and offensive capabilities. Balancing stats across slots is key to build success."
        ],
        image: {
          src: "/mechanics/equipment-overview.jpg",
          alt: "Overview of POE2's equipment system and item types"
        },
        subsections: [
          {
            title: "Item Properties",
            content: [
              "Base types determine an item's core properties and potential modifier pools. Higher-tier bases generally offer better starting stats.",
              "Implicit modifiers are inherent to certain base types and provide bonus stats before other modifications.",
              "Explicit modifiers are additional stats that can be added through various crafting methods.",
              "Item level affects what modifiers can appear on an item, with higher item levels enabling more powerful mods."
            ],
            image: {
              src: "/mechanics/item-properties.jpg",
              alt: "Guide to item properties and modification systems"
            }
          },
          {
            title: "Socket System",
            content: [
              "Sockets allow you to use skill gems and support gems in your equipment. Socket colors correspond to attribute requirements.",
              "Socket links enable support gems to enhance active skill gems. Planning socket configurations is crucial for build effectiveness.",
              "Some unique items and special bases have specific socket behaviors or limitations.",
              "Socket crafting requires various currency items and understanding of crafting mechanics."
            ]
          }
        ]
      },
      {
        title: "Advanced Gearing",
        content: [
          "Advanced gearing involves understanding modifier pools, crafting methods, and how to optimize gear for specific build requirements.",
          "Different slot types have different available modifier pools. Understanding these pools helps in crafting and evaluating items.",
          "Balancing resistances, attributes, and other stats across gear pieces requires careful planning."
        ],
        subsections: [
          {
            title: "Gear Optimization",
            content: [
              "Prioritize stats based on your build's needs. Different builds value different modifiers differently.",
              "Consider modifier tiers and their ranges when evaluating gear. Perfect rolls aren't always necessary.",
              "Balance unique items with rare items to meet build requirements while maintaining build-enabling effects.",
              "Plan attribute requirements across your gear to efficiently meet gem and equipment needs."
            ],
            image: {
              src: "/mechanics/gear-optimization.jpg",
              alt: "Guide to gear optimization and stat balancing"
            }
          },
          {
            title: "Crafting Strategies",
            content: [
              "Different crafting methods suit different goals. Understand when to use each crafting approach.",
              "Currency crafting provides randomized results but can be powerful with proper method selection.",
              "Deterministic crafting through mechanics like Essences or special crafting systems offers more controlled results.",
              "Meta-crafting techniques combine multiple crafting methods for optimal results but require significant investment."
            ]
          }
        ]
      }
    ],
    relatedContent: [
      {
        title: "Character Building",
        description: "Learn how to plan character builds around equipment",
        href: "/guides?category=character-building",
        type: "guide"
      },
      {
        title: "Trading Guide",
        description: "Master POE2's item trading system",
        href: "/mechanics/trading",
        type: "mechanic"
      }
    ]
  },
  progression: {
    title: "Character Progression",
    description: "Complete guide to leveling and progressing in POE2",
    sections: [
      {
        title: "Leveling Process",
        content: [
          "POE2's progression system combines character leveling with story progression and gear advancement. Understanding efficient leveling strategies helps you reach endgame content faster.",
          "Each level grants passive skill points and attribute points, allowing you to gradually build towards your planned character setup.",
          "Content difficulty increases as you progress, requiring constant gear upgrades and build refinements."
        ],
        image: {
          src: "/mechanics/leveling-overview.jpg",
          alt: "Overview of POE2's character progression system"
        },
        subsections: [
          {
            title: "Early Game",
            content: [
              "Focus on completing main story quests while maintaining appropriate level for current content.",
              "Prioritize linking main skill gems and acquiring crucial support gems for your build.",
              "Keep resistances capped and life/defenses adequate for current content difficulty.",
              "Use movement skills and quicksilver flasks to improve clear speed and progression rate."
            ],
            image: {
              src: "/mechanics/early-game.jpg",
              alt: "Guide to early game progression strategies"
            }
          },
          {
            title: "Gear Progression",
            content: [
              "Update gear regularly to maintain appropriate defenses and damage output.",
              "Use crafting bench to fill gaps in resistances and attributes.",
              "Look for gear with linked sockets in appropriate colors for your main skills.",
              "Balance unique items with rare gear to maintain necessary stats while enabling build mechanics."
            ]
          }
        ]
      },
      {
        title: "Build Development",
        content: [
          "Character builds evolve throughout the leveling process as you gain access to more skills and passive points.",
          "Some mechanics require specific level thresholds or story progress to unlock.",
          "Planning temporary solutions for the leveling process helps smooth out progression."
        ],
        subsections: [
          {
            title: "Skill Progression",
            content: [
              "Start with skills that work well with minimal investment while leveling.",
              "Transition to your main build skills when you have sufficient support for them.",
              "Acquire and level alternate gems that you'll need later in your build.",
              "Keep aura and utility setups flexible to accommodate changing needs."
            ],
            image: {
              src: "/mechanics/skill-progression.jpg",
              alt: "Guide to skill gem progression and development"
            }
          },
          {
            title: "Passive Tree Development",
            content: [
              "Focus on essential nodes first - life, key damage nodes, and crucial keystones.",
              "Plan efficient paths that provide immediate benefits while working toward endgame setup.",
              "Consider respec points from quests when planning temporary leveling solutions.",
              "Adapt tree progression based on available gear and content requirements."
            ]
          }
        ]
      }
    ],
    relatedContent: [
      {
        title: "Character Building",
        description: "Learn how to plan effective character builds",
        href: "/guides?category=character-building",
        type: "guide"
      },
      {
        title: "Equipment Guide",
        description: "Master POE2's gear progression system",
        href: "/mechanics/equipment",
        type: "mechanic"
      }
    ]
  },
  mapping: {
    title: "Endgame Mapping",
    description: "Complete guide to POE2's endgame mapping system",
    sections: [
      {
        title: "Mapping Basics",
        content: [
          "POE2's mapping system forms the core endgame progression, offering infinitely replayable content with scaling difficulty and rewards.",
          "Maps are items that can be modified and enhanced to increase both challenge and potential rewards.",
          "Understanding map mechanics and modifiers is crucial for efficient endgame progression and farming."
        ],
        image: {
          src: "/mechanics/mapping-overview.jpg",
          alt: "Overview of POE2's mapping system and mechanics"
        },
        subsections: [
          {
            title: "Map Tiers",
            content: [
              "Maps are organized into tiers, with higher tiers offering better rewards but increased difficulty.",
              "Progress through the Atlas by completing connected maps and collecting Watchstones to access higher tiers.",
              "Map completion bonuses provide permanent benefits to your Atlas progression.",
              "Boss encounters become more challenging but offer better rewards in higher tier maps."
            ],
            image: {
              src: "/mechanics/map-tiers.jpg",
              alt: "Guide to map tiers and progression"
            }
          },
          {
            title: "Map Modifiers",
            content: [
              "Maps can be modified using currency items to increase quantity and quality of items found.",
              "Dangerous modifiers provide higher rewards but require specific build considerations.",
              "Some modifiers can completely block certain builds from running the map.",
              "Understanding modifier combinations helps you balance risk versus reward."
            ]
          }
        ]
      },
      {
        title: "Advanced Mapping",
        content: [
          "Advanced mapping involves optimizing both map selection and modification strategies for specific farming goals.",
          "Different strategies suit different builds and objectives, from boss farming to currency generation.",
          "Understanding map layouts and monster density helps optimize clear speed and efficiency."
        ],
        subsections: [
          {
            title: "Map Investment",
            content: [
              "Proper map investment balances currency spent enhancing maps against expected returns.",
              "Different investment strategies suit different farming goals and build capabilities.",
              "Consider scarabs, sextants, and other mapping consumables for maximum returns.",
              "Track results to refine and optimize your investment strategy over time."
            ],
            image: {
              src: "/mechanics/map-investment.jpg",
              alt: "Guide to map investment and optimization"
            }
          },
          {
            title: "Farming Strategies",
            content: [
              "Choose maps that suit your build's strengths and clear speed capabilities.",
              "Target specific content types or rewards through careful map and modifier selection.",
              "Understand league mechanics and their interaction with map modifiers.",
              "Develop efficient patterns for map clearing and boss encounters."
            ]
          }
        ]
      }
    ],
    relatedContent: [
      {
        title: "Character Building",
        description: "Create builds capable of handling endgame content",
        href: "/guides?category=character-building",
        type: "guide"
      },
      {
        title: "Boss Fights",
        description: "Master POE2's map boss encounters",
        href: "/mechanics/boss-fights",
        type: "mechanic"
      }
    ]
  },
  trading: {
    title: "Trading Guide",
    description: "Master guide to POE2's trading mechanics and strategies",
    sections: [
      {
        title: "Trading Fundamentals",
        content: [
          "POE2's trading system enables players to exchange items and currency through both automated and manual trading mechanisms.",
          "Understanding market values, trade etiquette, and efficient trading practices is crucial for successful trading.",
          "The official trade site provides powerful tools for finding items and managing trades."
        ],
        image: {
          src: "/mechanics/trading-overview.jpg",
          alt: "Overview of POE2's trading system and interfaces"
        },
        subsections: [
          {
            title: "Trade Mechanics",
            content: [
              "Premium stash tabs enable listing items for sale directly from your stash.",
              "The trade site's search filters help find specific items and price check efficiently.",
              "Trade whispers use a standardized format that includes item details and offer price.",
              "Trade windows require both parties to verify items before accepting trades."
            ],
            image: {
              src: "/mechanics/trade-interface.jpg",
              alt: "Guide to trading interfaces and mechanics"
            }
          },
          {
            title: "Price Checking",
            content: [
              "Compare similar items by searching for matching modifiers and values.",
              "Consider item level, base type, and modifier tiers when evaluating prices.",
              "Account for perfect and near-perfect rolls when pricing high-end items.",
              "Use live search for rare or high-value items to catch good deals."
            ]
          }
        ]
      },
      {
        title: "Trading Strategies",
        content: [
          "Successful trading requires understanding both item values and market dynamics.",
          "Different trading strategies suit different playstyles and time investments.",
          "Efficient trading practices help maximize profits while minimizing time spent trading."
        ],
        subsections: [
          {
            title: "Market Strategies",
            content: [
              "Bulk trading of currency and materials often provides better rates than individual trades.",
              "Flipping items requires understanding both current prices and market trends.",
              "Crafting for profit needs careful analysis of material costs versus potential returns.",
              "Specialized market niches can provide steady profit with less competition."
            ],
            image: {
              src: "/mechanics/trading-strategies.jpg",
              alt: "Guide to trading strategies and market analysis"
            }
          },
          {
            title: "Trade Efficiency",
            content: [
              "Organize your sale tabs efficiently to quickly find items when buyers message.",
              "Use trade macros or quick responses to handle common trading scenarios.",
              "Set clear prices to avoid haggling and speed up trade completion.",
              "Consider opportunity cost when deciding which items to list and trade."
            ]
          }
        ]
      }
    ],
    relatedContent: [
      {
        title: "Economy Guide",
        description: "Master POE2's economy and currency systems",
        href: "/mechanics/economy",
        type: "mechanic"
      },
      {
        title: "Equipment Guide",
        description: "Learn about item valuation and modification",
        href: "/mechanics/equipment",
        type: "mechanic"
      }
    ]
  }
};

const mechanicIconMap: Record<ContentCategory, ContentIcon> = {
  "damage-types": "Zap",
  "status-effects": "Activity",
  "character-stats": "User",
  economy: "Coins",
  gameplay: "Book",
  trading: "Coins",
  "boss-fights": "Sword",
  "character-building": "User",
  equipment: "Box",
  combat: "Crosshair",
  progression: "ArrowUp",
  mapping: "Map"
};

export const mechanicsWithMeta: ContentWithMeta[] = Object.entries(mechanics).map(([id, mechanic]) => ({
  ...mechanic,
  id: id as ContentCategory,
  icon: mechanicIconMap[id as ContentCategory]
}));
