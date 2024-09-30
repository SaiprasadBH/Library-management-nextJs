"use client";

import { motion } from "framer-motion";
import { User, Calendar } from "lucide-react";
import Link from "next/link";
import { IProfessor } from "@/lib/definitions";

export default function BookAppointment({
  professors,
}: {
  professors: IProfessor[];
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
          Book an Appointment with a Professor
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {professors.map((professor) => (
            <motion.div
              key={professor.id}
              className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col justify-between"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div>
                <User className="w-12 h-12 mb-4 text-teal-400" />
                <h2 className="text-xl font-semibold mb-2">{professor.name}</h2>
                <p className="text-gray-400 mb-4">{professor.department}</p>
                <p className="text-gray-400 mb-4">{professor.bio}</p>
              </div>
              <Link
                href={`/user/pay/${professor.id}`}
                className="w-full bg-gradient-to-r from-teal-400 to-cyan-300 text-gray-900 font-bold py-2 px-4 rounded-md hover:from-teal-500 hover:to-cyan-400 transition-all duration-300 flex items-center justify-center mt-auto"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
