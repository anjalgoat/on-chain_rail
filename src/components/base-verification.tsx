"use client";

import { useEffect } from "react";

export function BaseVerification() {
  useEffect(() => {
    if (!document.querySelector('meta[name="base:app_id"]')) {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "base:app_id");
      meta.setAttribute("content", "69f2a1186daaf9236cfba3d8");
      document.head.appendChild(meta);
    }
  }, []);

  return null;
}
