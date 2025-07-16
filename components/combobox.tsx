"use client"
import { useState } from "react"
import type React from "react"

import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

interface Option {
  value: string
  label: string
}

interface ComboboxProps {
  options: Option[]
  value: string | string[] | null
  onValueChange: (value: string | string[] | null) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  multiple?: boolean
  allowNew?: boolean
  className?: string
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select item...",
  searchPlaceholder = "Search items...",
  emptyMessage = "No item found.",
  multiple = false,
  allowNew = false,
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const selectedValues = multiple ? (Array.isArray(value) ? value : []) : value ? [value] : []

  const handleSelect = (currentValue: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(currentValue)
        ? selectedValues.filter((v) => v !== currentValue)
        : [...selectedValues, currentValue]
      onValueChange(newValues)
    } else {
      onValueChange(currentValue === value ? null : currentValue)
      setOpen(false)
    }
    setSearchValue("")
  }

  const handleRemoveTag = (tagValue: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (multiple) {
      const newValues = selectedValues.filter((v) => v !== tagValue)
      onValueChange(newValues)
    }
  }

  const handleAddNew = () => {
    if (allowNew && searchValue.trim()) {
      const normalizedValue = searchValue.trim()
      const existingOption = options.find((opt) => opt.label.toLowerCase() === normalizedValue.toLowerCase())

      if (existingOption) {
        handleSelect(existingOption.value)
      } else {
        if (multiple) {
          onValueChange([...selectedValues, normalizedValue])
        } else {
          onValueChange(normalizedValue)
          setOpen(false)
        }
        setSearchValue("")
      }
    }
  }

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()))

  const getDisplayValue = () => {
    if (multiple) {
      if (selectedValues.length === 0) return placeholder
      return (
        <div className="flex flex-wrap gap-1 max-w-full">
          {selectedValues.map((val) => {
            const option = options.find((opt) => opt.value === val)
            const displayText = option ? option.label : val
            return (
              <Badge key={val} variant="secondary" className="flex items-center gap-1 text-xs">
                <span className="truncate max-w-[100px]">{displayText}</span>
                <button
                  type="button"
                  onClick={(e) => handleRemoveTag(val, e)}
                  className="ml-1 text-muted-foreground hover:text-foreground text-sm"
                  aria-label={`Remove ${displayText}`}
                >
                  ×
                </button>
              </Badge>
            )
          })}
        </div>
      )
    } else {
      if (!value) return placeholder
      const option = options.find((opt) => opt.value === value)
      return option ? option.label : value
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between min-h-[40px] h-auto", className)}
          type="button"
        >
          <div className="flex-1 text-left overflow-hidden">{getDisplayValue()}</div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput placeholder={searchPlaceholder} value={searchValue} onValueChange={setSearchValue} />
          <CommandList>
            <CommandEmpty>
              <div className="p-2 text-center text-sm text-muted-foreground">{emptyMessage}</div>
              {allowNew && searchValue.trim() && (
                <CommandItem
                  onSelect={handleAddNew}
                  className="flex items-center justify-center gap-2 text-primary cursor-pointer p-2 m-1 rounded"
                >
                  <PlusCircle className="h-4 w-4" />
                  Add "{searchValue.trim()}"
                </CommandItem>
              )}
            </CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", selectedValues.includes(option.value) ? "opacity-100" : "opacity-0")}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
