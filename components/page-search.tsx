"use client"

import { useState } from "react"
import { Search, MapPin, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

interface PageSearchProps {
  onSearch?: (query: string, location: string, category: string, searchType?: string, minRating?: string) => void
  placeholder?: string
  showSearchType?: boolean
}

export function PageSearch({
  onSearch,
  placeholder = "Search restaurants...",
  showSearchType = false,
}: PageSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [searchType, setSearchType] = useState("")
  const [minRating, setMinRating] = useState("")

  const handleSearch = () => {
    onSearch?.(searchQuery, location, category, searchType, minRating)
  }

  const handleClear = () => {
    setSearchQuery("")
    setLocation("")
    setCategory("")
    setSearchType("")
    setMinRating("")
    onSearch?.("", "", "", "", "")
  }

  const categories = [
    "All Cuisines",
    "Italian",
    "Chinese",
    "Mexican",
    "Indian",
    "Japanese",
    "American",
    "Mediterranean",
    "Thai",
    "French",
  ]

  const ratings = ["Any Rating", "4+ Stars", "4.5+ Stars", "5 Stars"]
  const searchTypes = ["All", "Restaurants", "Foods", "Reviews"]

  return (
    <div className="bg-muted/30 py-6 mb-8">
      <div className="container mx-auto px-4">
        <Card className="p-4 sm:p-6 bg-background shadow-sm">
          <div className="flex flex-col lg:flex-row gap-3 items-center">
            {/* Search Type (Homepage only) */}
            {showSearchType && (
              <div className="w-full lg:w-40">
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="h-12 bg-background border-border">
                    <SelectValue placeholder="Search for" />
                    <ChevronDown className="h-4 w-4" />
                  </SelectTrigger>
                  <SelectContent>
                    {searchTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
              <Input
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-background border-border"
              />
            </div>

            {/* Location Input */}
            <div className="w-full lg:w-48 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 bg-background border-border"
              />
            </div>

            {/* Cuisine Select */}
            <div className="w-full lg:w-40">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-12 bg-background border-border">
                  <SelectValue placeholder="Cuisine" />
                  <ChevronDown className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Rating Select */}
            <div className="w-full lg:w-40">
              <Select value={minRating} onValueChange={setMinRating}>
                <SelectTrigger className="h-12 bg-background border-border">
                  <SelectValue placeholder="Min Rating" />
                  <ChevronDown className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  {ratings.map((rating) => (
                    <SelectItem key={rating} value={rating.toLowerCase()}>
                      {rating}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Button onClick={handleSearch} className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Filter className="h-4 w-4 mr-2" />
              Search
            </Button>

            {/* Clear Button */}
            <Button onClick={handleClear} variant="outline" className="h-12 px-4 bg-background border-border">
              Clear
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
