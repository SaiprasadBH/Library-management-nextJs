"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/hooks/use-toast";
import { createOrder, updateUserWallet } from "@/lib/actions";
import { IMember, IProfessor } from "@/lib/definitions";

interface TransactionDetails {
  memberId: number;
  paymentId: string;
  orderId: string;
}

interface PaymentPageClientProps {
  member: IMember;
}

export default function PaymentPageClient({ member }: PaymentPageClientProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [transactionDetails, setTransactionDetails] =
    useState<TransactionDetails | null>(null);
  const [amount, setAmount] = useState(101);

  const handlePayNow = async () => {
    setLoading(true);
    try {
      const order = await createOrder(member.id, amount);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        handler: async function (response: any) {
          try {
            setTransactionDetails({
              memberId: member.id,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            });
            const result = await updateUserWallet(member.id, amount);
            if (result.success) {
              toast({
                title: "Success",
                description: "Wallet updated successfully.",
              });
            } else {
              throw new Error(result.error);
            }
          } catch (error) {
            console.error("Error updating wallet:", error);
            toast({
              title: "Error",
              description: "Failed to update wallet. Please try again.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: member.name,
          email: member.email,
        },
        theme: {
          color: "#0D9488",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-4 sm:p-8">
      <Card className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-xl border border-teal-500/20 shadow-2xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl sm:text-4xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
            {transactionDetails ? "Payment Successful" : "Payment Summary"}
          </CardTitle>
          <p className="text-center text-gray-400 text-lg">
            {transactionDetails
              ? "Thank you for your payment"
              : "Please review your payment details"}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!transactionDetails ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center text-white text-xl">
                <span className="font-medium">Add money to wallet</span>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="amount" className="sr-only">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-24 bg-gray-700 border-gray-600 text-white"
                  />
                  <span className="font-bold">₹</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Member</span>
                <span>{member.name}</span>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center font-bold text-white text-2xl">
                  <span>Total</span>
                  <span>₹{amount}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-center text-green-500 mb-6">
                <CheckCircle className="w-24 h-24" />
              </div>
              <div className="space-y-4">
                <p className="text-gray-400 text-lg">
                  Member ID:{" "}
                  <span className="font-medium text-white">
                    {transactionDetails.memberId}
                  </span>
                </p>
                <p className="text-gray-400 text-lg">
                  Payment ID:{" "}
                  <span className="font-medium text-white">
                    {transactionDetails.paymentId}
                  </span>
                </p>
                <p className="text-gray-400 text-lg">
                  Order ID:{" "}
                  <span className="font-medium text-white">
                    {transactionDetails.orderId}
                  </span>
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {!transactionDetails ? (
            <Button
              className="w-full bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-500 hover:to-cyan-400 text-gray-900 text-lg py-6"
              onClick={handlePayNow}
              disabled={loading || amount < 1}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin -ml-1 mr-3 h-6 w-6 text-gray-900" />
                  Processing
                </span>
              ) : (
                "Pay Now"
              )}
            </Button>
          ) : (
            <Button
              className="w-full bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-500 hover:to-cyan-400 text-gray-900 text-lg py-6"
              onClick={() => router.push(`/user/profile`)}
            >
              Go to profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
