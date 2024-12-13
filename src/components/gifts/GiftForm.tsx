"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "~/components/ui/Button";
import type { Gift, GiftStatus } from "~/types/gift-list";
import { cn } from "~/utils/cn";

const giftFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  cost: z.number().positive("Cost must be greater than 0"),
  status: z.enum(["planned", "purchased", "delivered"] as const),
  tagsInput: z.string().optional(),
  notes: z.string().optional(),
  priority: z.number().min(1).max(3).optional(), // Changed from max(5) to max(3)
}).transform(data => ({
  name: data.name,
  cost: data.cost,
  status: data.status,
  tags: data.tagsInput 
    ? data.tagsInput.split(',').map(tag => tag.trim()).filter(Boolean)
    : undefined,
  notes: data.notes,
  priority: data.priority,
}));

type GiftFormInputs = {
  name: string;
  cost: number;
  status: GiftStatus;
  tagsInput: string;
  notes?: string;
  priority?: number;
};

interface GiftFormProps {
  gift?: Gift;
  onSubmit: (data: z.infer<typeof giftFormSchema>) => Promise<void>;
  onCancel?: () => void;
}

const statusOptions: { label: string; value: GiftStatus }[] = [
  { label: "Planned", value: "planned" },
  { label: "Purchased", value: "purchased" },
  { label: "Delivered", value: "delivered" },
];

export function GiftForm({ gift, onSubmit, onCancel }: GiftFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<GiftFormInputs>({
    resolver: zodResolver(giftFormSchema),
    defaultValues: {
      name: gift?.name || "",
      cost: gift?.cost || undefined,
      status: gift?.status || "planned",
      tagsInput: gift?.tags?.join(", ") || "",
      notes: gift?.notes || "",
      priority: gift?.priority || undefined,
    },
  });

  const handleFormSubmit = async (data: GiftFormInputs) => {
    try {
      const transformedData = giftFormSchema.parse(data);
      await onSubmit(transformedData);
      reset();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
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
              "w-full px-4 py-2.5 rounded-lg text-base",
              "bg-background/50 backdrop-blur-sm",
              "border-2 border-border/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              "transition duration-200",
              "placeholder:text-foreground-secondary/50",
              errors.name && "border-error/50 focus:ring-error/50"
            )}
            placeholder="Enter gift name"
            autoFocus
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cost Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-base font-medium text-foreground">
                Cost
              </label>
              {errors.cost && (
                <p className="text-sm text-error">{errors.cost.message}</p>
              )}
            </div>
            <input
              {...register("cost", {
                setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              })}
              type="number"
              step="0.01"
              min="0"
              className={cn(
                "w-full px-4 py-2.5 rounded-lg text-base",
                "bg-background/50 backdrop-blur-sm",
                "border-2 border-border/50",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                "transition duration-200",
                "placeholder:text-foreground-secondary/50",
                errors.cost && "border-error/50 focus:ring-error/50"
              )}
              placeholder="Enter cost"
            />
          </div>

          {/* Status Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-base font-medium text-foreground">
                Status
              </label>
            </div>
            <select
              {...register("status")}
              className={cn(
                "w-full px-4 py-2.5 rounded-lg text-base",
                "bg-background/50 backdrop-blur-sm",
                "border-2 border-border/50",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                "transition duration-200",
                "placeholder:text-foreground-secondary/50"
              )}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tags Field */}
        <div className="space-y-2">
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
              "w-full px-4 py-2.5 rounded-lg text-base",
              "bg-background/50 backdrop-blur-sm",
              "border-2 border-border/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              "transition duration-200",
              "placeholder:text-foreground-secondary/50"
            )}
            placeholder="e.g., electronics, books, clothing"
          />
          <p className="text-sm text-foreground-secondary">
            Add comma-separated tags to help categorize gifts
          </p>
        </div>

        {/* Priority Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <label className="text-base font-medium text-foreground">
              Priority
              <span className="ml-1 text-sm text-foreground-secondary font-normal">(Optional, 1-3)</span>
            </label>
            {errors.priority && (
              <p className="text-sm text-error">{errors.priority.message}</p>
            )}
          </div>
          <input
            {...register("priority", {
              setValueAs: (v) => (v === "" ? undefined : parseInt(v)),
            })}
            type="number"
            min="1"
            max="3"
            className={cn(
              "w-full px-4 py-2.5 rounded-lg text-base",
              "bg-background/50 backdrop-blur-sm",
              "border-2 border-border/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              "transition duration-200",
              "placeholder:text-foreground-secondary/50",
              errors.priority && "border-error/50 focus:ring-error/50"
            )}
            placeholder="Enter priority (1-3)"
          />
        </div>

        {/* Notes Field */}
        <div className="space-y-2">
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
              "w-full px-4 py-2.5 rounded-lg text-base",
              "bg-background/50 backdrop-blur-sm",
              "border-2 border-border/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              "transition duration-200",
              "placeholder:text-foreground-secondary/50",
              "min-h-[100px] resize-y"
            )}
            placeholder="Add any notes about this gift"
            rows={3}
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
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
            {gift ? "Update" : "Add"} Gift
          </Button>
        </div>
      </form>
    </div>
  );
}
