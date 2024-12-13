import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

import { cn } from "~/utils/cn";

import { Button } from "./Button";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

const toastStyles: Record<ToastType, string> = {
  success: "bg-green-500/90 text-white",
  error: "bg-red-500/90 text-white",
  info: "bg-blue-500/90 text-white",
  warning: "bg-yellow-500/90 text-white",
};

const toastIcons: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
  warning: "⚠",
};

export function Toast({ message, type = "info", isVisible, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div
            className={cn(
              "px-6 py-4 rounded-lg shadow-lg backdrop-blur-sm",
              "flex items-center gap-3",
              toastStyles[type]
            )}
          >
            <span className="text-lg">{toastIcons[type]}</span>
            <p className="font-medium">{message}</p>
            <button onClick={onClose} className="ml-4 hover:opacity-80 transition-opacity">
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Example usage:
export function ToastDemo() {
  const [isVisible, setIsVisible] = useState(false);
  const [toastType, setToastType] = useState<ToastType>("success");

  const showToast = (type: ToastType) => {
    setToastType(type);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000);
  };

  return (
    <div className="space-x-2">
      <Button onClick={() => showToast("success")}>Success</Button>
      <Button onClick={() => showToast("error")}>Error</Button>
      <Button onClick={() => showToast("info")}>Info</Button>
      <Button onClick={() => showToast("warning")}>Warning</Button>

      <Toast
        message={`This is a ${toastType} message!`}
        type={toastType}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </div>
  );
}

// Code preview
export const toastCode = `// Toast Component Usage
const [isVisible, setIsVisible] = useState(false);
const [toastType, setToastType] = useState<ToastType>('success');

const showToast = (type: ToastType) => {
  setToastType(type);
  setIsVisible(true);
  setTimeout(() => setIsVisible(false), 3000);
};

<Toast
  message="Operation successful!"
  type="success"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
/>`;
