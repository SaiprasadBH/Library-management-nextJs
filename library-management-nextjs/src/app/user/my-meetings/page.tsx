import { getScheduledEventsWithDetails } from "@/lib/actions";
import MeetingDetailsList from "@/components/ui/appointment-management/meeting-details-list";
import { auth } from "@/auth";

interface Person {
  name: string;
  email: string;
}

interface MeetingEvent {
  event: string;
  start_time: string;
  end_time: string;
  meetLink: string;
  organizers: Person[];
  invitees: Person[];
}

export default async function MeetingDetailsPage() {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>Please log in to view your meeting details.</p>
        </div>
      </div>
    );
  }

  try {
    const allEvents: MeetingEvent[] = await getScheduledEventsWithDetails();
    // const userEvents = allEvents.filter(
    //   (event) =>
    //     event.invitees.some((invitee: Person) => invitee.email === userEmail) ||
    //     event.organizers.some(
    //       (organizer: Person) => organizer.email === userEmail
    //     )
    // );

    return <MeetingDetailsList events={allEvents} />;
  } catch (error) {
    console.error("Error fetching meeting details:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>
            An error occurred while fetching your meeting details. Please try
            again later.
          </p>
        </div>
      </div>
    );
  }
}
