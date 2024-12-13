"use client";

import { Edit, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/Button";

interface ActionMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ActionMenu({ onEdit, onDelete }: ActionMenuProps) {
  return (
    <div className="flex items-center gap-2">
      {onEdit && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="h-8 px-2 hover:bg-primary/10 hover:text-primary"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      )}
      {onDelete && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="h-8 px-2 hover:bg-error/10 hover:text-error"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      )}
    </div>
  );
}
