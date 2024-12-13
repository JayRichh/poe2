"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "~/components/ui/Button";
import { Select } from "~/components/ui/Select";
import type { Group, BudgetPreference, PriceRange } from "~/types/gift-list";
import { cn } from "~/utils/cn";
import { useEffect, useState } from "react";

const groupFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  budget: z.number().positive("Budget must be greater than 0").optional(),
  trackingLevel: z.enum(["group", "member", "both"]).optional(),
  priceRanges: z.array(z.object({
    min: z.number().min(0),
    max: z.number().positive(),
    label: z.string(),
  })).optional(),
});

type GroupFormData = z.infer<typeof groupFormSchema>;

interface GroupFormProps {
  group?: Group;
  onSubmit: (data: GroupFormData) => Promise<void>;
  onCancel?: () => void;
}

export function GroupForm({ group, onSubmit, onCancel }: GroupFormProps) {
  const [preferences, setPreferences] = useState<BudgetPreference | null>(null);
  const [showPriceRanges, setShowPriceRanges] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
    control,
  } = useForm<GroupFormData>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
      name: group?.name || "",
      description: group?.description || "",
      budget: group?.budget || undefined,
      trackingLevel: group?.trackingLevel || undefined,
      priceRanges: group?.priceRanges || undefined,
    },
  });

  useEffect(() => {
    const storedPreferences = localStorage.getItem('budgetPreferences');
    if (storedPreferences) {
      const prefs = JSON.parse(storedPreferences) as BudgetPreference;
      setPreferences(prefs);

      if (!group) {
        if (prefs.defaultBudget) {
          setValue('budget', prefs.defaultBudget);
        }
        setValue('trackingLevel', prefs.trackingLevel);
        setValue('priceRanges', prefs.priceRanges);
      }
    }
  }, [group, setValue]);

  const handleFormSubmit = async (data: GroupFormData) => {
    try {
      const formData = {
        ...data,
        priceRanges: showPriceRanges ? data.priceRanges : undefined,
      };
      await onSubmit(formData);
      reset();
    } catch (error) {
      throw error;
    }
  };

  const currentPriceRanges = watch('priceRanges') || [];

  const addPriceRange = () => {
    const newRange: PriceRange = {
      min: 0,
      max: 100,
      label: `Range ${currentPriceRanges.length + 1}`,
    };
    setValue('priceRanges', [...currentPriceRanges, newRange]);
  };

  const removePriceRange = (index: number) => {
    setValue('priceRanges', currentPriceRanges.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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
            "w-full px-3 py-2 rounded-lg text-base",
            "bg-background/50 backdrop-blur-sm",
            "border-2 border-border/50",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            "transition duration-200",
            "placeholder:text-foreground-secondary/50",
            errors.name && "border-error/50 focus:ring-error/50"
          )}
          placeholder="Enter a name for your group"
          autoFocus
        />
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <label className="text-base font-medium text-foreground">
            Description
            <span className="ml-1 text-sm text-foreground-secondary font-normal">(Optional)</span>
          </label>
          {errors.description && (
            <p className="text-sm text-error">{errors.description.message}</p>
          )}
        </div>
        <textarea
          {...register("description")}
          className={cn(
            "w-full px-3 py-2 rounded-lg text-base",
            "bg-background/50 backdrop-blur-sm",
            "border-2 border-border/50",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            "transition duration-200",
            "placeholder:text-foreground-secondary/50",
            "min-h-[80px] resize-y",
            errors.description && "border-error/50 focus:ring-error/50"
          )}
          placeholder="Add a description to help others understand the purpose of this group"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Budget Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <label className="text-base font-medium text-foreground">
              Budget
              <span className="ml-1 text-sm text-foreground-secondary font-normal">(Optional)</span>
            </label>
            {errors.budget && (
              <p className="text-sm text-error">{errors.budget.message}</p>
            )}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary">$</span>
            <input
              {...register("budget", {
                setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
              })}
              type="number"
              step="0.01"
              min="0"
              className={cn(
                "w-full pl-7 pr-3 py-2 rounded-lg text-base",
                "bg-background/50 backdrop-blur-sm",
                "border-2 border-border/50",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                "transition duration-200",
                "placeholder:text-foreground-secondary/50",
                errors.budget && "border-error/50 focus:ring-error/50"
              )}
              placeholder="Set a budget"
            />
          </div>
          <p className="text-sm text-foreground-secondary">
            Set a budget to track spending
          </p>
        </div>

        {/* Budget Tracking Level */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <label className="text-base font-medium text-foreground">
              Budget Tracking Level
            </label>
            {errors.trackingLevel && (
              <p className="text-sm text-error">{errors.trackingLevel.message}</p>
            )}
          </div>
          <Controller
            name="trackingLevel"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || ""}
                onChange={field.onChange}
                options={[
                  { value: "group", label: "Track at Group Level" },
                  { value: "member", label: "Track at Member Level" },
                  { value: "both", label: "Track at Both Levels" },
                ]}
                className="w-full"
              />
            )}
          />
        </div>
      </div>

      {/* Price Ranges */}
      <div className="space-y-3 bg-background/30 p-3 rounded-lg border-2 border-border/50">
        <div className="flex items-center justify-between">
          <label className="text-base font-medium text-foreground">
            Price Ranges
            <span className="ml-1 text-sm text-foreground-secondary font-normal">(Optional)</span>
          </label>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setShowPriceRanges(!showPriceRanges)}
          >
            {showPriceRanges ? "Hide" : "Show"} Price Ranges
          </Button>
        </div>

        {showPriceRanges && (
          <div className="space-y-2 mt-3 max-h-[200px] overflow-y-auto">
            {currentPriceRanges.map((range, index) => (
              <div key={index} className="flex flex-col gap-2 bg-background/50 p-2 rounded-lg">
                <input
                  {...register(`priceRanges.${index}.label`)}
                  className={cn(
                    "w-full px-2 py-1.5 rounded-md text-sm",
                    "bg-background/50 backdrop-blur-sm",
                    "border-2 border-border/50",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50",
                    "transition duration-200"
                  )}
                  placeholder="Range Label"
                />
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-1">
                    <span className="text-sm">$</span>
                    <input
                      {...register(`priceRanges.${index}.min`, { valueAsNumber: true })}
                      type="number"
                      className={cn(
                        "w-full px-2 py-1.5 rounded-md text-sm",
                        "bg-background/50 backdrop-blur-sm",
                        "border-2 border-border/50",
                        "focus:outline-none focus:ring-2 focus:ring-primary/50",
                        "transition duration-200"
                      )}
                      placeholder="Min"
                    />
                  </div>
                  <span className="text-sm">-</span>
                  <div className="flex-1 flex items-center gap-1">
                    <span className="text-sm">$</span>
                    <input
                      {...register(`priceRanges.${index}.max`, { valueAsNumber: true })}
                      type="number"
                      className={cn(
                        "w-full px-2 py-1.5 rounded-md text-sm",
                        "bg-background/50 backdrop-blur-sm",
                        "border-2 border-border/50",
                        "focus:outline-none focus:ring-2 focus:ring-primary/50",
                        "transition duration-200"
                      )}
                      placeholder="Max"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => removePriceRange(index)}
                    className="shrink-0"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={addPriceRange}
              className="w-full"
            >
              Add Price Range
            </Button>
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-2 pt-4 border-t border-border/50">
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
          {group ? "Update" : "Create"} Group
        </Button>
      </div>
    </form>
  );
}
