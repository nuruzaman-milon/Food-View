"use client"

import { useState } from "react"
import { Search, MapPin, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

interface FixedSearchProps {
  onSearch?: (query: string, location: string, searchType?: string, minRating?: string) => void
  showSearchType?: boolean
  variant?: "homepage" | "page"
}

export function FixedSearch({ onSearch, showSearchType = false, variant = "page" }: FixedSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [searchType, setSearchType] = useState("")
  const [minRating, setMinRating] = useState("")

  const handleSearch = () => {
    onSearch?.(searchQuery, location, searchType, minRating)
  }

  const handleClear = () => {
    setSearchQuery("")
    setLocation("")
    setSearchType("")
    setMinRating("")
    onSearch?.("", "", "", "")
  }

  const ratings = ["Any Rating", "4+ Stars", "4.5+ Stars", "5 Stars"]
  const searchTypes = ["All", "Restaurants", "Foods", "Reviews"]

  if (variant === "homepage") {
    return (
      <section className="py-12 bg-gradient-to-b from-muted/30 to-background animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 animate-slide-up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Find Your Perfect Dining Experience</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Search through thousands of restaurants and discover your next favorite meal
            </p>
          </div>

          <Card className="max-w-6xl mx-auto p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
            <div className="flex flex-col lg:flex-row gap-3 items-center">
              {/* Search Type (Homepage only) */}
              {showSearchType && (
                <div className="w-full lg:w-40 animate-slide-in-left">
                  <Select value={searchType} onValueChange={setSearchType}>
                    <SelectTrigger className="h-12 bg-background border-border hover:border-muted-foreground/30 transition-colors">
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
              <div className="flex-1 relative animate-slide-in-up">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
                <Input
                  placeholder="Search restaurants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-background border-border hover:border-muted-foreground/30 transition-colors"
                />
              </div>

              {/* Location Input */}
              <div className="w-full lg:w-48 relative animate-slide-in-up animation-delay-100">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12 bg-background border-border hover:border-muted-foreground/30 transition-colors"
                />
              </div>

              {/* Min Rating Select */}
              <div className="w-full lg:w-40 animate-slide-in-up animation-delay-200">
                <Select value={minRating} onValueChange={setMinRating}>
                  <SelectTrigger className="h-12 bg-background border-border hover:border-muted-foreground/30 transition-colors">
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
              <Button
                onClick={handleSearch}
                className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-300 animate-slide-in-right"
              >
                <Filter className="h-4 w-4 mr-2" />
                Search
              </Button>

              {/* Clear Button */}
              <Button
                onClick={handleClear}
                variant="outline"
                className="h-12 px-4 bg-background border-border hover:bg-muted/50 hover:scale-105 transition-all duration-300 animate-slide-in-right animation-delay-100"
              >
                Clear
              </Button>
            </div>
          </Card>
        </div>
      </section>
    )
  }

  // Page variant
  return (
    <div className="bg-muted/30 py-6 mb-8 animate-fade-in">
      <div className="container mx-auto px-4">
        <Card className="p-4 sm:p-6 bg-background shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in">
          <div className="flex flex-col lg:flex-row gap-3 items-center">
            {/* Search Input */}
            <div className="flex-1 relative animate-slide-in-left">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
              <Input
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-background border-border hover:border-muted-foreground/30 transition-colors"
              />
            </div>

            {/* Location Input */}
            <div className="w-full lg:w-48 relative animate-slide-in-up">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 bg-background border-border hover:border-muted-foreground/30 transition-colors"
              />
            </div>

            {/* Min Rating Select */}
            <div className="w-full lg:w-40 animate-slide-in-up animation-delay-100">
              <Select value={minRating} onValueChange={setMinRating}>
                <SelectTrigger className="h-12 bg-background border-border hover:border-muted-foreground/30 transition-colors">
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
            <Button
              onClick={handleSearch}
              className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-300 animate-slide-in-right"
            >
              <Filter className="h-4 w-4 mr-2" />
              Search
            </Button>

            {/* Clear Button */}
            <Button
              onClick={handleClear}
              variant="outline"
              className="h-12 px-4 bg-background border-border hover:bg-muted/50 hover:scale-105 transition-all duration-300 animate-slide-in-right animation-delay-100"
            >
              Clear
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
