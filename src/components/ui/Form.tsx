import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import * as z from "zod";

import { InputHTMLAttributes, forwardRef } from "react";
import { useForm } from "react-hook-form";

import { cn } from "~/utils/cn";

const formSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

interface FormFieldProps {
  label: string;
  type?: string;
  error?: string;
  className?: string;
}

const FormField = forwardRef<
  HTMLInputElement,
  FormFieldProps & InputHTMLAttributes<HTMLInputElement>
>(({ label, type = "text", error, className, ...props }, ref) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full px-4 py-2 rounded-lg",
          "bg-background/50 backdrop-blur-sm",
          "border-2 border-border/50",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          "transition duration-200",
          error && "border-red-500/50 focus:ring-red-500/50",
          className
        )}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

FormField.displayName = "FormField";

interface FormProps {
  onSubmit?: (data: FormData) => void;
  className?: string;
}

export function Form({ onSubmit, className }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit?.(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={cn("space-y-6", className)}>
      <FormField label="Email" type="email" error={errors.email?.message} {...register("email")} />

      <FormField
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />

      <FormField
        label="Confirm Password"
        type="password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "w-full px-6 py-3 rounded-lg",
          "bg-primary text-primary-foreground",
          "font-medium shadow-lg",
          "hover:bg-primary/90",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          "transition duration-200"
        )}
      >
        Submit
      </motion.button>
    </form>
  );
}
