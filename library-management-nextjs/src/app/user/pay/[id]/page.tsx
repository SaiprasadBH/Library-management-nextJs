import { auth } from "@/auth";
import PaymentPageClient from "@/components/ui/payment-management/payment-client";

export default async function PaymentPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const professorId = Number(params.id);

  if (!session || !session.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center px-4">
        <div className="text-white text-2xl font-bold">
          Please log in to access this page.
        </div>
      </div>
    );
  }

  return (
    <PaymentPageClient
      professorId={professorId}
      userName={session.user.name || ""}
      userEmail={session.user.email || ""}
    />
  );
}
