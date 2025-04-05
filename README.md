# Overview

BloomBear is a sophisticated online flower delivery service based in Berlin, Germany. The platform offers a wide selection of beautiful bouquets and floral arrangements for all occasions with fast and reliable delivery.

![BloomBear Logo](/public/logo.svg)

## Showcase

### Hero section
![Screenshot_20250322_233142](https://github.com/user-attachments/assets/6db9da16-737f-4abf-8ac9-a3d51af36dd0)

### Popular bouquets section
![Screenshot_20250322_233157](https://github.com/user-attachments/assets/d41c2fc1-5e16-446d-be31-727513de66eb)

### Catalog page
![Screenshot_20250322_233214](https://github.com/user-attachments/assets/eb576ba0-dc0a-4404-8fac-66d526b71f43)

### Cart Sheet
![Screenshot_20250322_233221](https://github.com/user-attachments/assets/fb04982f-a0ba-47cc-a10c-7c87aa001830)

### About us Page
![Screenshot_20250322_233254](https://github.com/user-attachments/assets/b02e2538-ddb1-4f17-ac06-efc576a0b000)

### Checkout page
![Screenshot_20250322_233317](https://github.com/user-attachments/assets/f73a10a7-203c-48db-b4dd-3b624e37adb6)

## Features

- **Comprehensive Catalog**: Browse through a diverse range of bouquets categorized by type and occasion
- **Smart Filtering**: Filter products by category, occasion, price range, and more
- **User-Friendly Cart System**: Easily add products to cart, manage quantities, and checkout
- **Favorites**: Save your favorite products for future reference
- **Responsive Design**: Optimized for all devices, from desktop to mobile
- **Dark/Light Theme**: Choose your preferred theme for a comfortable browsing experience
- **Detailed Product Information**: Each product includes high-quality images, descriptions, and pricing
- **Search Functionality**: Quickly find specific products with our powerful search feature
- **Secure Checkout Process**: Simple, intuitive checkout with multiple payment options

## Tech Stack

- **Frontend**:
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind 4
  - Radix UI
  - Zustand for state management
  - Zod for form validation
  - shadcn components

- **Backend**:
  - Prisma ORM
  - PostgreSQL database
  - Next.js Server Actions

## Getting Started

### Prerequisites

- Node Or Bun
- PostgreSQL database
- npm or yarn or pnpm or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Leytox/bloombear.git
   cd bloombear
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/bloombear"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
   STRIPE_SECRET_KEY="your_stripe_secret_key"
   AUTH_SECRET="generate_a_secret_key_using_authjs"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Seed the database (if available):
   ```bash
   npx prisma db seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- **`/app`**: Next.js application routes and page components
- **`/components`**: Reusable React components
- **`/constants`**: Application constants and static data
- **`/lib`**: Utility functions and shared code
- **`/prisma`**: Database schema and migrations
- **`/public`**: Static assets (images, icons, etc.)
- **`/store`**: Zustand stores for global state management
- **`/types`**: TypeScript type definitions
- **`/actions`**: Server actions for database operations

## Key Pages

- **Home**: Showcases featured bouquets, popular categories, and special offers
- **Catalog**: Browse the full product range with filtering options
- **Product Detail**: View detailed product information and add to cart
- **Checkout**: Complete your purchase with address and payment information
- **Help Section**: Access information about delivery, payment methods, contacts, and more

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Flower images from [Unsplash](https://unsplash.com)
- Icons from [Lucide Icons](https://lucide.dev)
