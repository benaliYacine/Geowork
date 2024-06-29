import * as React from "react";
import IconButton from "@/components/common/IconButton";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  const [month, setMonth] = React.useState(new Date());

  const nextYear = () => {
    console.log(month);
    setMonth((currentMonth) => {
      let newMonth = new Date(
        currentMonth.getFullYear() + 1,
        currentMonth.getMonth(),
        currentMonth.getDate()
      );
      return newMonth;
    });
  };
  const preYear = () => {
    console.log(month);
    setMonth((currentMonth) => {
      let newMonth = new Date(
        currentMonth.getFullYear() - 1,
        currentMonth.getMonth(),
        currentMonth.getDate()
      );
      return newMonth;
    });
  };
  const nextMonth = () => {
    setMonth((currentMonth) => {
      let newMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        currentMonth.getDate()
      );
      return newMonth;
    });
  };

  const preMonth = () => {
    setMonth((currentMonth) => {
      let newMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        currentMonth.getDate()
      );
      return newMonth;
    });
  };

  const footer = (
    <div className="relative">
      <IconButton
        variant="outlined"
        onClick={() => preYear()}
        className="absolute left-0 top-[-326px] h-7 w-7 p-[6.5px] opacity-50 hover:opacity-100"
      >
        <ChevronsLeft className="h-4 w-4" />
      </IconButton>

      <IconButton
        variant="outlined"
        onClick={() => preMonth()}
        className="absolute left-9 top-[-326px] h-7 w-7 p-[6.5px] opacity-50 hover:opacity-100"
      >
        <ChevronLeft className="h-4 w-4" />
      </IconButton>

      <IconButton
        variant="outlined"
        onClick={() => nextYear()}
        className="absolute right-0 top-[-326px] h-7 w-7 p-[6.5px] opacity-50 hover:opacity-100"
      >
        <ChevronsRight className="h-4 w-4" />
      </IconButton>
      <IconButton
        variant="outlined"
        onClick={() => nextMonth()}
        className="absolute right-9 top-[-326px] h-7 w-7 p-[6.5px] opacity-50 hover:opacity-100"
      >
        <ChevronRight className="h-4 w-4" />
      </IconButton>
    </div>
  );
  return (
    <DayPicker
      fixedWeeks
      footer={footer}
      showOutsideDays={showOutsideDays}
      month={month}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-10 hidden",
        nav_button_next: "absolute right-10 hidden",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-slate-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-slate-400",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100/50  first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-slate-800/50 dark:[&:has([aria-selected])]:bg-slate-800",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-slate-50 hover:bg-primary hover:text-slate-50 focus:bg-primary focus:text-slate-50 dark:bg-slate-50 dark:text-primary dark:hover:bg-slate-50 dark:hover:text-primary dark:focus:bg-slate-50 dark:focus:text-primary",
        day_today:
          "bg-slate-100 text-primary dark:bg-slate-800 dark:text-slate-50",
        day_outside:
          "day-outside text-slate-500 opacity-50 aria-selected:bg-slate-100/50 aria-selected:text-slate-500 aria-selected:opacity-30 dark:text-slate-400 dark:aria-selected:bg-slate-800/50 dark:aria-selected:text-slate-400",
        day_disabled: "text-slate-500 opacity-50 dark:text-slate-400",
        day_range_middle:
          "aria-selected:bg-slate-100 aria-selected:text-primary dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{}}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
