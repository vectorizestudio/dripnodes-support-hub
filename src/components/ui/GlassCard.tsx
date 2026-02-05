import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, glow = false, hover = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "glass-card p-6",
          glow && "neon-glow",
          hover && "transition-all duration-300 hover:border-primary/30 hover:shadow-lg",
          className
        )}
        whileHover={hover ? { y: -2 } : undefined}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";