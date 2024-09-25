export interface IAppointmentBase {
  memberId: number;
  professorId: number;
  googleMeetLink: string;
  appointmentDate: string;
}

export interface IAppointment extends IAppointmentBase {
  id: number;
}
