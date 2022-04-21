import React, { useEffect, useMemo, useState } from "react";

export function useFilter<T>(
  items: T[],
  text: string,
  itemToString: (item: T) => string,
  onItemConfirmed: (item: T) => void,
  onEscape: () => void
): UseFilterAPI<T> {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const textLower = text.toLowerCase();
  const filteredItems: T[] = useMemo(
    () => items.filter((item) => itemToString(item).includes(textLower)),
    [items, textLower]
  );

  function offsetIndex(delta: -1 | 1 | -8 | 8) {
    setSelectedIndex((i) => clamp(i + delta, filteredItems.length));
  }

  useEffect(() => {
    if (selectedIndex > filteredItems.length) {
      setSelectedIndex((i) => clamp(i, filteredItems.length));
    }
  }, [text]);

  return {
    filteredItems,
    selectedIndex,
    handleKeyDown: (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        const delta = e.key === "ArrowDown" ? 1 : -1;
        offsetIndex(delta);
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (e.key === "PageUp" || e.key === "PageDown") {
        const delta = e.key === "PageDown" ? 8 : -8;
        offsetIndex(delta);
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (e.key === "Home" || e.key === "End") {
        const newIndex = e.key === "Home" ? 0 : filteredItems.length - 1;
        setSelectedIndex(newIndex);
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (e.key === "Enter") {
        const selectedItem = filteredItems[selectedIndex];
        if (selectedItem) {
          onItemConfirmed(selectedItem);
        }
        e.preventDefault();
        e.stopPropagation();
      }

      if (e.key === "Escape") {
        onEscape();
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };
}
interface UseFilterAPI<T> {
  filteredItems: T[];
  selectedIndex: number;
  handleKeyDown: React.KeyboardEventHandler;
}

function clamp(n: number, length: number): number {
  if (n < 0) return 0;
  if (n >= length) return length - 1;
  return n;
}

function clampWrap(n: number, length: number): number {
  if (n < 0) return length - 1;
  if (n >= length) return 0;
  return n;
}
