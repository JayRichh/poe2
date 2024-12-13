"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Users } from "lucide-react";
import Link from "next/link";
import { useGroups } from "~/hooks/gift-list";
import { useMembers } from "~/hooks/gift-list";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";
import { Button } from "~/components/ui/Button";
import { Modal } from "~/components/ui/Modal";
import { Toast } from "~/components/ui/Toast";
import { MemberForm } from "~/components/members/MemberForm";
import { MemberList } from "~/components/members/MemberList";
import type { Member } from "~/types/gift-list";
import { generateSlug } from "~/utils/slug";

export default function GroupPage() {
  const params = useParams();
  const router = useRouter();
  const groupIdOrSlug = params.groupId as string;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  } | null>(null);

  const { groups, loading: groupsLoading } = useGroups();
  const group = groups.find(g => g.id === groupIdOrSlug || g.slug === groupIdOrSlug);

  const { 
    members, 
    loading: membersLoading, 
    error: membersError,
    createMember,
    updateMember,
    deleteMember,
  } = useMembers(group?.id);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast(prev => prev ? { ...prev, isVisible: false } : null);
    }, 3000);
  };

  const handleCreateMember = async (data: { name: string; tags?: string[]; notes?: string }) => {
    if (!group) return;
    try {
      await createMember({
        ...data,
        groupId: group.id,
        slug: generateSlug(data.name)
      });
      setIsCreateModalOpen(false);
      showToast("Member added successfully!", "success");
    } catch (error) {
      showToast("Failed to add member", "error");
    }
  };

  const handleEditMember = async (data: { name: string; tags?: string[]; notes?: string }) => {
    if (!editingMember || !group) return;
    try {
      await updateMember(editingMember.id, {
        ...data,
        slug: generateSlug(data.name)
      });
      setEditingMember(null);
      showToast("Member updated successfully!", "success");
    } catch (error) {
      showToast("Failed to update member", "error");
    }
  };

  const handleDeleteMember = async (member: Member) => {
    if (!group) return;
    try {
      await deleteMember(member.id);
      showToast("Member deleted successfully!", "success");
    } catch (error) {
      showToast("Failed to delete member", "error");
    }
  };

  // Show loading state while groups are loading
  if (groupsLoading) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <Text>Loading group...</Text>
        </div>
      </Container>
    );
  }

  // Show not found state if group doesn't exist
  if (!group) {
    return (
      <Container className="py-8">
        <div className="text-center text-error">
          <Text>Group not found</Text>
          <Link href="/groups">
            <Button variant="ghost" size="sm" className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Groups
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container className="py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/groups">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div>
                <Text variant="h1" className="text-3xl font-bold">
                  {group.name}
                </Text>
                {group.description && (
                  <Text className="text-foreground-secondary mt-1">
                    {group.description}
                  </Text>
                )}
              </div>
            </div>
            <Button
              variant="primary"
              onClick={() => setIsCreateModalOpen(true)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Member
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 p-4 bg-background/50 backdrop-blur-sm rounded-lg border border-border/50">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-foreground-secondary" />
              <Text className="text-foreground-secondary">
                {members.length} {members.length === 1 ? "Member" : "Members"}
              </Text>
            </div>
            {group.budget && (
              <div className="flex items-center gap-2">
                <Text className="text-foreground-secondary">
                  Budget: ${group.budget.toFixed(2)}
                </Text>
              </div>
            )}
          </div>

          {/* Members List */}
          <div>
            {membersLoading ? (
              <div className="text-center py-12">
                <Text>Loading members...</Text>
              </div>
            ) : membersError ? (
              <div className="text-center text-error py-12">
                <Text>Error loading members. Please try again later.</Text>
              </div>
            ) : members.length === 0 ? (
              <div className="text-center py-12">
                <Text className="text-foreground-secondary">
                  No members yet. Add your first member to get started!
                </Text>
              </div>
            ) : (
              <MemberList
                members={members}
                group={group}
                onEditMember={setEditingMember}
                onDeleteMember={handleDeleteMember}
              />
            )}
          </div>
        </div>
      </Container>

      {/* Create Member Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New Member"
      >
        <MemberForm
          onSubmit={handleCreateMember}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      {/* Edit Member Modal */}
      <Modal
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
        title="Edit Member"
      >
        {editingMember && (
          <MemberForm
            member={editingMember}
            onSubmit={handleEditMember}
            onCancel={() => setEditingMember(null)}
          />
        )}
      </Modal>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
