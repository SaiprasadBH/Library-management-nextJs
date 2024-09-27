"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Users,
  Video,
  UserCircle,
  RefreshCw,
  X,
} from "lucide-react";
import CalendlyModal from "@/components/ui/appointment-management/calendly-reschedule";
import { IMember } from "@/lib/definitions";
import CancellationModal from "./calendly-cancellation";

interface Person {
  name: string;
  email: string;
  cancel_url: string;
  reschedule_url: string;
  status: string;
}

interface MeetingEvent {
  event: string;
  start_time: string;
  end_time: string;
  meetLink: string;
  organizers: Person[];
  invitees: Person[];
  status: string;
}

export default function MeetingDetailsList({
  events,
}: {
  events: MeetingEvent[];
}) {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [rescheduleEvent, setRescheduleEvent] = useState<MeetingEvent | null>(
    null
  );
  const [cancelEvent, setCancelEvent] = useState<MeetingEvent | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
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

  const handleReschedule = (event: MeetingEvent) => {
    setRescheduleEvent(event);
  };

  const handleCancel = async (event: MeetingEvent) => {
    setCancelEvent(event);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500";
      case "canceled":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
          Your Upcoming Meetings
        </h1>
        {events.length === 0 ? (
          <Card className="bg-gray-800/50 backdrop-blur-xl border border-teal-500/20">
            <CardContent className="p-6">
              <p className="text-white text-center">
                No upcoming meetings found.
              </p>
            </CardContent>
          </Card>
        ) : (
          events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800/50 backdrop-blur-xl border border-teal-500/20 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 p-6">
                  <CardTitle className="text-2xl font-bold text-white flex justify-between items-center">
                    <span>{event.event}</span>
                    <span
                      className={`text-sm px-2 py-1 rounded ${getStatusColor(
                        event.status
                      )}`}
                    >
                      {event.status}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center text-teal-400">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{formatDate(event.start_time)}</span>
                  </div>
                  <div className="flex items-center text-cyan-400">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>
                      Duration:{" "}
                      {formatDuration(event.start_time, event.end_time)}
                    </span>
                  </div>
                  <div className="flex items-center text-pink-400">
                    <Video className="w-5 h-5 mr-2" />
                    <a
                      href={event.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-pink-300"
                    >
                      Join Meeting
                    </a>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <UserCircle className="w-5 h-5 mr-2" />
                    <span>
                      {event.organizers.length} Organizer
                      {event.organizers.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center text-purple-400">
                    <Users className="w-5 h-5 mr-2" />
                    <span>
                      {event.invitees.length} Attendee
                      {event.invitees.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleReschedule(event)}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      disabled={event.status.toLowerCase() !== "active"}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reschedule
                    </Button>
                    <Button
                      onClick={() => handleCancel(event)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                      disabled={event.status.toLowerCase() !== "active"}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                  {expandedEvent === event.event ? (
                    <div className="mt-4 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                          Organizers:
                        </h3>
                        {event.organizers.map((organizer, i) => (
                          <div key={i} className="text-gray-300">
                            {organizer.name} ({organizer.email})
                          </div>
                        ))}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-purple-400 mb-2">
                          Attendees:
                        </h3>
                        {event.invitees.map((invitee, i) => (
                          <div key={i} className="text-gray-300">
                            {invitee.name} ({invitee.email})
                          </div>
                        ))}
                      </div>
                      <Button
                        onClick={() => setExpandedEvent(null)}
                        className="mt-2 bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-500 hover:to-cyan-400 text-gray-900"
                      >
                        Hide Details
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setExpandedEvent(event.event)}
                      className="mt-2 bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-500 hover:to-cyan-400 text-gray-900"
                    >
                      Show Details
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
      {rescheduleEvent && (
        <CalendlyModal
          url={rescheduleEvent.invitees[0]?.reschedule_url || ""}
          isOpen={!!rescheduleEvent}
          onClose={() => setRescheduleEvent(null)}
        />
      )}
      {cancelEvent && (
        <CalendlyModal
          url={cancelEvent.invitees[0]?.cancel_url || ""}
          isOpen={!!cancelEvent}
          onClose={() => setCancelEvent(null)}
        />
      )}
    </div>
  );
}
