"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "~/components/ui/Button";
import type { Member } from "~/types/gift-list";
import { cn } from "~/utils/cn";

const memberFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  tagsInput: z.string().optional(),
  notes: z.string().optional(),
}).transform(data => ({
  ...data,
  tags: data.tagsInput 
    ? data.tagsInput.split(',').map(tag => tag.trim()).filter(Boolean)
    : undefined,
  tagsInput: undefined
}));

type MemberFormInputs = {
  name: string;
  tagsInput: string;
  notes?: string;
};

interface MemberFormProps {
  member?: Member;
  onSubmit: (data: z.infer<typeof memberFormSchema>) => Promise<void>;
  onCancel?: () => void;
}

export function MemberForm({ member, onSubmit, onCancel }: MemberFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MemberFormInputs>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      name: member?.name || "",
      tagsInput: member?.tags?.join(", ") || "",
      notes: member?.notes || "",
    },
  });

  const handleFormSubmit = async (data: MemberFormInputs) => {
    try {
      const transformedData = memberFormSchema.parse(data);
      await onSubmit(transformedData);
      reset();
    } catch (error) {
      // Error will be handled by the parent component
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Name Field */}
      <div className="space-y-3">
        <div className="flex justify-between items-baseline">
          <label className="text-base font-medium text-foreground">
            Name
          </label>
          {errors.name && (
            <p className="text-sm text-error">{errors.name.message}</p>
          )}
        </div>
        <input
          {...register("name")}
          className={cn(
            "w-full px-4 py-3 rounded-lg text-base",
            "bg-background/50 backdrop-blur-sm",
            "border-2 border-border/50",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            "transition duration-200",
            "placeholder:text-foreground-secondary/50",
            errors.name && "border-error/50 focus:ring-error/50"
          )}
          placeholder="Enter member's name"
          autoFocus
        />
      </div>

      {/* Tags Field */}
      <div className="space-y-3">
        <div className="flex justify-between items-baseline">
          <label className="text-base font-medium text-foreground">
            Tags
            <span className="ml-1 text-sm text-foreground-secondary font-normal">(Optional)</span>
          </label>
          {errors.tagsInput && (
            <p className="text-sm text-error">{errors.tagsInput.message}</p>
          )}
        </div>
        <input
          {...register("tagsInput")}
          className={cn(
            "w-full px-4 py-3 rounded-lg text-base",
            "bg-background/50 backdrop-blur-sm",
            "border-2 border-border/50",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            "transition duration-200",
            "placeholder:text-foreground-secondary/50"
          )}
          placeholder="e.g., family, friend, coworker"
        />
        <p className="text-sm text-foreground-secondary">
          Add comma-separated tags to help organize members (e.g., family, friend, coworker)
        </p>
      </div>

      {/* Notes Field */}
      <div className="space-y-3">
        <div className="flex justify-between items-baseline">
          <label className="text-base font-medium text-foreground">
            Notes
            <span className="ml-1 text-sm text-foreground-secondary font-normal">(Optional)</span>
          </label>
          {errors.notes && (
            <p className="text-sm text-error">{errors.notes.message}</p>
          )}
        </div>
        <textarea
          {...register("notes")}
          className={cn(
            "w-full px-4 py-3 rounded-lg text-base",
            "bg-background/50 backdrop-blur-sm",
            "border-2 border-border/50",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            "transition duration-200",
            "placeholder:text-foreground-secondary/50",
            "min-h-[120px] resize-y"
          )}
          placeholder="Add any additional notes about this member"
          rows={4}
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-border/50">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
            size="lg"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          size="lg"
        >
          {member ? "Update" : "Add"} Member
        </Button>
      </div>
    </form>
  );
}
