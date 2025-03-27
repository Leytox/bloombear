"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2Icon, CreditCardIcon, AlertCircleIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { verifyPaymentIntent } from "@/actions/payment";

type CheckoutFormProps = {
  clientSecret: string;
  onSuccessAction: () => void;
  amount?: number;
  currency?: string;
};

export default function StripeCheckoutForm({
  clientSecret,
  onSuccessAction,
  amount,
  currency = "EUR",
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setIsLoading(false);
      setError("Card element not found");
      return;
    }

    try {
      // Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        },
      );

      if (error) setError(error.message || "Payment failed");
      else if (paymentIntent.status === "succeeded") {
        await verifyPaymentIntent(paymentIntent.id);
        onSuccessAction();
      } else setError(`Payment status: ${paymentIntent.status}`);
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Payment error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCardIcon className="h-5 w-5 text-primary" />
              Card Details
            </CardTitle>
          </div>
          <CardDescription>
            Enter your card information to complete payment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-background rounded-md border">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                    iconColor: "#6366f1",
                  },
                  invalid: {
                    color: "#e11d48",
                    iconColor: "#e11d48",
                  },
                },
              }}
              onChange={(event) => {
                setCardComplete(event.complete);
                if (event.error) {
                  setError(event.error.message);
                } else {
                  setError(null);
                }
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          {error && (
            <Alert variant="destructive" className="text-sm">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={!stripe || isLoading || !cardComplete}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Processing payment...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <CreditCardIcon />
                  Pay {amount ? formatCurrency(amount) : "Now"}
                </div>
              </div>
            )}
          </Button>
          {amount && (
            <div className="text-center">
              <p className="text-muted-foreground text-sm mt-1">
                Secure payment with Stripe
              </p>
            </div>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
