import BookAppointment from "@/components/ui/professor-management/appointment-booking";
import { fetchAllProfessors } from "@/lib/actions";
import { IProfessor } from "@/lib/definitions";

export default async function BookAppointmentPage() {
  const professors: IProfessor[] | undefined = await fetchAllProfessors();
  if (!professors) {
    return <h2>No professors found</h2>;
  }
  return <BookAppointment professors={professors}></BookAppointment>;
}
