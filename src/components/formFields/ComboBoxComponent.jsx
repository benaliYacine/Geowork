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
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="white"
                  role="combobox"
                  className="w-full justify-between hover:scale-100 rounded-md"
                >
                  {field.value && field.value != ""
                    ? itemList.find((item) => item.value === field.value)?.label
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col w-full p-0">
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
