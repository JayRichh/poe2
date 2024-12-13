import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

import { cn } from "~/utils/cn";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  className,
}: AccordionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpanded);

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setExpandedItems((current) =>
        current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId]
      );
    } else {
      setExpandedItems((current) => (current.includes(itemId) ? [] : [itemId]));
    }
  };

  const isExpanded = (itemId: string) => expandedItems.includes(itemId);

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "border-2 border-border/50 rounded-xl overflow-hidden",
            "bg-background/40 backdrop-blur-sm"
          )}
        >
          <button
            onClick={() => toggleItem(item.id)}
            className={cn(
              "w-full px-6 py-4",
              "flex items-center justify-between",
              "text-left focus:outline-none focus:ring-2 focus:ring-primary/50",
              isExpanded(item.id) && "border-b border-border/50"
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="font-medium">{item.title}</span>
            </div>
            <motion.div
              animate={{ rotate: isExpanded(item.id) ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▼
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {isExpanded(item.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-6 py-4">{item.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// Example usage:
export function AccordionDemo() {
  const faqItems = [
    {
      id: "1",
      title: "What is this template?",
      icon: <span className="text-lg">?</span>,
      content: (
        <p className="text-foreground/70">
          This is a modern Next.js template with TypeScript, Tailwind CSS, and Framer Motion. It
          includes various interactive components and utilities for rapid development.
        </p>
      ),
    },
    {
      id: "2",
      title: "How do I get started?",
      icon: <span className="text-lg">→</span>,
      content: (
        <p className="text-foreground/70">
          Clone the repository, install dependencies with npm install, and run npm run dev to start
          the development server.
        </p>
      ),
    },
    {
      id: "3",
      title: "Can I customize the components?",
      icon: <span className="text-lg">✎</span>,
      content: (
        <p className="text-foreground/70">
          Yes! All components are built with customization in mind. You can modify styles,
          behaviors, and extend functionality to suit your needs.
        </p>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <Accordion items={faqItems} />
      <Accordion items={faqItems} allowMultiple defaultExpanded={["1"]} />
    </div>
  );
}

// Code preview
export const accordionCode = `// Accordion Component Usage
const items = [
  {
    id: '1',
    title: 'Section Title',
    icon: <span className="text-lg">→</span>,
    content: <div>Section content...</div>
  }
];

// Single expansion
<Accordion items={items} />

// Multiple expansion
<Accordion 
  items={items} 
  allowMultiple 
  defaultExpanded={['1']}
/>

// With custom styling
<Accordion
  items={items}
  className="custom-accordion"
/>`;
