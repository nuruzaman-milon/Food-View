import Link from "next/link"
import Image from "next/image"
import { Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeroSection } from "@/components/hero-section"
import { FixedSearch } from "@/components/fixed-search"
import { AnimatedCard } from "@/components/animated-card"
import { mockRestaurants, mockReviews, mockFood } from "@/lib/mock-data"

export default function HomePage() {
  const featuredRestaurants = mockRestaurants.slice(0, 3)
  const recentReviews = mockReviews.slice(0, 3)
  const popularFood = mockFood.slice(0, 4)

  const handleSearch = (query: string, location: string, searchType?: string, minRating?: string) => {
    console.log("Search:", { query, location, searchType, minRating })
    // Implement search logic here
  }

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Fixed Search Section */}
      <FixedSearch onSearch={handleSearch} showSearchType={true} variant="homepage" />

      <div className="container mx-auto px-4 py-8">
        {/* Featured Restaurants */}
        <section className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 animate-slide-up">
            <h2 className="text-2xl sm:text-3xl font-bold">Featured Restaurants</h2>
            <Button variant="outline" asChild className="hover:scale-105 transition-all duration-300 bg-transparent">
              <Link href="/restaurants">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 stagger-animation">
            {featuredRestaurants.map((restaurant, index) => (
              <AnimatedCard key={restaurant.restaurantId} delay={index * 100} className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.restaurantName}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg sm:text-xl">{restaurant.restaurantName}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    {restaurant.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{restaurant.overallRating}</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {restaurant.reviewId.length} reviews
                    </Badge>
                  </div>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* Recent Reviews */}
        <section className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 animate-slide-up">
            <h2 className="text-2xl sm:text-3xl font-bold">Recent Reviews</h2>
            <Button variant="outline" asChild className="hover:scale-105 transition-all duration-300 bg-transparent">
              <Link href="/reviews">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 stagger-animation">
            {recentReviews.map((review, index) => (
              <AnimatedCard key={review.reviewId} delay={index * 150} animation="fade-up">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base sm:text-lg truncate">{review.restaurantName}</CardTitle>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{review.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">{review.reviewText}</p>
                  <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                    <span className="hover:text-primary transition-colors cursor-pointer">
                      {review.likeCount} likes
                    </span>
                    <span className="hover:text-primary transition-colors cursor-pointer">
                      {review.commentCount} comments
                    </span>
                  </div>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* Popular Food */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 animate-slide-up">
            <h2 className="text-2xl sm:text-3xl font-bold">Popular Dishes</h2>
            <Button variant="outline" asChild className="hover:scale-105 transition-all duration-300 bg-transparent">
              <Link href="/food">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 stagger-animation">
            {popularFood.map((food, index) => (
              <AnimatedCard key={food.foodId} delay={index * 100} animation="scale" className="overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={food.foodImg || "/placeholder.svg"}
                    alt={food.foodName}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg">{food.foodName}</CardTitle>
                  <CardDescription className="line-clamp-2 text-sm">{food.details}</CardDescription>
                </CardHeader>
              </AnimatedCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
