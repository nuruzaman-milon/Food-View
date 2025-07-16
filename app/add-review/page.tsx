"use client";

import type React from "react";
import { useState, useMemo } from "react";
import Image from "next/image";
import { Star, Upload, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { mockRestaurants, mockFood } from "@/lib/mock-data";
import AsyncCreatableSelect from "react-select/async-creatable";

type OptionType = {
  value: string;
  label: string;
};

export default function AddReviewPage() {
  const [location, setLocation] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [selectedRestaurant, setSelectedRestaurant] =
    useState<OptionType | null>(null);
  const [selectedFoodItems, setSelectedFoodItems] = useState<OptionType[]>([]);

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Review submitted:", {
      restaurant: selectedRestaurant?.value,
      restaurantName: selectedRestaurant?.label,
      foodItems: selectedFoodItems.map((f) => f.value),
      foodNames: selectedFoodItems.map((f) => f.label),
    });

    if (!selectedRestaurant || !location || !reviewText || rating === 0) {
      toast({
        title: "Validation Error",
        description:
          "Please fill in all required fields (Restaurant, Location, Review, Rating).",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Review Submitted!",
      description: "Thank you for sharing your experience.",
    });

    // Reset form
    setSelectedRestaurant(null);
    setLocation("");
    setReviewText("");
    setRating(0);
    setImageFile(null);
    setSelectedFoodItems([]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#3b82f6" // Tailwind's bg-blue-500
        : "white",
      color: state.isFocused ? "white" : "black",
      cursor: "pointer",
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#dbeafe", // Tailwind's bg-blue-100
      color: "#1e3a8a", // Tailwind's text-blue-900
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#1e3a8a",
    }),
    control: (provided: any) => ({
      ...provided,
      borderColor: "#cbd5e1", // Tailwind's border-slate-300
      boxShadow: "none",
      "&:hover": {
        borderColor: "#3b82f6",
      },
    }),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            Share Your Dining Experience
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Help others discover great food by sharing your honest review.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Write Your Review</CardTitle>
            <CardDescription>
              Fill out the details below to submit your review.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Restaurant Name */}
              <div className="space-y-2">
                <Label>Restaurant Name *</Label>
                <AsyncCreatableSelect
                  styles={customStyles}
                  isClearable
                  defaultOptions
                  cacheOptions
                  value={selectedRestaurant}
                  loadOptions={async (inputValue) => {
                    const filtered = mockRestaurants
                      .filter((r) =>
                        r.restaurantName
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                      )
                      .map((r) => ({
                        label: r.restaurantName,
                        value: r.restaurantId,
                      }));
                    return filtered;
                  }}
                  onChange={(option) => {
                    setSelectedRestaurant(option);
                  }}
                  onCreateOption={(inputValue) => {
                    const newOption = { label: inputValue, value: inputValue };
                    setSelectedRestaurant(newOption);
                  }}
                  placeholder="Select or add restaurant..."
                />
              </div>

              {/* Location - Simple Text Input */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter restaurant location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label>Your Rating *</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-8 w-8 cursor-pointer transition-colors duration-200 ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>

              {/* Review Description */}
              <div className="space-y-2">
                <Label htmlFor="review-description">Review Description *</Label>
                <Textarea
                  id="review-description"
                  placeholder="Tell us about your experience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={6}
                  required
                />
              </div>

              {/* Food Name Selection */}
              <div className="space-y-2">
                <Label>Food Items *</Label>
                <AsyncCreatableSelect
                  styles={customStyles}
                  isMulti
                  isClearable
                  defaultOptions
                  cacheOptions
                  value={selectedFoodItems}
                  loadOptions={async (inputValue) => {
                    const relevantFood = selectedRestaurant?.value
                      ? mockFood.filter((food) =>
                          mockRestaurants
                            .find(
                              (r) => r.restaurantId === selectedRestaurant.value
                            )
                            ?.foodList.includes(food.foodId)
                        )
                      : mockFood;

                    return relevantFood
                      .filter((food) =>
                        food.foodName
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                      )
                      .map((food) => ({
                        label: food.foodName,
                        value: food.foodId,
                      }));
                  }}
                  onChange={(options) => {
                    setSelectedFoodItems(options || []);
                  }}
                  onCreateOption={(inputValue) => {
                    const newOption = { label: inputValue, value: inputValue };
                    setSelectedFoodItems((prev) => [...prev, newOption]);
                  }}
                  placeholder="Select or add food items..."
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image-upload">Upload Image (Optional)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1"
                  />
                  {imageFile && (
                    <div className="relative w-20 h-20 rounded-md overflow-hidden">
                      <Image
                        src={
                          URL.createObjectURL(imageFile) || "/placeholder.svg"
                        }
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Upload className="h-4 w-4 mr-2" />
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
