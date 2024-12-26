"use client";

import { Edit2, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "~/utils/cn";

interface ActionDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
}

export function ActionDropdown({ onEdit, onDelete, disabled }: ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleAction = (action: 'edit' | 'delete') => (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    if (action === 'edit') onEdit();
    if (action === 'delete') onDelete();
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "p-2 rounded-md",
          "text-foreground/60 hover:text-primary hover:bg-muted/50",
          "focus:outline-none focus:ring-2 focus:ring-primary/70",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setIsOpen(false)}
          />
          <div
            className={cn(
              "absolute right-0 mt-1 w-36 z-40",
              "bg-background border border-border",
              "rounded-md shadow-lg overflow-hidden"
            )}
          >
            <button
              onClick={handleAction('edit')}
              className={cn(
                "w-full px-3 py-2 text-sm",
                "flex items-center gap-2",
                "hover:bg-muted/50 hover:text-primary",
                "focus:outline-none focus:bg-muted/50"
              )}
            >
              <Edit2 className="h-4 w-4" />
              Edit Build
            </button>
            <button
              onClick={handleAction('delete')}
              className={cn(
                "w-full px-3 py-2 text-sm",
                "flex items-center gap-2",
                "text-destructive hover:bg-destructive/10",
                "focus:outline-none focus:bg-destructive/10"
              )}
            >
              <Trash2 className="h-4 w-4" />
              Delete Build
            </button>
          </div>
        </>
      )}
    </div>
  );
}
