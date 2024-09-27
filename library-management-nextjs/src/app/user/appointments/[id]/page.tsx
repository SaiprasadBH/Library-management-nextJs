import { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { IProfessor } from "@/lib/definitions";
import { professors } from "@/lib/database/drizzle-orm/schema";
import { ProfessorRepository } from "@/lib/repositories/professor.repository";
import { drizzleAdapter } from "@/lib/database/drizzle-orm/drizzleMysqlAdapter";
import CalendlyElement from "@/components/ui/professor-management/calendly-element";
import { auth } from "@/auth";
import { MemberRepository } from "@/lib/repositories/member.repository";

export default async function ProfessorAppointment({
  params,
}: {
  params: { id: string };
}) {
  const professorId = Number(params.id);
  console.log("professorId", professorId);
  const professorRepo = new ProfessorRepository(drizzleAdapter);
  const professor = await professorRepo.getById(professorId);
  const memberRepo = new MemberRepository(drizzleAdapter);

  const session = await auth();
  const userEmail = session?.user.email;
  if (!userEmail) {
    return <h2>No user in current session</h2>;
  }
  const user = await memberRepo.getByEmail(userEmail);

  if (!user) {
    return <h2>No user in current session</h2>;
  }

  if (!professor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
        <div className="text-2xl font-bold">Professor not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/user/appointments"
          className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to All Professors
        </Link>
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
          Book an Appointment with {professor.name}
        </h1>
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">{professor.name}</h2>
          <p className="text-gray-400 mb-2">
            Department: {professor.department}
          </p>
          <p className="text-gray-400 mb-4">Bio: {professor.bio}</p>
        </div>
        {professor.calendlyLink && (
          <CalendlyElement
            url={professor.calendlyLink}
            user={user}
          ></CalendlyElement>
        )}
      </div>
    </div>
  );
}
