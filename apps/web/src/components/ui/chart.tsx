import React, { ReactNode } from "react";
import { TooltipProps, LegendProps } from "recharts";

// Types for chart configuration
export type ChartConfig = Record<
  string,
  {
    label: string;
    color: string;
  }
>;

// Chart Container Component
interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ className, children, config, ...props }, ref) => {
  // Create CSS variables for colors from config
  const style = Object.entries(config).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      acc[`--color-${key}`] = value.color;
      return acc;
    },
    {}
  );

  return (
    <div
      ref={ref}
      className={`w-full ${className || ""}`}
      style={style as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
});

ChartContainer.displayName = "ChartContainer";

// Chart Tooltip Component
interface ChartTooltipContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  payload?: any[];
  label?: string;
  labelFormatter?: (label: string) => React.ReactNode;
}

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(({ className, active, payload, label, labelFormatter, ...props }, ref) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={`rounded-lg border border-gray-200 bg-white p-2 shadow-sm ${className || ""}`}
      {...props}
    >
      <div className="text-xs font-medium text-gray-500">
        {labelFormatter ? labelFormatter(label || "") : label}
      </div>
      <div className="mt-1 flex flex-col gap-0.5">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs font-medium text-gray-900">
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

ChartTooltipContent.displayName = "ChartTooltipContent";

export function ChartTooltip(props: TooltipProps<number, string>) {
  return <>{props.content as ReactNode}</>;
}

// Chart Legend Component
interface ChartLegendContentProps extends React.HTMLAttributes<HTMLDivElement> {
  payload?: Array<{
    value?: string;
    color?: string;
    type?: string;
    id?: string;
  }>;
}

export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(({ className, payload, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex flex-wrap items-center justify-end gap-4 ${className || ""}`}
      {...props}
    >
      {payload?.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-1">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
});

ChartLegendContent.displayName = "ChartLegendContent";

export function ChartLegend(props: LegendProps) {
  return <>{props.content as ReactNode}</>;
}
