import { auth } from "@/auth";
import PaymentPageClient from "@/components/ui/payment-management/payment-client";
import { drizzleAdapter } from "@/lib/database/drizzle-orm/drizzleMysqlAdapter";
import { MemberRepository } from "@/lib/repositories/member.repository";
import { ProfessorRepository } from "@/lib/repositories/professor.repository";

export default async function PaymentPage({
  params,
}: {
  params: { id: string };
}) {
  const memberRepo = new MemberRepository(drizzleAdapter);
  const member = await memberRepo.getById(Number(params.id));

  if (!member) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center px-4">
        <div className="text-white text-2xl font-bold">
          Failed to fetch required details
        </div>
      </div>
    );
  }

  return <PaymentPageClient member={member} />;
}
