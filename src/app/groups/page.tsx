"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useGroups, useGifts, useAllMembers } from "~/hooks/gift-list";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";
import { Button } from "~/components/ui/Button";
import { Spinner } from "~/components/ui/Spinner";
import { Modal } from "~/components/ui/Modal";
import { Toast } from "~/components/ui/Toast";
import { GroupForm } from "~/components/groups/GroupForm";
import { GroupList } from "~/components/groups/GroupList";
import { generateSlug } from "~/utils/slug";
import type { Group, BudgetPreference } from "~/types/gift-list";

export default function GroupsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  } | null>(null);
  
  const { 
    groups, 
    loading: groupsLoading, 
    error: groupsError, 
    createGroup,
    updateGroup,
    deleteGroup,
  } = useGroups();

  const { gifts, loading: giftsLoading } = useGifts();
  const { members, loading: membersLoading } = useAllMembers();

  const groupStats = useMemo(() => {
    const memberCounts: Record<string, number> = {};
    const giftCounts: Record<string, number> = {};
    const spentAmounts: Record<string, number> = {};

    members.forEach(member => {
      memberCounts[member.groupId] = (memberCounts[member.groupId] || 0) + 1;
    });

    gifts.forEach(gift => {
      const member = members.find(m => m.id === gift.memberId);
      if (member) {
        const groupId = member.groupId;
        giftCounts[groupId] = (giftCounts[groupId] || 0) + 1;
        spentAmounts[groupId] = (spentAmounts[groupId] || 0) + gift.cost;
      }
    });

    return {
      memberCounts,
      giftCounts,
      spentAmounts,
    };
  }, [members, gifts]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast(prev => prev ? { ...prev, isVisible: false } : null);
    }, 3000);
  };

  const handleCreateGroup = async (data: { 
    name: string; 
    description?: string; 
    budget?: number;
    priceRanges?: BudgetPreference["priceRanges"];
  }) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const storedPreferences = localStorage.getItem('budgetPreferences');
      const preferences = storedPreferences ? JSON.parse(storedPreferences) as BudgetPreference : null;
      
      if (!data.budget && preferences?.defaultBudget) {
        data.budget = preferences.defaultBudget;
      }
      
      if (!data.priceRanges && preferences?.priceRanges) {
        data.priceRanges = preferences.priceRanges;
      }
      
      const groupData = {
        ...data,
        slug: generateSlug(data.name)
      };
      
      await createGroup(groupData);
      setIsCreateModalOpen(false);
      showToast("Group created successfully!", "success");
    } catch (error) {
      showToast("Failed to create group", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditGroup = async (data: { 
    name: string; 
    description?: string; 
    budget?: number;
    priceRanges?: BudgetPreference["priceRanges"];
  }) => {
    if (!editingGroup || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await updateGroup(editingGroup.id, data);
      setEditingGroup(null);
      showToast("Group updated successfully!", "success");
    } catch (error) {
      showToast("Failed to update group", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteGroup = async (group: Group) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await deleteGroup(group.id);
      showToast("Group deleted successfully!", "success");
    } catch (error) {
      showToast("Failed to delete group", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const loading = groupsLoading || giftsLoading || membersLoading;
  const error = groupsError;

  return (
    <>
      <Container>
        <div className="space-y-8 sm:space-y-10">
          <div className="space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Text variant="h1" className="text-3xl sm:text-4xl font-bold">
                Gift Groups
              </Text>
              <Text className="text-foreground-secondary max-w-2xl text-base sm:text-lg">
                Create and manage gift groups for different occasions. Keep track of gifts, budgets,
                and progress all in one place.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center sm:justify-start"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => setIsCreateModalOpen(true)}
                className="gap-2 w-full sm:w-auto"
                disabled={isSubmitting}
              >
                <Plus className="w-5 h-5" />
                Create Group
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {loading ? (
              <div className="flex justify-center py-12 sm:py-16">
                <Spinner size="lg" />
              </div>
            ) : error ? (
              <div className="text-center py-12 sm:py-16">
                <Text className="text-error">Error loading groups. Please try again later.</Text>
              </div>
            ) : groups.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <Text className="text-foreground-secondary text-base sm:text-lg">
                  No gift groups yet. Create your first group to get started!
                </Text>
              </div>
            ) : (
              <GroupList
                groups={groups}
                memberCounts={groupStats.memberCounts}
                giftCounts={groupStats.giftCounts}
                spentAmounts={groupStats.spentAmounts}
                onEditGroup={setEditingGroup}
                onDeleteGroup={handleDeleteGroup}
              />
            )}
          </motion.div>
        </div>
      </Container>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => !isSubmitting && setIsCreateModalOpen(false)}
        title="Create New Group"
      >
        <GroupForm 
          onSubmit={handleCreateGroup} 
          onCancel={() => !isSubmitting && setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingGroup}
        onClose={() => !isSubmitting && setEditingGroup(null)}
        title="Edit Group"
      >
        {editingGroup && (
          <GroupForm
            group={editingGroup}
            onSubmit={handleEditGroup}
            onCancel={() => !isSubmitting && setEditingGroup(null)}
          />
        )}
      </Modal>

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
