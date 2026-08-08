"use client";

import { useState, useEffect } from "react";

const EXPORT_KEY = "brhf-admin-data";

export function useDataBackup() {
  const exportData = () => {
    try {
      const allKeys: Record<string, string> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("brhf-")) {
          allKeys[key] = localStorage.getItem(key) || "";
        }
      }
      const blob = new Blob([JSON.stringify(allKeys, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `brhf-backup-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      return { success: true, message: "Backup downloaded successfully!" };
    } catch {
      return { success: false, message: "Failed to export data." };
    }
  };

  const importData = (jsonString: string): { success: boolean; message: string } => {
    try {
      const data = JSON.parse(jsonString);
      let count = 0;
      Object.entries(data).forEach(([key, value]) => {
        if (key.startsWith("brhf-")) {
          localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
          count++;
        }
      });
      return { success: true, message: `Restored ${count} data items. Refresh to see changes.` };
    } catch {
      return { success: false, message: "Invalid backup file format." };
    }
  };

  const resetAllData = () => {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("brhf-")) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    window.location.reload();
  };

  return { exportData, importData, resetAllData };
}
