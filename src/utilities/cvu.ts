// eslint-disable-next-line no-restricted-imports
import { config, cx } from "cvu";
import { twMerge } from "tailwind-merge";

export const cvu = config({
  cx: (...inputs) => twMerge(cx(inputs)),
});
