import { auth } from "@/auth";
import PaymentPageClient from "@/components/ui/payment-management/payment-client";
import { drizzleAdapter } from "@/lib/database/drizzle-orm/drizzleMysqlAdapter";
import { ProfessorRepository } from "@/lib/repositories/professor.repository";

export default async function PaymentPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const professorRepo = new ProfessorRepository(drizzleAdapter);
  const professor = await professorRepo.getById(Number(params.id));

  if (!session || !session.user || !professor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center px-4">
        <div className="text-white text-2xl font-bold">
          Failed to fetch required details
        </div>
      </div>
    );
  }

  return (
    <PaymentPageClient
      professor={professor}
      userName={session.user.name || ""}
      userEmail={session.user.email || ""}
    />
  );
}
