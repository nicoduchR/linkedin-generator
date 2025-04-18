"use client";

import React from "react";

interface SliderProps {
  className?: string;
  defaultValue?: number[];
  max?: number;
  step?: number;
  value?: number[];
  onValueChange?: (values: number[]) => void;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      defaultValue = [50],
      max = 100,
      step = 1,
      value,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [values, setValues] = React.useState<number[]>(value || defaultValue);
    const sliderRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (value !== undefined) {
        setValues(value);
      }
    }, [value]);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const pos = ((e.clientX - rect.left) / rect.width) * max;
      const newValue = Math.max(
        0,
        Math.min(max, Math.round(pos / step) * step)
      );

      const newValues = [newValue];
      setValues(newValues);

      if (onValueChange) {
        onValueChange(newValues);
      }

      const handlePointerMove = (e: PointerEvent) => {
        if (!sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const pos = ((e.clientX - rect.left) / rect.width) * max;
        const newValue = Math.max(
          0,
          Math.min(max, Math.round(pos / step) * step)
        );

        const newValues = [newValue];
        setValues(newValues);

        if (onValueChange) {
          onValueChange(newValues);
        }
      };

      const handlePointerUp = () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    };

    return (
      <div
        ref={ref}
        className={`relative w-full h-5 flex items-center ${className || ""}`}
        {...props}
      >
        <div
          ref={sliderRef}
          className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
          onPointerDown={handlePointerDown}
        >
          <div
            className="absolute h-2 bg-blue-600 rounded-full"
            style={{
              width: `${(values[0] / max) * 100}%`,
            }}
          />
          <div
            className="absolute w-5 h-5 bg-white border border-gray-300 rounded-full shadow transform -translate-y-1/2 -translate-x-1/2 cursor-grab focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              top: "50%",
              left: `${(values[0] / max) * 100}%`,
            }}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";
