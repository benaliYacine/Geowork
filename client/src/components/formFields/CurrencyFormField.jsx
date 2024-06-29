// components/CurrencyFormField.jsx
import React from "react";

import { cn } from "@/lib/utils";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

const defaultMaskOptions = {
  prefix: "DZD  ",
  suffix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ", ",
  allowDecimal: false,
  integerLimit: 10, // allows any length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

const CurrencyInput = React.forwardRef(
  ({ className, inputRef, ...inputProps }, ref) => {
    const currencyMask = createNumberMask(defaultMaskOptions);

    return (
      <MaskedInput
        ref={inputRef}
        {...inputProps}
        mask={currencyMask}
        guide={true}
        showMask
        className={cn(
          "flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border border-border  disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      />
    );
  }
);

const CurrencyFormField = ({
  control,
  name,
  label,
  placeholder,
  className,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field, fieldState: { error } }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <CurrencyInput
            {...field}
            placeholder={placeholder}
            className={cn("w-full", className)}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default CurrencyFormField;
