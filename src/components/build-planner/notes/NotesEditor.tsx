import { Pencil } from "lucide-react";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

import dynamic from "next/dynamic";

import { Button } from "~/components/ui/Button";

const MDEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), {
  ssr: false,
});

interface NotesEditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
}

export function NotesEditor({ content, onChange, className = "" }: NotesEditorProps) {
  const [editMode, setEditMode] = useState(true);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setEditMode(!editMode)}
          className={editMode ? "text-primary" : ""}
        >
          <Pencil className="h-4 w-4 mr-2" />
          {editMode ? "Preview" : "Edit"}
        </Button>
      </div>

      <div
        className={`min-h-[200px] transition-all ${
          editMode ? "" : "prose prose-invert max-w-none"
        }`}
      >
        {editMode ? (
          <MDEditor
            value={content}
            onChange={(value) => onChange(value || "")}
            preview="edit"
            className="border border-border/50 rounded-lg"
          />
        ) : (
          <div className="p-4 border border-border/50 rounded-lg">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSanitize]}>
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
