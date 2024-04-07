// // components/PhoneFormField.jsx
// import React from 'react';
// import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// import MaskedInput from 'react-text-mask';

// const PhoneInput = React.forwardRef(({ inputRef, ...inputProps }, ref) => {
//   // Algerian phone number mask
//   const phoneMask = [
//     '+', '2', '1', '3', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/
//   ];

//   return <MaskedInput ref={ref} {...inputProps} mask={phoneMask} guide={false} />;
// });

// const PhoneFormField = ({ control, name, label, placeholder }) => (
//   <FormField
//     control={control}
//     name={name}
//     render={({ field, fieldState: { error } }) => (
//       <FormItem>
//         <FormLabel>{label}</FormLabel>
//         <FormControl>
//           <PhoneInput {...field} placeholder={placeholder} className="w-full" />
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
// );

// export default PhoneFormField;

// components/PhoneFormField.jsx
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import MaskedInput from "react-text-mask";

// Algerian phone number mask
const algerianPhoneMask = [
  "0",
  /[567]/,
  " ",
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
];

const PhoneInput = React.forwardRef(({ inputRef, ...inputProps }, ref) => (
  <MaskedInput
    ref={ref}
    {...inputProps}
    mask={algerianPhoneMask}
    guide={true}
    className="flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border border-border  disabled:cursor-not-allowed disabled:opacity-50"
  />
));

const PhoneFormField = ({ control, name, label, placeholder }) => (
  <FormField
    control={control}
    name={name}
    render={({ field, fieldState: { error } }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <PhoneInput {...field} placeholder={placeholder} className="w-full" />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default PhoneFormField;
