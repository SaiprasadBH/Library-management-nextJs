import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function CancellationModal({
  isOpen,
  onClose,
  onConfirm,
  eventName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  eventName: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Cancel Meeting
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>
            Are you sure you want to cancel the meeting @quot{eventName}@quot?
          </p>
          <p className="mt-2 text-sm text-gray-400">
            This action cannot be undone.
          </p>
        </div>
        <DialogFooter>
          <Button
            onClick={onClose}
            variant="outline"
            className="bg-gray-700 text-white hover:bg-gray-600"
          >
            Keep Meeting
          </Button>
          <Button
            onClick={onConfirm}
            variant="destructive"
            className="bg-red-500 hover:bg-red-600"
          >
            Cancel Meeting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
