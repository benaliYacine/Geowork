// components/PasswordFormField.jsx

import { cn } from "@/lib/utils";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import GenericFormField from "./GenericFormField";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import classNames from "classnames";
const PasswordFormField = React.forwardRef(
  (
    {
      className,
      control,
      name,
      label = "Password",
      placeholder = "Your password",
      canTogleVisibility = true,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    function EyeButton() {
      return (
        <>{
          showPassword?(
          <Eye
            className = "m-2 h-4 w-4 shrink-0 opacity-50"
            onClick = { togglePasswordVisibility }
              />
        ): (
              <EyeOff
            className = "m-2 h-4 w-4 shrink-0 opacity-50"
            onClick = { togglePasswordVisibility }
          />
        )
      }</>
  );
    }
    return (
      <FormField
        ref={ref}
        {...props}
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder={placeholder}
                  {...field}
                  className={cn(`w-full pr-10`, className)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-2">
                  {canTogleVisibility && <EyeButton />}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);
export default PasswordFormField;
