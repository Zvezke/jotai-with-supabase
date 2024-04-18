"use client";
import React, { useRef } from "react";

import { useStore } from "jotai";
import { stablesAtom } from "./store/atoms";
import type { Stable } from "@/lib/types";

interface ParentProviderProps {
  children: React.ReactNode;
  data: Stable[];
}

const ParentProvider = ({
  children,
  data: supabaseData,
}: ParentProviderProps) => {
  const store = useStore();
  const loaded = useRef(false);
  if (!loaded.current) {
    store.set(stablesAtom, supabaseData);
    loaded.current = true;
  }
  return <>{children}</>;
};

export default ParentProvider;
