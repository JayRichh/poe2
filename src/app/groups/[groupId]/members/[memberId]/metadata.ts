import { Metadata } from "next";
import type { Group, Member } from "~/types/gift-list";

// Server-side function to get member and group data
async function getMemberData(memberId: string): Promise<{ member: Member | null; group: Group | null }> {
  try {
    if (typeof window === 'undefined') {
      return { member: null, group: null };
    }

    const membersData = localStorage.getItem('gift-list-members');
    const groupsData = localStorage.getItem('gift-list-groups');
    
    if (!membersData || !groupsData) {
      return { member: null, group: null };
    }

    const members: Member[] = JSON.parse(membersData);
    const groups: Group[] = JSON.parse(groupsData);
    
    const member = members.find(m => m.id === memberId || m.slug === memberId) || null;
    const group = member ? groups.find(g => g.id === member.groupId) || null : null;
    
    return { member, group };
  } catch (error) {
    console.error('Error fetching member data:', error);
    return { member: null, group: null };
  }
}

export async function generateMetadata({ params }: { params: { memberId: string } }): Promise<Metadata> {
  const { member, group } = await getMemberData(params.memberId);

  // If member and group are found, use their data for metadata
  if (member && group) {
    return {
      title: `${member.name} - ${group.name} - Gift List`,
      description: member.notes || `View and manage gifts for ${member.name} in ${group.name}`,
      openGraph: {
        title: `${member.name} - ${group.name} - Gift List`,
        description: member.notes || `View and manage gifts for ${member.name} in ${group.name}`,
        type: "website",
      },
    };
  }

  // Fallback metadata if member or group is not found
  return {
    title: "Member Details - Gift List",
    description: "View and manage member gifts",
    openGraph: {
      title: "Member Details - Gift List",
      description: "View and manage member gifts",
      type: "website",
    },
  };
}
