import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn("flex flex-row mt-4 gap-2 w-full", className)}
    {...props}
  />
));

Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex flex-col min-w-72 p-2 h-full bg-white rounded-md ",
      className
    )}
    {...props}
  />
));

TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative w-full h-full flex items-center justify-start px-4 py-2  text-sm font-medium transition-all duration-150 ease-in-out",
      
      "before:absolute before:top-0 before:bottom-[-2px] before:left-0 before:w-0.5 before:transition-width before:rounded-full",
      "data-[state=active]:text-primary data-[state=active]:text-lg data-[state=active]:before:bg-primary data-[state=active]:before:bottom-0.5 data-[state=active]:before:top-[4px]",
      "data-[state=inactive]:text-black data-[state=inactive]:before:bg-greyCold",
      className
    )}
    {...props}
  />
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "w-full mt-2 ring-offset-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
