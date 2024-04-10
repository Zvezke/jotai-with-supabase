"use client";
import React, { useRef } from "react";

import { useStore } from "jotai";
import { dataAtom } from "./store/atoms";

interface Data {
  id: string;
  created_at: string;
  title: string;
  body: string;
}

interface ClientComponentProps {
  children: React.ReactNode;
  data: Data[];
}

const ClientComponentInitiatingJotai = ({
  children,
  data: supabaseData,
}: ClientComponentProps) => {
  const store = useStore();
  const loaded = useRef(false);
  if (!loaded.current) {
    store.set(dataAtom, supabaseData);
    loaded.current = true;
  }
  return <>{children}</>;
};

export default ClientComponentInitiatingJotai;
