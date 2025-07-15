"use client"

import { useState } from "react"
import { Search, MapPin, Filter, Utensils, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchSectionProps {
  onSearch?: (query: string, location: string, category: string) => void
  placeholder?: string
  showCategories?: boolean
  variant?: "homepage" | "page"
}

export function SearchSection({
  onSearch,
  placeholder = "Search restaurants, cuisines, or dishes...",
  showCategories = true,
  variant = "homepage",
}: SearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")

  const handleSearch = () => {
    onSearch?.(searchQuery, location, category)
  }

  const categories = [
    "All Categories",
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

  const locations = ["All Locations", "Downtown", "Uptown", "Waterfront", "Midtown", "Suburbs"]

  if (variant === "homepage") {
    return (
      <section className="py-12 sm:py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Find Your Perfect Dining Experience</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Search through thousands of restaurants and discover your next favorite meal
            </p>
          </div>

          <Card className="max-w-4xl mx-auto p-6 sm:p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Search Input */}
              <div className="md:col-span-5 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder={placeholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>

              {/* Location Select */}
              <div className="md:col-span-3 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="pl-10 h-12">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc.toLowerCase()}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category Select */}
              {showCategories && (
                <div className="md:col-span-2 relative">
                  <Utensils className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="pl-10 h-12">
                      <SelectValue placeholder="Cuisine" />
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
              )}

              {/* Search Button */}
              <div className={showCategories ? "md:col-span-2" : "md:col-span-4"}>
                <Button onClick={handleSearch} className="w-full h-12 text-base font-semibold">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t">
              <span className="text-sm text-muted-foreground mr-2">Popular:</span>
              {["Pizza", "Sushi", "Burgers", "Coffee", "Desserts"].map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  size="sm"
                  className="text-xs bg-transparent hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setSearchQuery(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </Card>

          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Restaurants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.8</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                Rating
              </div>
            </div>
          </div> */}
          
        </div>
      </section>
    )
  }

  // Page variant (for restaurants, food, reviews pages)
  return (
    <div className="bg-muted/30 py-6 mb-8">
      <div className="container mx-auto px-4">
        <Card className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Location Select */}
            <div className="lg:col-span-3 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc.toLowerCase()}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Select */}
            {showCategories && (
              <div className="lg:col-span-2 relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Filter" />
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
            )}

            {/* Search Button */}
            <div className={showCategories ? "lg:col-span-2" : "lg:col-span-4"}>
              <Button onClick={handleSearch} className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
