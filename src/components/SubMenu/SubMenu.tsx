import React, { useEffect, useRef, useState } from "react";
import { CommandPaletteAPI } from "../CommandPaletteAPI/command-palette-state";
import { useFilter } from "../filter/useFilter";
import Input from "../Input";
import { scrollIntoView } from "../util/dom";

export type SubMenuProps<T> = {
    items: T[];
    itemToKey(item: T): string;
    itemToFilterString(item: T): string;
    itemRenderer(item: T): JSX.Element;
    placeholder: string;
    palette?: CommandPaletteAPI | undefined;
    onConfirmed(item: T): any;
    onClose: () => void;
  };

export function SubMenu<T>({
    items,
    itemToKey,
    itemToFilterString,
    itemRenderer,
    placeholder,
    palette,
    onConfirmed,
    onClose,
  }: SubMenuProps<T>) {
    const [filterText, setFilterText] = useState("");
    const selectedItemRef = useRef<HTMLLIElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    //const dispatch = useThunkDispatch();
  
    const { filteredItems, selectedIndex, handleKeyDown } = useFilter(
      items,
      filterText,
      itemToFilterString,
      handleItemConfirmed,
      handleEscape
    );
  
    useEffect(() => {
      if (!selectedItemRef.current) return;
      scrollIntoView(selectedItemRef.current);
    }, [selectedItemRef.current]);
  
    function handleEscape() {
      console.log("handleEscape()", onClose)
      handleClose();
    }
  
    function handleClose() {
      setTimeout(() => onClose());
    }
  
    function handleItemClick(item: T) {
      if (!item) {
        return;
      }
      handleItemConfirmed(item);
    }
  
    function handleItemConfirmed(item: T) {
      handleClose();
      alert(item.displayName)
      setTimeout(() => onConfirmed(item));
    }
  
    function handleFilterInput(e: React.KeyboardEvent<HTMLInputElement>) {
      setFilterText(e.currentTarget.value);
    }
  
    useEffect(() => {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 25);
    }, []);
  
    return (
      <div className="-mt-7 -ml-7">
        <div className="flex flex-col flex-1">
          <div className="relative">
            <Input
              ref={inputRef}
              type="text"
              className="w-80 pr-6 pl-6"
              placeholder={placeholder}
              onKeyDown={handleKeyDown}
              onInput={handleFilterInput}
              dark
            />
            <i className="icon-search absolute text-gray-500 top-1.5 right-3" />
          </div>
          <ul className="overflow-auto max-h-64 w-80 border border-black bg-gray-700 rounded">
            {filteredItems.map((item, i) => (
              <li
                onClick={() => handleItemClick(item)}
                key={itemToKey(item)}
                ref={i === selectedIndex ? selectedItemRef : null}
                className={`pl-6 pr-2 py-1.5 flex items-center whitespace-nowrap text-sm ${
                  i === selectedIndex
                    ? "bg-purple-700 text-white"
                    : "hover:bg-purple-600 hover:text-white"
                }`}
              >
                {itemRenderer(item)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }