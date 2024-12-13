import { createClient } from '~/lib/supabase/client'
import { generateSlug } from './slug'
import { useAuth } from '~/contexts/auth'
import type { GiftStatus } from '../lib/supabase/types'

const DEMO_GROUPS = [
  {
    name: "Family",
    description: "Keep track of gifts for immediate family members",
    members: [
      { name: "Mom", gifts: ["Cookbook", "Scarf", "Photo Album"] },
      { name: "Dad", gifts: ["Tool Set", "Golf Clubs", "Watch"] },
      { name: "Sister", gifts: ["Headphones", "Jewelry Box", "Art Supplies"] }
    ]
  },
  {
    name: "Friends",
    description: "Gift ideas for close friends",
    members: [
      { name: "Alex", gifts: ["Board Game", "Coffee Maker", "Backpack"] },
      { name: "Sarah", gifts: ["Plant Stand", "Yoga Mat", "Tea Set"] },
      { name: "Mike", gifts: ["Video Game", "Bluetooth Speaker", "Wallet"] }
    ]
  }
]

const GIFT_COSTS = {
  min: 20,
  max: 200
}

const GIFT_TAGS = [
  "Birthday", "Holiday", "Special Occasion",
  "Practical", "Fun", "Luxury",
  "Handmade", "Experience", "Tech"
]

const getRandomCost = () => {
  return Math.floor(Math.random() * (GIFT_COSTS.max - GIFT_COSTS.min + 1)) + GIFT_COSTS.min
}

const getRandomTags = () => {
  const numTags = Math.floor(Math.random() * 3) + 1
  const shuffled = [...GIFT_TAGS].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, numTags)
}

const getRandomPriority = () => {
  return Math.random() > 0.5 ? Math.floor(Math.random() * 3) + 1 : undefined
}

const getRandomStatus = (): GiftStatus => {
  return Math.random() > 0.7 ? 'purchased' : 'planned'
}

export async function generateDemoData() {
  const supabase = createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('User must be logged in to generate demo data')

  try {
    // Check if user already has groups
    const { data: existingGroups } = await supabase
      .from('groups')
      .select('id')
      .eq('user_id', user.id)
      .limit(1)

    if (existingGroups && existingGroups.length > 0) {
      console.log('User already has groups, skipping demo data generation')
      return true
    }

    console.log('Generating demo data for new user...')

    // Generate demo data
    for (const groupData of DEMO_GROUPS) {
      try {
        // Create group
        const { data: group, error: groupError } = await supabase
          .from('groups')
          .insert({
            user_id: user.id,
            name: groupData.name,
            description: groupData.description,
            slug: generateSlug(groupData.name),
            budget: 1000
          })
          .select()
          .single()

        if (groupError) throw groupError

        // Create members and their gifts
        for (const memberData of groupData.members) {
          const { data: member, error: memberError } = await supabase
            .from('members')
            .insert({
              group_id: group.id,
              name: memberData.name,
              slug: generateSlug(memberData.name)
            })
            .select()
            .single()

          if (memberError) throw memberError

          // Create gifts for member
          const gifts = memberData.gifts.map(giftName => ({
            member_id: member.id,
            name: giftName,
            description: `A thoughtful gift for ${memberData.name}`,
            cost: getRandomCost(),
            status: getRandomStatus(),
            tags: getRandomTags(),
            priority: getRandomPriority()
          }))

          const { error: giftsError } = await supabase
            .from('gifts')
            .insert(gifts)

          if (giftsError) {
            console.error(`Error creating gifts for ${memberData.name}:`, giftsError)
            // Continue with next member even if gifts fail
            continue
          }
        }
      } catch (groupError) {
        console.error(`Error creating group ${groupData.name}:`, groupError)
        // Continue with next group even if one fails
        continue
      }
    }

    console.log('Demo data generation completed')
    return true
  } catch (error) {
    console.error('Error generating demo data:', error)
    throw error
  }
}
