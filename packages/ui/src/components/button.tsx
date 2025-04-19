"use client";

import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "default", size = "default", ...props },
    ref
  ) => {
    const sizeClasses: Record<string, string> = {
      sm: "px-3 py-1.5 text-sm",
      default: "px-4 py-2 text-base",
      lg: "px-5 py-2.5 text-lg",
      icon: "h-8 w-8 p-0",
    };

    const variantClasses: Record<string, string> = {
      default:
        "bg-linkedin-blue text-white hover:bg-linkedin-darkBlue focus:ring-linkedin-blue",
      outline:
        "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
      secondary:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400",
      ghost:
        "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
    };

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
