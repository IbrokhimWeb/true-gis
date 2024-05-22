import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, any>(
  ({ className, type, ...props }, ref) => {
    return (
      <>
        <input
          ref={ref}
          {...props}
          type={type}
          className={cn(
            "flex h-11 w-full rounded-md border border-[#333741] bg-[#101828]/5 px-[10px] py-[14px] text-base text-[#F5F5F6] font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#85888E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2970FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            props?.error
              ? "ring-2 ring-[#D80027] focus-visible:ring-2 focus-visible:ring-[#D80027] shadow-sm shadow-[#D80027]/24"
              : "",
          )}
        />
        {props?.error ? (
          <p className="text-sm text-[#D80027] mt-2">
            Ushbu maydon to’g’ri to’ldirilishi shart!
          </p>
        ) : null}
      </>
    );
  },
);
Input.displayName = "Input";

export { Input };
