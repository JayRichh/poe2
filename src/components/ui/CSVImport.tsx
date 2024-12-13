"use client";

import * as React from "react";
import { Upload, X, Clipboard, Save, Download } from "lucide-react";
import { Button } from "./Button";
import { Text } from "./Text";
import { cn } from "../../utils/cn";
import type { Group, Member, Gift } from "~/types/gift-list";
import { generateSlug } from "~/utils/slug";
import { useAuth } from "~/contexts/auth";

interface FieldMapping {
  recipient: string;
  gift: string;
  budget: string;
  cost: string;
  status: string;
  store: string;
  category: string;
  priority: string;
  orderNumber: string;
  delivery: string;
  notes: string;
}

// Common variations of field names
const fieldVariations = {
  recipient: ["recipient", "name", "person", "for", "to"],
  gift: ["gift", "item", "present", "description"],
  budget: ["budget", "limit", "max", "planned cost"],
  cost: ["cost", "price", "amount", "spent", "actual"],
  status: ["status", "state", "purchased", "bought"],
  store: ["store", "shop", "retailer", "vendor", "where"],
  category: ["category", "type", "group", "kind"],
  priority: ["priority", "importance", "urgent"],
  orderNumber: ["order", "tracking", "reference"],
  delivery: ["delivery", "shipping", "received"],
  notes: ["notes", "comments", "details", "extra"]
};

interface CSVImportProps {
  onImport: (data: { groups: any[], members: any[], gifts: any[] }) => void;
}

