import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(
  ({ className, height = "80px", ...props }, ref) => {
    return (
      <textarea
        style={{ height: height }}
        className={cn(
          `flex w-full min-h-16 rounded-md bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:border border-border focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
