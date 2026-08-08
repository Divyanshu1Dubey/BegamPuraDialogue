"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminState, loadAdminState, saveAdminState, resetAdminState, updateAdminSection } from "@/lib/admin-data";

export function useAdmin() {
  const [state, setState] = useState<AdminState>(loadAdminState);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    saveAdminState(state);
    setIsDirty(false);
  }, [state]);

  const update = useCallback(<K extends keyof AdminState>(
    section: K,
    data: Partial<AdminState[K]>
  ) => {
    setState(prev => {
      setIsDirty(true);
      const next = { ...prev, [section]: { ...prev[section], ...data } };
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    const defaults = resetAdminState();
    setState(defaults);
    setIsDirty(false);
  }, []);

  const reload = useCallback(() => {
    setState(loadAdminState());
    setIsDirty(false);
  }, []);

  return { state, update, reset, reload, isDirty };
}
