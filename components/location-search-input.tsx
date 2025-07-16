"use client"
import { useState, useRef } from "react"
import { MapPin, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface LocationSearchInputProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
}

// Mock API call for location suggestions
async function fetchLocationSuggestions(query: string): Promise<string[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const mockLocations = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
    "Philadelphia, PA",
    "San Antonio, TX",
    "San Diego, CA",
    "Dallas, TX",
    "San Jose, CA",
    "Austin, TX",
    "Jacksonville, FL",
    "Fort Worth, TX",
    "Columbus, OH",
    "Charlotte, NC",
    "San Francisco, CA",
    "Indianapolis, IN",
    "Seattle, WA",
    "Denver, CO",
    "Washington, DC",
  ]

  if (!query) {
    return mockLocations.slice(0, 5)
  }

  return mockLocations.filter((loc) => loc.toLowerCase().includes(query.toLowerCase()))
}

export function LocationSearchInput({
  value,
  onValueChange,
  placeholder = "Search location...",
  className,
}: LocationSearchInputProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleInputChange = async (newValue: string) => {
    setSearchQuery(newValue)

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    if (newValue.length > 1) {
      setLoading(true)
      debounceTimeoutRef.current = setTimeout(async () => {
        try {
          const fetchedSuggestions = await fetchLocationSuggestions(newValue)
          setSuggestions(fetchedSuggestions)
        } catch (error) {
          console.error("Error fetching suggestions:", error)
          setSuggestions([])
        } finally {
          setLoading(false)
        }
      }, 500)
    } else {
      setSuggestions([])
      setLoading(false)
    }
  }

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue)
    setSearchQuery("")
    setOpen(false)
  }

  const handleInputFocus = () => {
    setOpen(true)
    if (!searchQuery && suggestions.length === 0) {
      handleInputChange("") // Load default suggestions
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={cn("relative w-full", className)}>
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
          <Input
            placeholder={placeholder}
            value={open ? searchQuery : value}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={handleInputFocus}
            className="pl-10 w-full"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandList>
            {loading ? (
              <div className="p-4 text-center text-muted-foreground">Loading suggestions...</div>
            ) : suggestions.length === 0 && searchQuery.length > 1 ? (
              <CommandEmpty>No locations found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {suggestions.map((loc) => (
                  <CommandItem key={loc} value={loc} onSelect={() => handleSelect(loc)}>
                    <Check className={cn("mr-2 h-4 w-4", value === loc ? "opacity-100" : "opacity-0")} />
                    {loc}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
