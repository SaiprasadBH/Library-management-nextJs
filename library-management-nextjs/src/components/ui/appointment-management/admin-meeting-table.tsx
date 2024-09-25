"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Clock, Users, Video, UserCircle } from "lucide-react";

interface Person {
  name: string;
  email: string;
}

interface MeetingEvent {
  id: string;
  event: string;
  start_time: string;
  end_time: string;
  meetLink: string;
  organizers: Person[];
  invitees: Person[];
}

export default function AdminMeetingTable({
  events,
}: {
  events: MeetingEvent[];
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const formatDuration = (start: string, end: string) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const durationMs = endTime.getTime() - startTime.getTime();
    const durationMinutes = Math.round(durationMs / 60000);
    return `${durationMinutes} minutes`;
  };

  const formatPeople = (people: Person[]) => {
    return people
      .map((person) => `${person.name} (${person.email})`)
      .join(", ");
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
        Admin Meeting Overview
      </h1>
      <div className="rounded-lg overflow-hidden border border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800/50 hover:bg-gray-800/70">
              <TableHead className="text-teal-400">Event</TableHead>
              <TableHead className="text-teal-400">Date & Time</TableHead>
              <TableHead className="text-teal-400">Duration</TableHead>
              <TableHead className="text-teal-400">Meet Link</TableHead>
              <TableHead className="text-teal-400">Organizer</TableHead>
              <TableHead className="text-teal-400">Attendee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow
                key={event.id}
                className="border-b border-gray-700 hover:bg-gray-800/50"
              >
                <TableCell className="font-medium text-white">
                  {event.event}
                </TableCell>
                <TableCell className="text-gray-300">
                  <Calendar className="inline w-4 h-4 mr-2 text-teal-400" />
                  {formatDate(event.start_time)}
                </TableCell>
                <TableCell className="text-gray-300">
                  <Clock className="inline w-4 h-4 mr-2 text-cyan-400" />
                  {formatDuration(event.start_time, event.end_time)}
                </TableCell>
                <TableCell>
                  <a
                    href={event.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-300 flex items-center"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Join
                  </a>
                </TableCell>
                <TableCell className="text-gray-300">
                  <UserCircle className="inline w-4 h-4 mr-2 text-yellow-400" />
                  {formatPeople(event.organizers)}
                </TableCell>
                <TableCell className="text-gray-300">
                  <Users className="inline w-4 h-4 mr-2 text-purple-400" />
                  {formatPeople(event.invitees)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
