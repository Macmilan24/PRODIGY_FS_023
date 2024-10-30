import Product from "./models/Product";

await Product.create([
  {
    title: "Classic White T-Shirt",
    description: "A comfortable, everyday white T-shirt.",
    media: ["image1.jpg", "image2.jpg"],
    category: "Clothing",
    tags: ["t-shirt", "white", "casual"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["white"],
    price: 15.99,
    expense: 8.99,
  },
  {
    title: "Blue Jeans",
    description: "Durable blue jeans with a classic fit.",
    media: ["image3.jpg", "image4.jpg"],
    category: "Clothing",
    tags: ["jeans", "blue", "denim"],
    sizes: ["30", "32", "34", "36"],
    colors: ["blue"],
    price: 49.99,
    expense: 25.99,
  },
]);
