"use client";
import { IMember } from "@/lib/definitions";
import { InlineWidget } from "react-calendly";

export default function CalendlyElement({
  url,
  user,
}: {
  url: string;
  user: IMember;
}) {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-4 rounded-lg shadow-lg overflow-hidden">
      <InlineWidget
        url={url}
        styles={{ height: "700px" }}
        prefill={{ name: user.name, email: user.email }}
        pageSettings={{
          backgroundColor: "1a202c",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "14b8a6",
          textColor: "ffffff",
        }}
      />
    </div>
  );
}
