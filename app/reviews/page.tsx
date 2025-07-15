"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Heart, MessageCircle, Share2, MapPin } from "lucide-react"
import { CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FixedSearch } from "@/components/fixed-search"
import { AnimatedCard } from "@/components/animated-card"
import { mockReviews, mockUsers } from "@/lib/mock-data"

export default function ReviewsPage() {
  const [filteredReviews, setFilteredReviews] = useState(mockReviews)

  const handleSearch = (query: string, location: string, minRating?: string) => {
    let filtered = mockReviews

    if (query) {
      filtered = filtered.filter(
        (review) =>
          review.reviewText.toLowerCase().includes(query.toLowerCase()) ||
          review.restaurantName.toLowerCase().includes(query.toLowerCase()) ||
          review.foodNameList.some((food) => food.toLowerCase().includes(query.toLowerCase())),
      )
    }

    if (location) {
      filtered = filtered.filter((review) => review.restaurantAddress.toLowerCase().includes(location.toLowerCase()))
    }

    if (minRating && minRating !== "any rating") {
      const rating = Number.parseFloat(minRating.replace(/[^\d.]/g, ""))
      filtered = filtered.filter((review) => review.rating >= rating)
    }

    setFilteredReviews(filtered)
  }

  const getUserName = (userId: string) => {
    const user = mockUsers.find((u) => u.userId === userId)
    return user?.name || "Anonymous"
  }

  const getUserImage = (userId: string) => {
    const user = mockUsers.find((u) => u.userId === userId)
    return (
      user?.image ||
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    )
  }

  return (
    <div>
      {/* Search Section */}
      <FixedSearch onSearch={handleSearch} variant="page" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold mb-4">Restaurant Reviews</h1>
          <p className="text-muted-foreground mb-6">
            Discover what food lovers are saying about their dining experiences
          </p>
        </div>

        <div className="grid gap-6 stagger-animation">
          {filteredReviews.map((review, index) => (
            <AnimatedCard key={review.reviewId} delay={index * 100} animation="fade-up" className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={getUserImage(review.userId) || "/placeholder.svg"}
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="rounded-full hover:scale-110 transition-transform duration-300"
                    />
                    <div>
                      <h3 className="font-semibold">{getUserName(review.userId)}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{review.restaurantName}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {review.restaurantAddress}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 transition-colors duration-300 ${
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 font-semibold">{review.rating}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-foreground">{review.reviewText}</p>

                {review.foodNameList.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {review.foodNameList.map((food, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      >
                        {food}
                      </Badge>
                    ))}
                  </div>
                )}

                {review.reviewImg.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {review.reviewImg.map((img, index) => (
                      <div key={index} className="aspect-square relative rounded-lg overflow-hidden hover-lift">
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`Review image ${index + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-2 hover:scale-105 transition-all duration-300">
                      <Heart className="h-4 w-4" />
                      {review.likeCount}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 hover:scale-105 transition-all duration-300">
                      <MessageCircle className="h-4 w-4" />
                      {review.commentCount}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 hover:scale-105 transition-all duration-300">
                      <Share2 className="h-4 w-4" />
                      {review.shareCount}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-muted-foreground">No reviews found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
