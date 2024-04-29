import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const ComboBoxComponent = ({ control, name, label, itemList, placeholder }) => {
  useEffect(() => {
    console.log(
      "Rendering ComboBoxComponent, itemList length:",
      itemList.length
    );
  }, [itemList]);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <div className="flex flex-col gap-1 hover:bg-bg h-fit py-2 px-4 rounded-full w-48 cursor-pointer">
                  <FormLabel className=" text-md font-medium cursor-pointer">
                    {label}
                  </FormLabel>
                  <p className=" text-sm font-normal">
                    {field.value
                      ? itemList.find((item) => item.value === field.value)
                          ?.label
                      : placeholder}
                  </p>
                </div>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col w-full p-0 shadow-[0_0px_20px_0px_rgba(0,0,0,0.2)]">
              <Command>
                <CommandEmpty>No item found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea
                    className={cn(
                      "w-full rounded-md",
                      itemList.length < 9 ? "h-fit" : "h-48"
                    )}
                  >
                    {itemList.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.label}
                        onSelect={() => {
                          field.onChange(item.value); // Update the value using react-hook-form's onChange
                        }}
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            item.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                        {item.label}
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
                <CommandInput
                  placeholder={`Search ${label.toLowerCase()}...`}
                />
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ComboBoxComponent;
