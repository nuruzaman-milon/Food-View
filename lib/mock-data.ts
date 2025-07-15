export const mockUsers = [
  {
    userId: "1",
    name: "John Doe",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    email: "john@example.com",
    phone: "+1234567890",
    address: "123 Main St, City",
    timestamp: "2024-01-15",
    role: "user",
  },
  {
    userId: "2",
    name: "Jane Smith",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    email: "jane@example.com",
    phone: "+1234567891",
    address: "456 Oak Ave, City",
    timestamp: "2024-01-10",
    role: "admin",
  },
]

export const mockRestaurants = [
  {
    restaurantId: "1",
    restaurantName: "The Golden Spoon",
    location: "Downtown",
    overallRating: 4.5,
    userId: ["1", "2"],
    reviewId: ["1", "2"],
    foodList: ["1", "2", "3"],
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    restaurantId: "2",
    restaurantName: "Mama's Kitchen",
    location: "Uptown",
    overallRating: 4.2,
    userId: ["1"],
    reviewId: ["3"],
    foodList: ["4", "5"],
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    restaurantId: "3",
    restaurantName: "Ocean Breeze",
    location: "Waterfront",
    overallRating: 4.8,
    userId: ["2"],
    reviewId: ["4"],
    foodList: ["6", "7"],
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
]

export const mockFood = [
  {
    foodId: "1",
    foodName: "Truffle Pasta",
    foodImg:
      "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    details: "Creamy pasta with black truffle and parmesan",
    restaurantId: "1",
    reviewId: "1",
  },
  {
    foodId: "2",
    foodName: "Grilled Salmon",
    foodImg:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    details: "Fresh Atlantic salmon with herbs",
    restaurantId: "1",
    reviewId: "2",
  },
  {
    foodId: "3",
    foodName: "Chocolate Soufflé",
    foodImg:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    details: "Rich chocolate dessert with vanilla ice cream",
    restaurantId: "1",
    reviewId: "1",
  },
  {
    foodId: "4",
    foodName: "Margherita Pizza",
    foodImg:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    details: "Classic pizza with fresh mozzarella and basil",
    restaurantId: "2",
    reviewId: "3",
  },
  {
    foodId: "5",
    foodName: "Caesar Salad",
    foodImg:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    details: "Crisp romaine with parmesan and croutons",
    restaurantId: "2",
    reviewId: "3",
  },
  {
    foodId: "6",
    foodName: "Lobster Bisque",
    foodImg:
      "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    details: "Rich and creamy lobster soup",
    restaurantId: "3",
    reviewId: "4",
  },
  {
    foodId: "7",
    foodName: "Seafood Platter",
    foodImg:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    details: "Fresh catch of the day with sides",
    restaurantId: "3",
    reviewId: "4",
  },
]

export const mockReviews = [
  {
    reviewId: "1",
    restaurantId: "1",
    userId: "1",
    rating: 5,
    likeCount: 12,
    dislikeCount: 1,
    commentCount: 3,
    shareCount: 2,
    reviewText: "Amazing experience! The truffle pasta was incredible and the service was top-notch.",
    reviewImg: [
      "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    ],
    foodNameList: ["Truffle Pasta", "Chocolate Soufflé"],
    restaurantName: "The Golden Spoon",
    restaurantAddress: "123 Main St, Downtown",
  },
  {
    reviewId: "2",
    restaurantId: "1",
    userId: "2",
    rating: 4,
    likeCount: 8,
    dislikeCount: 0,
    commentCount: 2,
    shareCount: 1,
    reviewText: "Great food and atmosphere. The salmon was perfectly cooked.",
    reviewImg: [
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    ],
    foodNameList: ["Grilled Salmon"],
    restaurantName: "The Golden Spoon",
    restaurantAddress: "123 Main St, Downtown",
  },
  {
    reviewId: "3",
    restaurantId: "2",
    userId: "1",
    rating: 4,
    likeCount: 6,
    dislikeCount: 1,
    commentCount: 1,
    shareCount: 0,
    reviewText: "Solid Italian food. The pizza was authentic and delicious.",
    reviewImg: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    ],
    foodNameList: ["Margherita Pizza", "Caesar Salad"],
    restaurantName: "Mama's Kitchen",
    restaurantAddress: "456 Oak Ave, Uptown",
  },
  {
    reviewId: "4",
    restaurantId: "3",
    userId: "2",
    rating: 5,
    likeCount: 15,
    dislikeCount: 0,
    commentCount: 5,
    shareCount: 3,
    reviewText: "Outstanding seafood restaurant! Fresh ingredients and beautiful presentation.",
    reviewImg: [
      "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    ],
    foodNameList: ["Lobster Bisque", "Seafood Platter"],
    restaurantName: "Ocean Breeze",
    restaurantAddress: "789 Harbor Dr, Waterfront",
  },
]

export const mockComments = [
  {
    commentId: "1",
    reviewId: "1",
    userId: "2",
    content: "I totally agree! This place is amazing.",
    timestamp: "2024-01-16",
  },
  {
    commentId: "2",
    reviewId: "1",
    userId: "1",
    content: "Thanks for the recommendation!",
    timestamp: "2024-01-17",
  },
]
