import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100);
};
