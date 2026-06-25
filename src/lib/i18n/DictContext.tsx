"use client";

import { createContext, useContext, useState } from "react";
import type { Dict, Locale } from "./types";
import { getDictionary } from "./index";

interface DictCtx {
  dict: Dict;
  locale: Locale;
  setLocale: (l: Locale) => void;
}

const DictContext = createContext<DictCtx | null>(null);

export function DictProvider({ dict: initial, children }: { dict: Dict; children: React.ReactNode }) {
  const [dict, setDict] = useState(initial);
  const [locale, setLocaleState] = useState<Locale>(initial.locale);

  const setLocale = (l: Locale) => {
    if (l === locale) return;
    setDict(getDictionary(l));
    setLocaleState(l);
    window.history.replaceState({}, "", `/${l}`);
  };

  return (
    <DictContext.Provider value={{ dict, locale, setLocale }}>
      {children}
    </DictContext.Provider>
  );
}

export function useDict(): Dict {
  const ctx = useContext(DictContext);
  if (!ctx) throw new Error("useDict must be inside DictProvider");
  return ctx.dict;
}

export function useLang(): { locale: Locale; setLocale: (l: Locale) => void } {
  const ctx = useContext(DictContext);
  if (!ctx) throw new Error("useLang must be inside DictProvider");
  return { locale: ctx.locale, setLocale: ctx.setLocale };
}
