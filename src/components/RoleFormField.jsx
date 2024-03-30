import React from 'react';
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const RoleFormField = ({ control }) => {
  return (
    <FormField
      control={control}
      name="role"
      render={({ field }) => (
        <FormItem className="flex flex-col items-center mt-4">
          <FormLabel>I am:</FormLabel>
          <div className="mt-2">
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex"
            >
              <div className="flex">
                <div
                  className={cn(
                    "cursor-pointer space-x-2 flex items-center justify-center px-4 py-2 border text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2",
                    field.value === "client"
                      ? "bg-secondary border-primary rounded-l-full"
                      : "bg-white border-greyDark rounded-l-full"
                  )}
                >
                  <RadioGroupItem value="client" id="client" />
                  <Label
                    className={cn(
                      field.value === "client"
                        ? "text-primary"
                        : "text-greyDark"
                    )}
                    htmlFor="client"
                  >
                    A Client
                  </Label>
                </div>
                <div
                  className={cn(
                    "cursor-pointer flex items-center space-x-2 justify-center px-4 py-2 border-t border-b border-r text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2",
                    field.value === "expert"
                      ? "bg-secondary border-primary rounded-r-full"
                      : "bg-white border-greyDark rounded-r-full"
                  )}
                >
                  <RadioGroupItem value="expert" id="expert" />
                  <Label
                    className={cn(
                      field.value === "expert"
                        ? "text-primary"
                        : "text-greyDark"
                    )}
                    htmlFor="expert"
                  >
                    An Expert
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RoleFormField;
