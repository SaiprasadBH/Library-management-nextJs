import BookAppointment from "@/components/ui/professor-management/appointment-booking";
import { fetchAllProfessors } from "@/lib/actions";
import { IProfessor } from "@/lib/definitions";

export default async function BookAppointmentPage() {
  const professors: IProfessor[] | undefined = await fetchAllProfessors();

  // Filter out professors with null or undefined calendlyLink
  const filteredProfessors =
    professors?.filter((professor) => professor.calendlyLink !== null) || [];

  if (filteredProfessors.length === 0) {
    return <h2>No professors found</h2>;
  }

  return <BookAppointment professors={filteredProfessors}></BookAppointment>;
}
