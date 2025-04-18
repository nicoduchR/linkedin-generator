"use client";

import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, onValueChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (onValueChange) {
        onValueChange(event.target.value);
      }
    };

    return (
      <select
        ref={ref}
        className={`form-select ${className || ""}`}
        onChange={handleChange}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

interface SelectTriggerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SelectTrigger = React.forwardRef<
  HTMLDivElement,
  SelectTriggerProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex h-10 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 opacity-50"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
});

SelectTrigger.displayName = "SelectTrigger";

interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
}

export const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, placeholder, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`block truncate ${!children && placeholder ? "text-gray-500" : ""} ${className || ""}`}
        {...props}
      >
        {children || placeholder}
      </span>
    );
  }
);

SelectValue.displayName = "SelectValue";

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SelectContent = React.forwardRef<
  HTMLDivElement,
  SelectContentProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-md animate-in fade-in-80 ${className || ""}`}
      {...props}
    />
  );
});

SelectContent.displayName = "SelectContent";

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-value={value}
        className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className || ""}`}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-primary" />
        </span>
        <span className="truncate">{children}</span>
      </div>
    );
  }
);

SelectItem.displayName = "SelectItem";
