"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, MapPin, Users } from "lucide-react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FixedSearch } from "@/components/fixed-search"
import { AnimatedCard } from "@/components/animated-card"
import { mockRestaurants } from "@/lib/mock-data"

export default function RestaurantsPage() {
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants)

  const handleSearch = (query: string, location: string, minRating?: string) => {
    let filtered = mockRestaurants

    if (query) {
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.restaurantName.toLowerCase().includes(query.toLowerCase()) ||
          restaurant.location.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (location) {
      filtered = filtered.filter((restaurant) => restaurant.location.toLowerCase().includes(location.toLowerCase()))
    }

    if (minRating && minRating !== "any rating") {
      const rating = Number.parseFloat(minRating.replace(/[^\d.]/g, ""))
      filtered = filtered.filter((restaurant) => restaurant.overallRating >= rating)
    }

    setFilteredRestaurants(filtered)
  }

  return (
    <div>
      {/* Search Section */}
      <FixedSearch onSearch={handleSearch} variant="page" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold mb-4">Restaurants</h1>
          <p className="text-muted-foreground mb-6">Find the perfect dining spot for your next meal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
          {filteredRestaurants.map((restaurant, index) => (
            <AnimatedCard key={restaurant.restaurantId} delay={index * 100} className="overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.restaurantName}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{restaurant.restaurantName}</CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{restaurant.location}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-lg">{restaurant.overallRating}</span>
                    </div>
                    <span className="text-muted-foreground">({restaurant.reviewId.length} reviews)</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="gap-1 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Users className="h-3 w-3" />
                    {restaurant.userId.length} visitors
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{restaurant.foodList.length} dishes available</span>
                  <Badge variant={restaurant.overallRating >= 4.5 ? "default" : "secondary"}>
                    {restaurant.overallRating >= 4.5 ? "Highly Rated" : "Popular"}
                  </Badge>
                </div>
              </CardContent>
            </AnimatedCard>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-muted-foreground">No restaurants found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
