import { Router, type IRouter } from "express";
import {
  GetFarmerResponse,
  GetFarmersResponse,
  GetMarketPricesResponse,
  GetMarketplaceSummaryResponse,
  GetProductResponse,
  GetProductsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const farmers = [
  {
    id: "john-kamau",
    name: "John Kamau",
    farmName: "Kamau Family Farm",
    location: "Ol Kalou, Nyandarua",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=240&q=80",
    rating: 4.8,
    completedOrders: 47,
    yearsFarming: 12,
    verified: true,
    specialty: "Irish potatoes & carrots",
  },
  {
    id: "mary-wanjiku",
    name: "Mary Wanjiku",
    farmName: "Green Ridge Produce",
    location: "Nakuru County",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=80",
    rating: 4.9,
    completedOrders: 82,
    yearsFarming: 18,
    verified: true,
    specialty: "Leafy greens & tomatoes",
  },
  {
    id: "peter-otieno",
    name: "Peter Otieno",
    farmName: "Lakeview Grains",
    location: "Kisumu County",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
    rating: 4.7,
    completedOrders: 31,
    yearsFarming: 9,
    verified: false,
    specialty: "Maize & beans",
  },
];

const products = [
  {
    id: "fresh-potatoes",
    name: "Fresh Potatoes",
    category: "Tubers",
    price: 55,
    unit: "kg",
    farmer: "John Kamau",
    farmerId: "john-kamau",
    location: "Nyandarua",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=760&q=85",
    rating: 4.8,
    reviews: 32,
    availableQuantity: 500,
    verified: true,
    harvest: "Harvested 18 Aug 2026",
    description: "Clean, firm potatoes harvested from the highlands of Nyandarua. Ideal for retail, restaurants, and bulk kitchen supply.",
  },
  {
    id: "vine-tomatoes",
    name: "Vine Tomatoes",
    category: "Vegetables",
    price: 80,
    unit: "kg",
    farmer: "Mary Wanjiku",
    farmerId: "mary-wanjiku",
    location: "Nakuru",
    image: "https://images.unsplash.com/photo-1546470427-e5ac89cd0b5a?auto=format&fit=crop&w=760&q=85",
    rating: 4.9,
    reviews: 28,
    availableQuantity: 180,
    verified: true,
    harvest: "Harvested 19 Aug 2026",
    description: "Bright, naturally ripened tomatoes picked to order and packed carefully for the journey to market.",
  },
  {
    id: "sweet-carrots",
    name: "Sweet Carrots",
    category: "Vegetables",
    price: 65,
    unit: "kg",
    farmer: "John Kamau",
    farmerId: "john-kamau",
    location: "Nyandarua",
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=760&q=85",
    rating: 4.7,
    reviews: 19,
    availableQuantity: 220,
    verified: true,
    harvest: "Harvested 17 Aug 2026",
    description: "Crunchy, sweet carrots grown in rich volcanic soil and sorted for consistent size.",
  },
  {
    id: "dry-yellow-maize",
    name: "Dry Yellow Maize",
    category: "Grains",
    price: 70,
    unit: "kg",
    farmer: "Peter Otieno",
    farmerId: "peter-otieno",
    location: "Kisumu",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=760&q=85",
    rating: 4.6,
    reviews: 14,
    availableQuantity: 1000,
    verified: false,
    harvest: "Harvested July 2026",
    description: "Sun-dried yellow maize suitable for household, wholesale, and milling customers.",
  },
  {
    id: "garden-kale",
    name: "Garden Kale",
    category: "Vegetables",
    price: 45,
    unit: "kg",
    farmer: "Mary Wanjiku",
    farmerId: "mary-wanjiku",
    location: "Nakuru",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=760&q=85",
    rating: 4.8,
    reviews: 23,
    availableQuantity: 90,
    verified: true,
    harvest: "Harvested 20 Aug 2026",
    description: "Tender, leafy sukuma wiki harvested this morning for maximum freshness.",
  },
  {
    id: "red-kidney-beans",
    name: "Red Kidney Beans",
    category: "Legumes",
    price: 145,
    unit: "kg",
    farmer: "Peter Otieno",
    farmerId: "peter-otieno",
    location: "Kisumu",
    image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=760&q=85",
    rating: 4.7,
    reviews: 11,
    availableQuantity: 320,
    verified: false,
    harvest: "Harvested June 2026",
    description: "Full-flavoured, carefully dried kidney beans with a clean, even grade.",
  },
];

const marketPrices = [
  { product: "Potatoes", currentPrice: 55, previousPrice: 51, change: 8, market: "Wakulima Market", date: "20 Aug 2026" },
  { product: "Tomatoes", currentPrice: 80, previousPrice: 71, change: 12, market: "Nakuru Market", date: "20 Aug 2026" },
  { product: "Maize", currentPrice: 70, previousPrice: 72, change: -3, market: "Kibuye Market", date: "20 Aug 2026" },
  { product: "Cabbage", currentPrice: 42, previousPrice: 39, change: 7, market: "Wakulima Market", date: "20 Aug 2026" },
  { product: "Onions", currentPrice: 110, previousPrice: 103, change: 7, market: "Nakuru Market", date: "20 Aug 2026" },
  { product: "Avocados", currentPrice: 95, previousPrice: 100, change: -5, market: "Kibuye Market", date: "20 Aug 2026" },
];

const detailReviews = [
  { id: "review-1", reviewer: "Amina N.", rating: 5, date: "16 Aug 2026", text: "The potatoes arrived clean, firm, and exactly as described. John kept us updated throughout.", verifiedPurchase: true },
  { id: "review-2", reviewer: "Peter M.", rating: 5, date: "09 Aug 2026", text: "Reliable quality and quick response. We have already placed a second order.", verifiedPurchase: true },
  { id: "review-3", reviewer: "Lydia W.", rating: 4, date: "28 Jul 2026", text: "Good quality produce and friendly communication.", verifiedPurchase: true },
];

router.get("/products", (req, res) => {
  const search = String(req.query.search ?? "").toLowerCase();
  const category = String(req.query.category ?? "");
  const location = String(req.query.location ?? "");
  const sort = String(req.query.sort ?? "recommended");
  let result = products.filter((product) =>
    (!search || `${product.name} ${product.category} ${product.farmer}`.toLowerCase().includes(search)) &&
    (!category || product.category === category) &&
    (!location || product.location === location),
  );
  if (sort === "price-low") result = [...result].sort((a, b) => a.price - b.price);
  if (sort === "price-high") result = [...result].sort((a, b) => b.price - a.price);
  if (sort === "popular") result = [...result].sort((a, b) => b.reviews - a.reviews);
  res.json(GetProductsResponse.parse(result));
});

router.get("/products/:id", (req, res) => {
  const product = products.find((item) => item.id === req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  const farmer = farmers.find((item) => item.id === product.farmerId) ?? farmers[0];
  const detail = {
    ...product,
    images: [product.image, product.image, product.image],
    minimumOrder: 20,
    delivery: "Delivery available across Nairobi and nearby counties. Confirm the exact fee at checkout.",
    farmerProfile: farmer,
    harvestInfo: {
      harvestDate: "18 August 2026",
      available: `${product.availableQuantity} kg`,
      freshness: "Expected fresh for 7–10 days when stored well",
      nextHarvest: "September 2026",
    },
    reviewItems: detailReviews,
  };
  res.json(GetProductResponse.parse(detail));
  return;
});

router.get("/farmers", (_req, res) => res.json(GetFarmersResponse.parse(farmers)));

router.get("/farmers/:id", (req, res) => {
  const farmer = farmers.find((item) => item.id === req.params.id);
  if (!farmer) {
    res.status(404).json({ error: "Farmer not found" });
    return;
  }
  const detail = {
    ...farmer,
    about: `${farmer.name} runs ${farmer.farmName}, a family-led farm focused on consistent quality and straightforward relationships with buyers.`,
    farmSize: "24 acres",
    deliveryAreas: ["Nairobi", "Nakuru", "Nyandarua", "Kiambu"],
    products: products.filter((product) => product.farmerId === farmer.id),
  };
  res.json(GetFarmerResponse.parse(detail));
  return;
});

router.get("/market-prices", (_req, res) => res.json(GetMarketPricesResponse.parse(marketPrices)));

router.get("/marketplace/summary", (_req, res) => {
  res.json(GetMarketplaceSummaryResponse.parse({
    farms: 128,
    products: 642,
    counties: 14,
    orders: 1840,
    averageRating: 4.8,
  }));
});

export default router;