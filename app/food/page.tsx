"use client"

import { useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FixedSearch } from "@/components/fixed-search"
import { AnimatedCard } from "@/components/animated-card"
import { mockFood, mockRestaurants } from "@/lib/mock-data"

export default function FoodPage() {
  const [filteredFood, setFilteredFood] = useState(mockFood)

  const handleSearch = (query: string, location: string, minRating?: string) => {
    let filtered = mockFood

    if (query) {
      filtered = filtered.filter(
        (food) =>
          food.foodName.toLowerCase().includes(query.toLowerCase()) ||
          food.details.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (minRating && minRating !== "any rating") {
      const rating = Number.parseFloat(minRating.replace(/[^\d.]/g, ""))
      filtered = filtered.filter((food) => {
        const restaurant = mockRestaurants.find((r) => r.restaurantId === food.restaurantId)
        return restaurant && restaurant.overallRating >= rating
      })
    }

    setFilteredFood(filtered)
  }

  const getRestaurantName = (restaurantId: string) => {
    const restaurant = mockRestaurants.find((r) => r.restaurantId === restaurantId)
    return restaurant?.restaurantName || "Unknown Restaurant"
  }

  const getRestaurantRating = (restaurantId: string) => {
    const restaurant = mockRestaurants.find((r) => r.restaurantId === restaurantId)
    return restaurant?.overallRating || 0
  }

  return (
    <div>
      {/* Search Section */}
      <FixedSearch onSearch={handleSearch} variant="page" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold mb-4">Discover Delicious Food</h1>
          <p className="text-muted-foreground mb-6">Explore mouth-watering dishes from the best restaurants in town</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-animation">
          {filteredFood.map((food, index) => (
            <AnimatedCard key={food.foodId} delay={index * 100} animation="scale" className="overflow-hidden">
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={food.foodImg || "/placeholder.svg"}
                  alt={food.foodName}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{food.foodName}</CardTitle>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                    {getRestaurantName(food.restaurantId)}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{getRestaurantRating(food.restaurantId)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm line-clamp-2">{food.details}</p>
              </CardContent>
            </AnimatedCard>
          ))}
        </div>

        {filteredFood.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-muted-foreground">No dishes found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
