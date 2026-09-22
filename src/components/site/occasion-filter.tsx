import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type Ctx = {
  occasion: string | null;
  setOccasion: (name: string | null) => void;
};

const OccasionFilterContext = createContext<Ctx>({ occasion: null, setOccasion: () => {} });

export function OccasionFilterProvider({ children }: { children: ReactNode }) {
  const [occasion, setOccasion] = useState<string | null>(null);
  const value = useMemo(() => ({ occasion, setOccasion }), [occasion]);
  return <OccasionFilterContext.Provider value={value}>{children}</OccasionFilterContext.Provider>;
}

export function useOccasionFilter() {
  return useContext(OccasionFilterContext);
}
