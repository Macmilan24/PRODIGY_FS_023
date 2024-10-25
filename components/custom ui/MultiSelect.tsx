"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface CollectionType {
  _id: string;
  title: string;
}

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  // Filter selected and selectable collections
  const selected = value
    .map((id) => collections.find((collection) => collection._id === id))
    .filter((collection): collection is CollectionType => !!collection);

  const selectables = collections.filter(
    (collection) => !value.includes(collection._id)
  );

  return (
    <div className="relative">
      {/* Display selected items */}
      <div className="flex gap-1 flex-wrap border rounded-md p-1">
        {selected.map((collection) => (
          <Badge key={collection._id}>
            {collection.title}
            <button
              type="button"
              className="ml-1 hover:text-red-1"
              onClick={() => onRemove(collection._id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        {/* Input for selecting items */}
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>

      {/* Display Command Dialog for selection when open */}
      {open && (
        <div className="absolute mt-2 w-full z-30">
          <Command className="overflow-visible bg-white border rounded-md shadow-md">
            <CommandGroup>
              {selectables.length > 0 ? (
                selectables.map((collection) => (
                  <CommandItem
                    key={collection._id}
                    onSelect={() => {
                      onChange(collection._id);
                      setInputValue("");
                      setOpen(false);
                    }}
                    className="cursor-pointer hover:bg-gray-200"
                  >
                    {collection.title}
                  </CommandItem>
                ))
              ) : (
                <CommandEmpty>No items found</CommandEmpty>
              )}
            </CommandGroup>
          </Command>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
