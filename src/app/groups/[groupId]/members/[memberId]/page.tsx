"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Gift as GiftIcon } from "lucide-react";
import Link from "next/link";
import { useGroups } from "~/hooks/gift-list";
import { useMembers } from "~/hooks/gift-list";
import { useGifts } from "~/hooks/gift-list";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";
import { Button } from "~/components/ui/Button";
import { Modal } from "~/components/ui/Modal";
import { Toast } from "~/components/ui/Toast";
import { Spinner } from "~/components/ui/Spinner";
import { GiftForm } from "~/components/gifts/GiftForm";
import { GiftList } from "~/components/gifts/GiftList";
import type { Gift } from "~/types/gift-list";

type GiftFormData = Omit<Gift, 'id' | 'memberId' | 'createdAt' | 'updatedAt'>;
type GiftUpdateData = Partial<GiftFormData>;

export default function MemberPage() {
  const params = useParams();
  const router = useRouter();
  const groupIdOrSlug = params.groupId as string;
  const memberIdOrSlug = params.memberId as string;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingGift, setEditingGift] = useState<Gift | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  } | null>(null);

  const { groups, loading: groupsLoading } = useGroups();
  const group = groups.find(g => g.id === groupIdOrSlug || g.slug === groupIdOrSlug);

  const { members, loading: membersLoading } = useMembers(group?.id);
  const member = members.find(m => m.id === memberIdOrSlug || m.slug === memberIdOrSlug);

  const { 
    gifts,
    loading: giftsLoading,
    error: giftsError,
    createGift,
    updateGift,
    deleteGift,
  } = useGifts(member?.id);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast(prev => prev ? { ...prev, isVisible: false } : null);
    }, 3000);
  };

  const handleCreateGift = async (data: GiftFormData) => {
    if (isSubmitting || !member) return;
    setIsSubmitting(true);
    
    try {
      await createGift({ ...data, memberId: member.id });
      setIsCreateModalOpen(false);
      showToast("Gift added successfully!", "success");
    } catch (error) {
      showToast("Failed to add gift", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditGift = async (data: GiftUpdateData) => {
    if (!editingGift || isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      await updateGift(editingGift.id, data);
      setEditingGift(null);
      showToast("Gift updated successfully!", "success");
    } catch (error) {
      showToast("Failed to update gift", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteGift = async (gift: Gift) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      await deleteGift(gift.id);
      showToast("Gift deleted successfully!", "success");
    } catch (error) {
      showToast("Failed to delete gift", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (gift: Gift, status: Gift["status"]) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      await updateGift(gift.id, { status });
      showToast(`Gift marked as ${status}`, "success");
    } catch (error) {
      showToast("Failed to update gift status", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (groupsLoading || membersLoading) {
    return (
      <Container className="py-8">
        <div className="flex justify-center items-center py-12">
          <Spinner size="lg" />
        </div>
      </Container>
    );
  }

  if (!group || !member) {
    return (
      <Container className="py-8">
        <div className="text-center text-error">
          <Text>Member not found</Text>
          <Link href={group ? `/groups/${group.slug}` : "/groups"}>
            <Button variant="ghost" size="sm" className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {group ? `Back to ${group.name}` : "Back to Groups"}
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/groups/${group.slug}`}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to {group.name}
                </Button>
              </Link>
              <div>
                <Text variant="h1" className="text-3xl font-bold">
                  {member.name}
                </Text>
                {member.notes && (
                  <Text className="text-foreground-secondary mt-1">
                    {member.notes}
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
              Add Gift
            </Button>
          </div>

          <div className="flex items-center gap-4 p-4 bg-background/50 backdrop-blur-sm rounded-lg border border-border/50">
            <div className="flex items-center gap-2">
              <GiftIcon className="w-5 h-5 text-foreground-secondary" />
              <Text className="text-foreground-secondary">
                {gifts.length} {gifts.length === 1 ? "Gift" : "Gifts"}
              </Text>
            </div>
            {member.budget && (
              <div className="flex items-center gap-2">
                <Text className="text-foreground-secondary">
                  Budget: ${member.budget.toFixed(2)}
                </Text>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {giftsLoading ? (
              <div className="flex justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : giftsError ? (
              <div className="text-center text-error py-12">
                <Text>Error loading gifts. Please try again later.</Text>
              </div>
            ) : gifts.length === 0 ? (
              <div className="text-center py-12">
                <Text className="text-foreground-secondary">
                  No gifts yet. Add your first gift to get started!
                </Text>
              </div>
            ) : (
              <GiftList
                gifts={gifts}
                onEditGift={setEditingGift}
                onDeleteGift={handleDeleteGift}
                onStatusChange={handleStatusChange}
              />
            )}
          </motion.div>
        </div>
      </Container>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => !isSubmitting && setIsCreateModalOpen(false)}
        title="Add New Gift"
      >
        <GiftForm
          onSubmit={handleCreateGift}
          onCancel={() => !isSubmitting && setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingGift}
        onClose={() => !isSubmitting && setEditingGift(null)}
        title="Edit Gift"
      >
        {editingGift && (
          <GiftForm
            gift={editingGift}
            onSubmit={handleEditGift}
            onCancel={() => !isSubmitting && setEditingGift(null)}
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
