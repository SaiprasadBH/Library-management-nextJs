import { getScheduledEventsWithDetails } from "@/lib/actions";
import AdminMeetingTable from "@/components/ui/appointment-management/admin-meeting-table";

export default async function AdminMeetingsPage() {
  const events = await getScheduledEventsWithDetails("organization");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <AdminMeetingTable events={events} />
    </div>
  );
}
