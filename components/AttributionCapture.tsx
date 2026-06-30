"use client";

import { useEffect } from "react";
import { captureUtmFromUrl } from "@/lib/utm";

/** Persists first-touch UTMs for the session (runs once on load). */
export default function AttributionCapture() {
  useEffect(() => {
    captureUtmFromUrl();
  }, []);

  return null;
}
