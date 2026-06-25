import type { Dict, Locale } from "./types";
import { ru } from "./ru";
import { uk } from "./uk";
import { en } from "./en";

export type { Dict, Locale };

export const locales: Locale[] = ["ru", "uk", "en"];
export const defaultLocale: Locale = "ru";

const dicts: Record<Locale, Dict> = { ru, uk, en };

export function getDictionary(locale: string): Dict {
  return dicts[(locale as Locale)] ?? ru;
}
