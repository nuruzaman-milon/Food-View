"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

interface FloatingSearchProps {
  onSearch?: (query: string, location: string, category: string, searchType?: string, minRating?: string) => void
  showSearchType?: boolean
  variant?: "homepage" | "page"
}

export function FloatingSearch({ onSearch, showSearchType = false, variant = "page" }: FloatingSearchProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [searchType, setSearchType] = useState("")
  const [minRating, setMinRating] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  if (!isVisible) return null

  return (
    <div className="fixed top-20 left-0 right-0 z-40 px-4">
      <Card className="max-w-6xl mx-auto p-4 shadow-lg bg-background/95 backdrop-blur-sm border">
        <div className="flex flex-col lg:flex-row gap-3 items-center">
          {/* Search Type (Homepage only) */}
          {showSearchType && (
            <div className="w-full lg:w-40">
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="h-12 bg-background border-border">
                  <SelectValue placeholder="Search for" />
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
              placeholder="Search restaurants..."
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
  )
}
