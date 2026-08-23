import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Wireless Headphones",
    price: 2999,
    category: "Electronics",
    image: "[images.unsplash.com](https://images.unsplash.com/photo-1505740420928-5e560c06d30e)",
    description: "High-quality wireless headphones with noise isolation."
  },
  {
    name: "Smart Watch",
    price: 4999,
    category: "Electronics",
    image: "[images.unsplash.com](https://images.unsplash.com/photo-1523275335684-37898b6baf30)",
    description: "Stylish smartwatch with health and fitness tracking."
  },
  {
    name: "Men's Casual Shirt",
    price: 1499,
    category: "Fashion",
    image: "[images.unsplash.com](https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf)",
    description: "Comfortable and stylish casual shirt for everyday wear."
  },
  {
    name: "Office Backpack",
    price: 1999,
    category: "Accessories",
    image: "[images.unsplash.com](https://images.unsplash.com/photo-1542291026-7eec264c27ff)",
    description: "Durable backpack suitable for office and travel."
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedData();
