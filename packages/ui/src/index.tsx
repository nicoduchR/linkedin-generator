import * as React from "react";

// Button component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50";
    
    const variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-100 active:bg-gray-200",
    };
    
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-2.5 text-lg",
    };
    
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`;
    
    return (
      <button className={classes} ref={ref} {...props} />
    );
  }
);

Button.displayName = "Button";

// Card component
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className || ''}`}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

// Card Header component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`border-b border-gray-200 p-4 ${className || ''}`}
        {...props}
      />
    );
  }
);

CardHeader.displayName = "CardHeader";

// Card Content component
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`p-4 ${className || ''}`}
        {...props}
      />
    );
  }
);

CardContent.displayName = "CardContent";

// Card Footer component
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`border-t border-gray-200 p-4 ${className || ''}`}
        {...props}
      />
    );
  }
);

CardFooter.displayName = "CardFooter";

// Input component
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input"; 