export function CSVImport({ onImport }: CSVImportProps) {
  const [csvData, setCSVData] = React.useState<any[]>([]);
  const [headers, setHeaders] = React.useState<string[]>([]);
  const [importing, setImporting] = React.useState(false);
  const [showPaste, setShowPaste] = React.useState(false);
  const [showMapping, setShowMapping] = React.useState(false);
  const [mapping, setMapping] = React.useState<FieldMapping>({
    recipient: "",
    gift: "",
    budget: "",
    cost: "",
    status: "",
    store: "",
    category: "",
    priority: "",
    orderNumber: "",
    delivery: "",
    notes: ""
  });
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth();

  // Auto-detect field mappings based on common variations
  const detectFieldMappings = (headers: string[]) => {
    const newMapping = { ...mapping };
    
    Object.entries(fieldVariations).forEach(([field, variations]) => {
      const matchedHeader = headers.find(header => 
        variations.some(v => header.toLowerCase().includes(v))
      );
      if (matchedHeader) {
        newMapping[field as keyof FieldMapping] = matchedHeader;
      }
    });

    setMapping(newMapping);
  };

  const processCSVText = (text: string) => {
    const rows = text.split("\n");
    const headers = rows[0].split(",").map(h => h.trim());
    setHeaders(headers);
    detectFieldMappings(headers);
    
    const data = rows.slice(1)
      .filter(row => row.trim())
      .map(row => {
        const values = row.split(",").map(v => v.trim());
        return headers.reduce((obj, header, index) => {
          obj[header] = values[index] || "";
          return obj;
        }, {} as any);
      });
    
    setCSVData(data);
    setShowMapping(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        processCSVText(text);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handlePaste = () => {
    const text = textareaRef.current?.value;
    if (text) {
      processCSVText(text);
      setShowPaste(false);
    }
  };

  const mapStatus = (row: any): Gift["status"] => {
    const status = (
      row[mapping.status] || 
      row[mapping.delivery] || 
      ""
    ).toLowerCase();

    if (status.includes("need") || status === "") return "planned";
    if (status.includes("deliver") || status.includes("received")) return "delivered";
    if (status.includes("purchas") || status.includes("bought")) return "purchased";
    return "planned";
  };

  const handleImport = () => {
    if (!csvData.length || !user) return;
    setImporting(true);

    try {
      const timestamp = new Date().toISOString();
      const importedData = {
        groups: [] as any[],
        members: [] as any[],
        gifts: [] as any[]
      };

      // Create a default group with user_id
      const defaultGroup = {
        id: crypto.randomUUID(),
        user_id: user.id, // Add user_id here
        slug: "imported-gifts",
        name: "Imported Gifts",
        description: "Imported from CSV on " + new Date().toLocaleDateString(),
        created_at: timestamp,
        updated_at: timestamp
      };
      importedData.groups.push(defaultGroup);

      // First pass: Create members
      const memberTotals = new Map<string, { count: number; spent: number; budget: number }>();
      csvData.forEach(row => {
        const recipientName = row[mapping.recipient];
        if (!recipientName) return;

        const current = memberTotals.get(recipientName) || { count: 0, spent: 0, budget: 0 };
        const cost = parseFloat(row[mapping.cost]) || 0;
        const budget = parseFloat(row[mapping.budget]) || 0;

        current.count++;
        current.spent += cost;
        if (budget > current.budget) current.budget = budget;

        memberTotals.set(recipientName, current);
      });

      memberTotals.forEach((totals, recipientName) => {
        const member = {
          id: crypto.randomUUID(),
          slug: generateSlug(recipientName),
          group_id: defaultGroup.id,
          name: recipientName,
          budget: totals.budget || undefined,
          notes: `Total Gifts: ${totals.count}\nTotal Spent: $${totals.spent.toFixed(2)}`,
          created_at: timestamp,
          updated_at: timestamp
        };
        importedData.members.push(member);
      });

      // Second pass: Create gifts
      csvData.forEach(row => {
        const recipientName = row[mapping.recipient];
        if (!recipientName) return;

        const member = importedData.members.find(m => m.name === recipientName);
        if (!member) return;

        const giftName = row[mapping.gift];
        if (giftName) {
          // Combine metadata into notes
          const notes = [
            row[mapping.store] && `Store: ${row[mapping.store]}`,
            row[mapping.category] && `Category: ${row[mapping.category]}`,
            row[mapping.orderNumber] && `Order #: ${row[mapping.orderNumber]}`,
            row[mapping.delivery] && `Delivery: ${row[mapping.delivery]}`,
            row[mapping.notes] && row[mapping.notes]
          ].filter(Boolean).join("\n");

          const gift = {
            id: crypto.randomUUID(),
            member_id: member.id,
            name: giftName,
            cost: parseFloat(row[mapping.cost]) || 0,
            status: mapStatus(row),
            notes: notes || undefined,
            priority: parseInt(row[mapping.priority]) || undefined,
            created_at: timestamp,
            updated_at: timestamp
          };
          importedData.gifts.push(gift);
        }
      });

      onImport(importedData);
    } catch (error) {
      console.error("Error importing data:", error);
    } finally {
      setImporting(false);
    }
  };

  // Save current mapping to localStorage
  const saveMapping = () => {
    try {
      localStorage.setItem('csv-import-mapping', JSON.stringify(mapping));
    } catch (error) {
      console.error("Error saving mapping:", error);
    }
  };

  // Load saved mapping from localStorage
  const loadMapping = () => {
    try {
      const saved = localStorage.getItem('csv-import-mapping');
      if (saved) {
        setMapping(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error loading mapping:", error);
    }
  };

  if (showPaste) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Text className="font-medium">Paste CSV Data</Text>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPaste(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <textarea
          ref={textareaRef}
          className={cn(
            "w-full h-32 p-2 rounded-lg resize-none",
            "bg-background/95",
            "border-2 border-border/50",
            "focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
          )}
          placeholder="Paste your CSV data here..."
        />
        <Button
          variant="primary"
          onClick={handlePaste}
          className="w-full"
        >
          Process Data
        </Button>
      </div>
    );
  }

  if (showMapping) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Text className="font-medium">Map Fields</Text>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={saveMapping}
              title="Save mapping"
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={loadMapping}
              title="Load saved mapping"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowMapping(false);
                setCSVData([]);
                setHeaders([]);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {Object.entries(mapping).map(([field, value]) => (
            <div key={field} className="flex items-center gap-2">
              <Text className="text-sm w-24 capitalize">{field}:</Text>
              <select
                value={value}
                onChange={(e) => setMapping(prev => ({ ...prev, [field]: e.target.value }))}
                className={cn(
                  "flex-1 h-8 rounded-lg text-sm",
                  "bg-background/95",
                  "border-2 border-border/50",
                  "focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                )}
              >
                <option value="">Select field</option>
                {headers.map(header => (
                  <option key={header} value={header}>{header}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Text className="font-medium">Preview</Text>
          <div className="max-h-48 overflow-y-auto rounded-lg border-2 border-border/50">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-background/95">
                <tr className="border-b border-border/50">
                  <th className="p-2 text-left">Recipient</th>
                  <th className="p-2 text-left">Gift</th>
                  <th className="p-2 text-left">Cost</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {csvData.slice(0, 5).map((row, index) => (
                  <tr key={index} className="border-b border-border/50 last:border-0">
                    <td className="p-2">{row[mapping.recipient]}</td>
                    <td className="p-2">{row[mapping.gift]}</td>
                    <td className="p-2">${row[mapping.cost] || "0"}</td>
                    <td className="p-2">{mapStatus(row)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={handleImport}
          className="w-full"
          disabled={importing || !mapping.recipient || !mapping.gift}
        >
          {importing ? "Importing..." : `Import ${csvData.length} Items`}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="flex-1 flex items-center gap-2"
        onClick={() => setShowPaste(true)}
      >
        <Clipboard className="h-4 w-4" />
        Paste CSV
      </Button>
      <label className="flex-1">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload CSV
        </Button>
      </label>
    </div>
  );
}
