import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Generates an array of years from startYear to endYear.
 * @param {number} startYear - The starting year of the range.
 * @param {number} endYear - The ending year of the range.
 * @returns {number[]} An array containing every year from startYear to endYear.
 */
export const getYearsRange = (startYear, endYear) => {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
};



//----------zod : ex

// const zod = require("zod");

// // Define a schema
// const UserSchema = zod.object({
//   name: zod.string(),
//   age: zod.number(),
//   email: zod.string().email(),
// });

// // Data to be validated
// const userData = {
//   name: "John Doe",
//   age: 30,
//   email: "john@example.com",
// };

// // Validate the data
// const validationResult = UserSchema.safeParse(userData);

// if (validationResult.success) {
//   console.log("Validation succeeded:", validationResult.data);
// } else {
//   console.error("Validation failed:", validationResult.error.issues);
// }
