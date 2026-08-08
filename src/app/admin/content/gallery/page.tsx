"use client";

import { useCallback, useState } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import type { AdminGalleryItem } from "@/lib/admin-data";

export default function GalleryEditor() {
  const { state, update } = useAdmin();
  const [dragOver, setDragOver] = useState(false);

  const updateItem = (i: number, partial: Partial<AdminGalleryItem>) => {
    const next = [...state.gallery];
    next[i] = { ...next[i], ...partial };
    update("gallery", next);
  };

  const deleteItem = (i: number) => {
    update("gallery", state.gallery.filter((_, idx) => idx !== i));
  };

  const addFromUrl = () => {
    const item: AdminGalleryItem = {
      id: `gal-${Date.now()}`,
      src: "/assets/new-image.webp",
      alt: "",
      caption: "",
      category: "General",
      featured: false,
    };
    update("gallery", [...state.gallery, item]);
  };

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      Array.from(files).forEach((file) => {
        const url = URL.createObjectURL(file);
        const item: AdminGalleryItem = {
          id: `gal-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          src: url,
          alt: file.name,
          caption: "",
          category: "General",
          featured: false,
        };
        update("gallery", [...state.gallery, item]);
      });
    },
    [state.gallery, update]
  );

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-ink dark:text-white">Gallery</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage gallery images. Upload from device or set image paths.
          </p>
        </div>
        <button
          onClick={addFromUrl}
          className="px-4 py-2 bg-saffron text-white rounded-xl text-sm font-medium hover:bg-saffron-deep transition-colors"
        >
          + Add Image
        </button>
      </div>

      {/* Dropzone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        className={`
          border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all
          ${dragOver ? "border-saffron bg-saffron/5" : "border-gray-300 dark:border-gray-600 hover:border-saffron/50"}
        `}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <svg className="w-10 h-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5h12a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0018.75 4.5H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
        </svg>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Drop images here, or <span className="text-saffron font-medium">browse</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, WebP, SVG</p>
      </div>

      {/* Gallery list */}
      <div className="space-y-4">
        {state.gallery.map((item, i) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-3">
            <div className="flex items-start gap-4">
              {/* Thumbnail */}
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 shrink-0">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/assets/brhf.png"; }}
                />
              </div>
              <div className="flex-1 space-y-3 min-w-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    value={item.alt}
                    onChange={(e) => updateItem(i, { alt: e.target.value })}
                    placeholder="Alt text"
                    className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
                  />
                  <input
                    value={item.caption}
                    onChange={(e) => updateItem(i, { caption: e.target.value })}
                    placeholder="Caption"
                    className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    value={item.src}
                    onChange={(e) => updateItem(i, { src: e.target.value })}
                    placeholder="Image path"
                    className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
                  />
                  <input
                    value={item.category}
                    onChange={(e) => updateItem(i, { category: e.target.value })}
                    placeholder="Category"
                    className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-ink dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40"
                  />
                  <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.featured}
                      onChange={(e) => updateItem(i, { featured: e.target.checked })}
                      className="rounded border-gray-300 text-saffron focus:ring-saffron"
                    />
                    <span className="text-gray-500 text-sm">Featured</span>
                    <button
                      onClick={() => deleteItem(i)}
                      className="ml-auto text-xs text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
        {state.gallery.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">No gallery images yet.</p>
        )}
      </div>
    </div>
  );
}
