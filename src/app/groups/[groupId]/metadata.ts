import { Metadata } from "next";
import type { Group } from "~/types/gift-list";

// Server-side function to get group data from localStorage
async function getGroupData(groupId: string): Promise<Group | null> {
  try {
    // Since we're server-side, we need to safely handle localStorage access
    if (typeof window === 'undefined') {
      const groups: Group[] = [];
      return groups.find(g => g.id === groupId || g.slug === groupId) || null;
    }
    
    const groupsData = localStorage.getItem('gift-list-groups');
    if (!groupsData) return null;
    
    const groups: Group[] = JSON.parse(groupsData);
    return groups.find(g => g.id === groupId || g.slug === groupId) || null;
  } catch (error) {
    console.error('Error fetching group data:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { groupId: string } }): Promise<Metadata> {
  const group = await getGroupData(params.groupId);

  // If group is found, use its data for metadata
  if (group) {
    return {
      title: `${group.name} - Gift List`,
      description: group.description || `Manage gifts and members for ${group.name}`,
      openGraph: {
        title: `${group.name} - Gift List`,
        description: group.description || `Manage gifts and members for ${group.name}`,
        type: "website",
      },
    };
  }

  // Fallback metadata if group is not found
  return {
    title: "Group - Gift List",
    description: "View and manage group members and gifts",
    openGraph: {
      title: "Group - Gift List",
      description: "View and manage group members and gifts",
      type: "website",
    },
  };
}
