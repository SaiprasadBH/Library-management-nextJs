"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Video, UserCircle } from "lucide-react";

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

export default function MeetingDetailsList({
  events,
}: {
  events: MeetingEvent[];
}) {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

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
                  <CardTitle className="text-2xl font-bold text-white">
                    {event.event}
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
    </div>
  );
}
