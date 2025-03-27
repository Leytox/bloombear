import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Clear existing data to avoid conflicts
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.productOnOccasion.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.occasion.deleteMany({});

  const categories = [
    {
      name: "Fresh Bouquets",
      description: "Handmade bouquets of seasonal fresh flowers",
      image:
        "https://images.unsplash.com/photo-1596438459194-f275f413d6ff?w=600",
      slug: "fresh-bouquets",
    },
    {
      name: "Roses",
      description:
        "Classic and elegant roses in various colors and compositions",
      image:
        "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=600",
      slug: "roses",
    },
    {
      name: "Lilies",
      description: "Fragrant and beautiful lilies for any occasion",
      image:
        "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600",
      slug: "lilies",
    },
    {
      name: "Orchids",
      description: "Exotic and durable orchid arrangements",
      image:
        "https://images.unsplash.com/photo-1624819107184-0c4fe02da00c?w=600",
      slug: "orchids",
    },
    {
      name: "Plants",
      description: "Indoor and outdoor plants that will last for years to come",
      image:
        "https://images.unsplash.com/photo-1463320898484-cdee8141c787?w=600",
      slug: "plants",
    },
    {
      name: "Gift Baskets",
      description: "Gift baskets with flowers and treats",
      image: "https://images.unsplash.com/photo-1503652601-557d07733ddc?w=600",
      slug: "gift-baskets",
    },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  // Create Occasions
  const occasions = [
    {
      name: "Birthday",
      description: "Celebrate birthdays with beautiful floral arrangements",
      image: "https://images.unsplash.com/photo-1557166357-b2838299bbff?w=600",
    },
    {
      name: "Anniversary",
      description: "Romantic floral arrangements to celebrate special dates",
      image:
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600",
    },
    {
      name: "Wedding",
      description: "Elegant flowers for the perfect wedding day",
      image: "https://images.unsplash.com/photo-1561410020-f484d7db6b3e?w=600",
    },
    {
      name: "Condolences",
      description: "Express your condolences with the help of compositions",
      image:
        "https://images.unsplash.com/photo-1659902374294-0a97f40b8877?w=600",
    },
    {
      name: "Recovery",
      description: "Make someone happy with bright colors",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600",
    },
    {
      name: "St. Valentine's",
      description: "Show your love with stunning compositions",
      image:
        "https://images.unsplash.com/photo-1581938165093-050aeb5ef218?w=600",
    },
    {
      name: "Mother's Day",
      description: "Express your gratitude with beautiful flowers",
      image:
        "https://images.unsplash.com/photo-1526277015674-026cb84653ec?w=600",
    },
  ];

  for (const occasion of occasions) {
    await prisma.occasion.create({
      data: occasion,
    });
  }

  // Create Products
  const products = [
    // Fresh Bouquets (categoryId: 1)
    {
      name: "Spring Delight",
      description:
        "A colorful mix of spring flowers including tulips, daffodils and hyacinths",
      price: 50,
      image:
        "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=600",
      categoryId: 1,
      inStock: true,
      rating: 4.7,
      discount: 0,
    },
    {
      name: "Summer Breeze",
      description:
        "Bright sunflowers, daisies and wildflowers in a rustic arrangement",
      price: 54,
      image:
        "https://images.unsplash.com/photo-1527678590842-1b347e1c6ada?w=600",
      categoryId: 1,
      inStock: true,
      rating: 4.8,
      discount: 10,
    },
    {
      name: "Wildflowers",
      description: "Natural wildflower arrangement with seasonal flowers",
      price: 49,
      image:
        "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600",
      categoryId: 1,
      inStock: true,
      rating: 4.0,
      discount: 0,
    },
    {
      name: "Bouquet of Red Roses",
      description: "A classic dozen red roses symbolizing love and passion",
      price: 69,
      image:
        "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=600",
      categoryId: 2,
      inStock: true,
      rating: 4.9,
      discount: 0,
    },
    {
      name: "The Pink Rose Collection",
      description: "Gentle collection of pink roses for your loved one",
      price: 59,
      image:
        "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600",
      categoryId: 2,
      inStock: true,
      rating: 4.6,
      discount: 5,
    },
    {
      name: "Rainbow Rose Composition",
      description: "Stunning multi-colored roses in a premium vase",
      price: 79,
      image:
        "https://images.unsplash.com/photo-1495231916356-a86217efff12?w=600",
      categoryId: 2,
      inStock: false,
      rating: 4.8,
      discount: 0,
    },
    {
      name: "Stargazer Lily Bouquet",
      description: "Fragrant stargazer lilies with greenery and accent flowers",
      price: 55,
      image:
        "https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?w=600",
      categoryId: 3,
      inStock: true,
      rating: 4.7,
      discount: 0,
    },
    {
      name: "White Lilies",
      description: "Pure white lilies symbolizing peace and serenity",
      price: 62,
      image:
        "https://images.unsplash.com/photo-1567428051128-5f09a0200655?w=600",
      categoryId: 3,
      inStock: true,
      rating: 4.8,
      discount: 15,
    },
    {
      name: "Asian Lily Mix",
      description: "A colorful mix of Asiatic lilies in vibrant hues",
      price: 58,
      image:
        "https://images.unsplash.com/photo-1679434834423-0506e02748c6?w=600",
      categoryId: 3,
      inStock: true,
      rating: 4.5,
      discount: 0,
    },
    {
      name: "Phalaenopsis orchid",
      description: "Elegant white phalaenopsis orchid in a decorative pot",
      price: 79,
      image:
        "https://images.unsplash.com/photo-1618080578815-335456280012?w=600",
      categoryId: 4,
      inStock: true,
      rating: 3.0,
      discount: 0,
    },
    {
      name: "Purple Dendrobium Orchids.",
      description: "Exotic purple dendrobium orchids in modern composition",
      price: 84,
      image:
        "https://images.unsplash.com/photo-1531217182035-78d279dcdb7f?w=600",
      categoryId: 4,
      inStock: false,
      rating: 4.7,
      discount: 10,
    },
    {
      name: "Orchid Garden",
      description: "Mixed varieties of orchids in a premium garden basket",
      price: 129,
      image: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?w=600",
      categoryId: 4,
      inStock: true,
      rating: 2.3,
      discount: 5,
    },
    {
      name: "Spathiphyllum",
      description: "Air purifying spathiphyllum in a ceramic pot",
      price: 49,
      image:
        "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=600",
      categoryId: 5,
      inStock: true,
      rating: 4.6,
      discount: 0,
    },
    {
      name: "Succulent Collection",
      description: "An assortment of small succulents in decorative containers",
      price: 59,
      image:
        "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?w=600",
      categoryId: 5,
      inStock: true,
      rating: 5.0,
      discount: 0,
    },
    {
      name: "Ficus lyreus",
      description: "Popular lyre ficus in a wicker basket",
      price: 99,
      image:
        "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600",
      categoryId: 5,
      inStock: true,
      rating: 4.7,
      discount: 8,
    },
    {
      name: "Basket of Flowers and Chocolate",
      description: "Premium flowers with gourmet chocolate in a gift basket",
      price: 89,
      image:
        "https://images.unsplash.com/photo-1473366379653-65061f9c3b40?w=600",
      categoryId: 6,
      inStock: true,
      rating: 4.9,
      discount: 0,
    },
    {
      name: "The Spa and Flowers set",
      description: "Relaxing spa products combined with fresh flowers",
      price: 99,
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600",
      categoryId: 6,
      inStock: true,
      rating: 4.8,
      discount: 12,
    },
    {
      name: "Wine and Flowers Basket",
      description: "Premium bottle of wine with matching floral arrangement",
      price: 129,
      image:
        "https://images.unsplash.com/photo-1627922206324-e9ab1667bd23?w=600",
      categoryId: 6,
      inStock: true,
      rating: 4.9,
      discount: 5,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  // Create Product-Occasion relationships
  const productOccasions = [
    // Birthday
    { productId: 1, occasionId: 1 },
    { productId: 2, occasionId: 1 },
    { productId: 5, occasionId: 1 },
    { productId: 14, occasionId: 1 },
    { productId: 16, occasionId: 1 },
    { productId: 17, occasionId: 1 },

    // Anniversary
    { productId: 4, occasionId: 2 },
    { productId: 5, occasionId: 2 },
    { productId: 6, occasionId: 2 },
    { productId: 10, occasionId: 2 },
    { productId: 18, occasionId: 2 },

    // Wedding
    { productId: 4, occasionId: 3 },
    { productId: 8, occasionId: 3 },
    { productId: 10, occasionId: 3 },
    { productId: 12, occasionId: 3 },

    // Condolences
    { productId: 8, occasionId: 4 },
    { productId: 9, occasionId: 4 },
    { productId: 13, occasionId: 4 },

    // Recovery
    { productId: 1, occasionId: 5 },
    { productId: 2, occasionId: 5 },
    { productId: 13, occasionId: 5 },
    { productId: 14, occasionId: 5 },
    { productId: 17, occasionId: 5 },

    // St. Valentine
    { productId: 4, occasionId: 6 },
    { productId: 5, occasionId: 6 },
    { productId: 6, occasionId: 6 },
    { productId: 17, occasionId: 6 },
    { productId: 18, occasionId: 6 },

    // Mother's Day
    { productId: 1, occasionId: 7 },
    { productId: 2, occasionId: 7 },
    { productId: 5, occasionId: 7 },
    { productId: 10, occasionId: 7 },
    { productId: 14, occasionId: 7 },
    { productId: 17, occasionId: 7 },
  ];

  for (const relation of productOccasions) {
    await prisma.productOnOccasion.create({
      data: relation,
    });
  }

  console.log("Database seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
