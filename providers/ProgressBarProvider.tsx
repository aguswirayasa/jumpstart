"use client";
import React from "react";
import { Next13ProgressBar } from "next13-progressbar";
import { useHydration } from "@/hooks/useHydration";

const ProgressBarProviders = ({ children }: { children: React.ReactNode }) => {
  const isMounted = useHydration();
  if (!isMounted) {
    return null;
  }
  return (
    <>
      {children}
      <Next13ProgressBar
        height="4px"
        color="#1d4ed8"
        options={{ showSpinner: true }}
        showOnShallow
      />
    </>
  );
};

export default ProgressBarProviders;
