import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const categories = [
    {
      name: "Свежие Букеты",
      description: "Букеты ручной работы из сезонных свежих цветов",
      image:
        "https://images.unsplash.com/photo-1596438459194-f275f413d6ff?w=600",
      slug: "fresh-bouquets",
    },
    {
      name: "Розы",
      description:
        "Классические и элегантные розы различных цветов и композиций",
      image:
        "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=600",
      slug: "roses",
    },
    {
      name: "Лилии",
      description: "Ароматные и красивые лилии для любого случая",
      image:
        "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600",
      slug: "lilies",
    },
    {
      name: "Растения",
      description: "Комнатные и уличные растения, которые прослужат годами",
      image:
        "https://images.unsplash.com/photo-1463320898484-cdee8141c787?w=600",
      slug: "plants",
    },
    {
      name: "Орхидеи",
      description: "Экзотические и долговечные композиции из орхидей",
      image:
        "https://images.unsplash.com/photo-1624819107184-0c4fe02da00c?w=600",
      slug: "orchids",
    },
    {
      name: "Подарочные Корзины",
      description: "Подарочные корзины с цветами и угощениями",
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
      name: "День Рождения",
      description:
        "Отпразднуйте дни рождения с красивыми цветочными композициями",
      image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600",
    },
    {
      name: "Годовщина",
      description:
        "Романтические цветочные композиции для празднования особых дат",
      image:
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600",
    },
    {
      name: "Свадьба",
      description: "Элегантные цветы для идеального свадебного дня",
      image:
        "https://images.unsplash.com/photo-1509610973147-232dfea52a97?w=600",
    },
    {
      name: "Соболезнования",
      description: "Выразите свои соболезнования с помощью композиций",
      image:
        "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?w=600",
    },
    {
      name: "Выздоровление",
      description: "Порадуйте кого-то яркими цветами",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600",
    },
    {
      name: "День Святого Валентина",
      description: "Покажите свою любовь с помощью потрясающих композиций",
      image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?w=600",
    },
    {
      name: "День Матери",
      description: "Выразите благодарность красивыми цветами",
      image:
        "https://images.unsplash.com/photo-1594906838472-8e2c33f85851?w=600",
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
      name: "Весеннее Наслаждение",
      description:
        "Красочная смесь весенних цветов, включая тюльпаны, нарциссы и гиацинты",
      price: 4999,
      image:
        "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=600",
      categoryId: 1,
      inStock: true,
      rating: 4.7,
      discount: 0,
    },
    {
      name: "Букет Красных Роз",
      description:
        "Классическая дюжина красных роз, символизирующих любовь и страсть",
      price: 6999,
      image:
        "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=600",
      categoryId: 2,
      inStock: true,
      rating: 4.9,
      discount: 0,
    },
    {
      name: "Коллекция Розовых Роз",
      description:
        "Элегантный букет розовых роз, олицетворяющих изящество и восхищение",
      price: 5999,
      image:
        "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600",
      categoryId: 2,
      inStock: true,
      rating: 4.6,
      discount: 5,
    },
    {
      name: "Радужная Композиция из Роз",
      description: "Потрясающие разноцветные розы в премиальной вазе",
      price: 7999,
      image:
        "https://images.unsplash.com/photo-1495231916356-a86217efff12?w=600",
      categoryId: 2,
      inStock: false,
      rating: 4.8,
      discount: 0,
    },
    {
      name: "Фикус Лировидный",
      description: "Популярный фикус лировидный в плетеной корзине",
      price: 9999,
      image:
        "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600",
      categoryId: 5,
      inStock: true,
      rating: 4.7,
      discount: 8,
    },
    {
      name: "Набор Спа и Цветы",
      description: "Расслабляющие спа-продукты в сочетании со свежими цветами",
      price: 9999,
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600",
      categoryId: 6,
      inStock: true,
      rating: 4.8,
      discount: 12,
    },
    {
      name: "Летний Бриз",
      description:
        "Яркие подсолнухи, ромашки и полевые цветы в деревенской композиции",
      price: 5499,
      image:
        "https://images.unsplash.com/photo-1527678590842-1b347e1c6ada?w=600",
      categoryId: 1,
      inStock: true,
      rating: 4.8,
      discount: 10,
    },
    {
      name: "Букет из Лилий Звездочет",
      description: "Ароматные лилии звездочет с зеленью и акцентными цветами",
      price: 5599,
      image:
        "https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?w=600",
      categoryId: 3,
      inStock: true,
      rating: 4.7,
      discount: 0,
    },
    {
      name: "Композиция из Белых Лилий",
      description: "Чисто белые лилии, символизирующие мир и безмятежность",
      price: 6299,
      image:
        "https://images.unsplash.com/photo-1567428051128-5f09a0200655?w=600",
      categoryId: 3,
      inStock: true,
      rating: 4.8,
      discount: 15,
    },
    {
      name: "Микс Азиатских Лилий",
      description: "Красочная смесь азиатских лилий в ярких оттенках",
      price: 5899,
      image:
        "https://images.unsplash.com/photo-1679434834423-0506e02748c6?w=600",
      categoryId: 3,
      inStock: true,
      rating: 4.5,
      discount: 0,
    },
    {
      name: "Пурпурные Орхидеи Дендробиум",
      description:
        "Экзотические пурпурные орхидеи дендробиум в современной композиции",
      price: 8499,
      image:
        "https://images.unsplash.com/photo-1531217182035-78d279dcdb7f?w=600",
      categoryId: 4,
      inStock: false,
      rating: 4.7,
      discount: 10,
    },
    {
      name: "Спатифиллум",
      description: "Очищающий воздух спатифиллум в керамическом горшке",
      price: 4999,
      image:
        "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=600",
      categoryId: 5,
      inStock: true,
      rating: 4.6,
      discount: 0,
    },
    {
      name: "Корзина Вино и Цветы",
      description:
        "Премиальная бутылка вина с соответствующей цветочной композицией",
      price: 12999,
      image:
        "https://images.unsplash.com/photo-1627922206324-e9ab1667bd23?w=600",
      categoryId: 6,
      inStock: true,
      rating: 4.9,
      discount: 5,
    },
    {
      name: "Корзина Цветов и Шоколада",
      description:
        "Премиальные цветы с изысканным шоколадом в подарочной корзине",
      price: 8999,
      image:
        "https://images.unsplash.com/photo-1473366379653-65061f9c3b40?w=600",
      categoryId: 6,
      inStock: true,
      rating: 4.9,
      discount: 0,
    },
    {
      name: "Орхидея Фаленопсис",
      description: "Элегантная белая орхидея фаленопсис в декоративном горшке",
      price: 7999,
      image:
        "https://images.unsplash.com/photo-1618080578815-335456280012?w=600",
      categoryId: 4,
      inStock: true,
      rating: 3.0,
      discount: 0,
    },
    {
      name: "Коллекция Суккулентов",
      description:
        "Ассортимент небольших суккулентов в декоративных контейнерах",
      price: 5999,
      image:
        "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?w=600",
      categoryId: 5,
      inStock: true,
      rating: 5.0,
      discount: 0,
    },
    {
      name: "Сад Орхидей",
      description: "Смешанные сорта орхидей в премиальной садовой корзине",
      price: 12999,
      image: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?w=600",
      categoryId: 4,
      inStock: true,
      rating: 2.3,
      discount: 5,
    },
    {
      name: "Полевые Цветы",
      description:
        "Естественная композиция из полевых цветов с сезонными цветами",
      price: 4899,
      image:
        "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600",
      categoryId: 1,
      inStock: true,
      rating: 4.0,
      discount: 0,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  // Create Product-Occasion relationships
  const productOccasions = [
    // День Рождения
    { productId: 1, occasionId: 1 },
    { productId: 2, occasionId: 1 },
    { productId: 5, occasionId: 1 },
    { productId: 14, occasionId: 1 },
    { productId: 16, occasionId: 1 },
    { productId: 17, occasionId: 1 },

    // Годовщина
    { productId: 4, occasionId: 2 },
    { productId: 5, occasionId: 2 },
    { productId: 6, occasionId: 2 },
    { productId: 10, occasionId: 2 },
    { productId: 18, occasionId: 2 },

    // Свадьба
    { productId: 4, occasionId: 3 },
    { productId: 8, occasionId: 3 },
    { productId: 10, occasionId: 3 },
    { productId: 12, occasionId: 3 },

    // Соболезнования
    { productId: 8, occasionId: 4 },
    { productId: 9, occasionId: 4 },
    { productId: 13, occasionId: 4 },

    // Выздоровление
    { productId: 1, occasionId: 5 },
    { productId: 2, occasionId: 5 },
    { productId: 13, occasionId: 5 },
    { productId: 14, occasionId: 5 },
    { productId: 17, occasionId: 5 },

    // День Святого Валентина
    { productId: 4, occasionId: 6 },
    { productId: 5, occasionId: 6 },
    { productId: 6, occasionId: 6 },
    { productId: 17, occasionId: 6 },
    { productId: 18, occasionId: 6 },

    // День Матери
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

  console.log("База данных заполнена!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
