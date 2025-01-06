// eslint-disable-next-line no-restricted-imports
import { config, clsx } from "cvu";
import { twMerge } from "tailwind-merge";

export const cvu = config({
  clsx: (...inputs) => twMerge(clsx(inputs)),
});
