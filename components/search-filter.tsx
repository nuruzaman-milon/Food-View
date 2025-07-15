"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface SearchFilterProps {
  onSearch: (query: string) => void
  onFilter: (filters: any) => void
  filterOptions?: {
    categories?: string[]
    ratings?: number[]
    locations?: string[]
    restaurants?: string[]
  }
  placeholder?: string
}

export function SearchFilter({ onSearch, onFilter, filterOptions = {}, placeholder = "Search..." }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  const handleFilterSelect = (filterType: string, value: string) => {
    const filterKey = `${filterType}:${value}`
    let newFilters

    if (activeFilters.includes(filterKey)) {
      newFilters = activeFilters.filter((f) => f !== filterKey)
    } else {
      newFilters = [...activeFilters, filterKey]
    }

    setActiveFilters(newFilters)
    onFilter(newFilters)
  }

  const clearFilters = () => {
    setActiveFilters([])
    onFilter([])
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFilters.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            {filterOptions.categories && (
              <>
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                {filterOptions.categories.map((category) => (
                  <DropdownMenuItem key={category} onClick={() => handleFilterSelect("category", category)}>
                    {category}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </>
            )}

            {filterOptions.ratings && (
              <>
                <DropdownMenuLabel>Rating</DropdownMenuLabel>
                {filterOptions.ratings.map((rating) => (
                  <DropdownMenuItem key={rating} onClick={() => handleFilterSelect("rating", rating.toString())}>
                    {rating}+ Stars
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </>
            )}

            {filterOptions.locations && (
              <>
                <DropdownMenuLabel>Location</DropdownMenuLabel>
                {filterOptions.locations.map((location) => (
                  <DropdownMenuItem key={location} onClick={() => handleFilterSelect("location", location)}>
                    {location}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </>
            )}

            {filterOptions.restaurants && (
              <>
                <DropdownMenuLabel>Restaurants</DropdownMenuLabel>
                {filterOptions.restaurants.map((restaurant) => (
                  <DropdownMenuItem key={restaurant} onClick={() => handleFilterSelect("restaurant", restaurant)}>
                    {restaurant}
                  </DropdownMenuItem>
                ))}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="cursor-pointer">
              {filter.split(":")[1]}
              <button
                onClick={() => handleFilterSelect(...(filter.split(":") as [string, string]))}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
