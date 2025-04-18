import React from "react";

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={`space-y-4 ${className || ""}`} {...props} />
    );
  }
);

Tabs.displayName = "Tabs";

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex space-x-1 rounded-lg bg-gray-100 p-1 ${className || ""}`}
        {...props}
      />
    );
  }
);

TabsList.displayName = "TabsList";

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  TabsTriggerProps
>(({ className, value, ...props }, ref) => {
  return (
    <button
      ref={ref}
      data-value={value}
      className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm ${className || ""}`}
      {...props}
    />
  );
});

TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-value={value}
        className={`mt-2 rounded-md ${className || ""}`}
        {...props}
      />
    );
  }
);

TabsContent.displayName = "TabsContent";
