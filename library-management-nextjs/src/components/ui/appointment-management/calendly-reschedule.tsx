"use client";
import { IMember } from "@/lib/definitions";
import { InlineWidget } from "react-calendly";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CalendlyModal({
  url,
  isOpen,
  onClose,
}: {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Update Meeting
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <InlineWidget
            url={url}
            styles={{ height: "700px", backgroundColor: "1a202c" }}
            pageSettings={{
              backgroundColor: "1a202c",
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: "14b8a6",
              textColor: "ffffff",
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
