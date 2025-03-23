import {
  SiAmericanexpress,
  SiMastercard,
  SiPaypal,
  SiVisa,
} from "@icons-pack/react-simple-icons";
import {
  CreditCardIcon,
  BanknoteIcon,
  HandHelpingIcon,
  ClockIcon,
  CheckCheckIcon,
  PackageIcon,
  SearchCheckIcon,
  Building2Icon,
  MountainIcon,
  HouseIcon,
  TruckIcon,
  HeartIcon,
  LeafIcon,
  StarIcon,
  TrophyIcon,
} from "lucide-react";

export const advantages = [
  {
    title: "Personalized Approach",
    description:
      "We create bouquets considering your wishes, budget, and occasion, making each order special.",
  },
  {
    title: "Fast Delivery",
    description:
      "We deliver bouquets within 2-3 hours across Berlin, working 24/7 without days off.",
  },
  {
    title: "Freshness Guarantee",
    description:
      "We guarantee flower freshness for up to 7 days from delivery, with proper care.",
  },
  {
    title: "Wide Selection",
    description:
      "We offer over 1000 different compositions for any occasion and budget.",
  },
  {
    title: "Convenient Payment",
    description:
      "We accept cash, bank cards, and electronic payments for your convenience.",
  },
];

export const values = [
  {
    title: "Quality",
    description:
      "We work only with fresh flowers from verified suppliers so your bouquets bring joy for as long as possible.",
    icon: StarIcon,
  },
  {
    title: "Uniqueness",
    description:
      "Each bouquet is unique, we create compositions considering your wishes and preferences.",
    icon: HeartIcon,
  },
  {
    title: "Eco-friendliness",
    description:
      "We care about nature and use biodegradable materials for packaging and decoration.",
    icon: LeafIcon,
  },
  {
    title: "Professionalism",
    description:
      "Our team consists of experienced florists with professional education and many years of experience.",
    icon: TrophyIcon,
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Olivia Woods",
    avatar: "/avatar1.jpg",
    rating: 5,
    text: "Bought flowers for a wedding, really loved it!",
    date: "2023-03-15",
  },
  {
    id: 2,
    name: "Alexandra Clark",
    avatar: "/avatar2.jpg",
    rating: 4,
    text: "The flowers were fresh and beautiful!",
    date: "2023-03-10",
  },
  {
    id: 3,
    name: "Steve Thompson",
    avatar: "/avatar3.jpg",
    rating: 5,
    text: "I really liked the quality of flowers and service!",
    date: "2023-03-05",
  },
];

export const deliveryBenefits = [
  {
    title: "Fast Delivery",
    description: "Delivery within 2 hours across Berlin",
    icon: TruckIcon,
  },
  {
    title: "Fresh Flowers",
    description: "Flowers from the best plantations worldwide",
    icon: PackageIcon,
  },
  {
    title: "Convenient Payment",
    description: "Pay by card or cash",
    icon: CreditCardIcon,
  },
  {
    title: "24/7 Service",
    description: "We work 24/7 without days off",
    icon: ClockIcon,
  },
];

export const paymentMethods = [
  {
    id: 1,
    name: "Card",
    description: "Visa, MasterCard, American Express, PayPal",
    icon: CreditCardIcon,
  },
  {
    id: 2,
    name: "Cash",
    description: "Upon receiving the order",
    icon: BanknoteIcon,
  },
  {
    id: 3,
    name: "Installment",
    description: "0% for 6 months",
    icon: HandHelpingIcon,
  },
];

export const paymentSystems = [
  {
    id: 1,
    name: "Visa",
    icon: SiVisa,
  },
  {
    id: 2,
    name: "MasterCard",
    icon: SiMastercard,
  },
  {
    id: 3,
    name: "American Express",
    icon: SiAmericanexpress,
  },
  {
    id: 4,
    name: "Paypal",
    icon: SiPaypal,
  },
];

export const paymentFAQ = [
  {
    id: 1,
    question: "How to pay for an order online?",
    answer:
      "After placing an order, you will be redirected to a secure payment page. Enter your card details and confirm the payment.",
  },
  {
    id: 2,
    question: "Is card payment safe?",
    answer:
      "Yes, we use modern encryption protocols to protect your data. Payment is processed through a secure connection.",
  },
];

export const deliveryOptions = [
  {
    id: 1,
    title: "24/7 Delivery",
    description: "We deliver flowers 24/7, including holidays and weekends",
    icon: ClockIcon,
  },
  {
    id: 2,
    title: "Careful Delivery",
    description: "Special boxes to preserve flowers",
    icon: PackageIcon,
  },
  {
    id: 3,
    title: "Delivery Precision",
    description: "Delivery with 2-hour accuracy",
    icon: CheckCheckIcon,
  },
  {
    id: 4,
    title: "Tracking",
    description: "SMS notifications about delivery status",
    icon: SearchCheckIcon,
  },
];

export const deliveryZones = [
  {
    id: 1,
    name: "Berlin within city",
    description: "Standard city delivery",
    price: "Free from 25 €",
    time: "2-3 hours",
    icon: Building2Icon,
  },
  {
    id: 2,
    name: "Outside Berlin up to 10 km",
    description: "Near Berlin suburbs",
    price: "10 €",
    time: "3-4 hours",
    icon: HouseIcon,
  },
  {
    id: 3,
    name: "Outside Berlin from 10 to 25 km",
    description: "Distant Berlin suburbs",
    price: "20 €",
    time: "4-5 hours",
    icon: MountainIcon,
  },
];

export const importantInfo = [
  "Delivery is carried out only after order confirmation by a manager",
  "Delivery times may increase during holidays",
  "For delivery outside Berlin, please check delivery availability with a manager",
  "Self-pickup is available from our store",
  "Night delivery (from 10:00 PM to 8:00 AM) is available by prior arrangement",
];

export const promotions = [
  {
    id: 1,
    title: "20% off for your first order",
    description:
      "Special offer for new customers! Get a 20% discount on your first order.",
    period: "Until December 31, 2024",
    image: "/promo1.jpg",
    badge: "-20%",
    conditions: [
      "Valid only for new customers",
      "Minimum order amount 3000",
      "Cannot be combined with other promotions",
    ],
    link: "/catalog",
  },
  {
    id: 2,
    title: "Free Delivery",
    description: "Free delivery for orders from 25 € within Berlin Berlin.",
    period: "Permanent promotion",
    image: "/promo2.jpg",
    conditions: [
      "Order amount from 25 €",
      "Delivery within Berlin",
      "On the day of order",
    ],
    link: "/delivery",
  },
];
