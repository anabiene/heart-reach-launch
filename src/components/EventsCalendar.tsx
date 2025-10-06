import { useState } from "react";
import { MapPin, Clock, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const events = [
  {
    id: 1,
    title: "Community Food Drive",
    date: new Date(2025, 2, 15), // March 15, 2025
    time: "10:00 AM - 4:00 PM",
    location: "City Central Square",
    type: "Fundraising",
  },
  {
    id: 2,
    title: "Youth Education Workshop",
    date: new Date(2025, 2, 22), // March 22, 2025
    time: "2:00 PM - 5:00 PM",
    location: "Community Center",
    type: "Education",
  },
  {
    id: 3,
    title: "Health & Wellness Fair",
    date: new Date(2025, 3, 5), // April 5, 2025
    time: "9:00 AM - 3:00 PM",
    location: "Municipal Park",
    type: "Health",
  },
  {
    id: 4,
    title: "Annual Charity Gala",
    date: new Date(2025, 3, 18), // April 18, 2025
    time: "6:00 PM - 10:00 PM",
    location: "Grand Hotel Ballroom",
    type: "Fundraising",
  },
  {
    id: 5,
    title: "Skills Training Program",
    date: new Date(2025, 4, 3), // May 3, 2025
    time: "1:00 PM - 6:00 PM",
    location: "Training Center",
    type: "Education",
  },
  {
    id: 6,
    title: "Environmental Cleanup Day",
    date: new Date(2025, 4, 20), // May 20, 2025
    time: "8:00 AM - 2:00 PM",
    location: "Riverside Park",
    type: "Community",
  },
];

const EventsCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  const eventDates = events.map(e => e.date);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    const event = events.find(
      e => format(e.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
    
    if (event) {
      setSelectedEvent(event);
      setSelectedDate(date);
    }
  };

  const modifiers = {
    event: eventDates,
  };

  const modifiersClassNames = {
    event: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full font-semibold",
  };

  return (
    <section id="events" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us in making a difference. Click on the dates below to see event details.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            className="mx-auto"
          />
        </div>

        <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <div className="flex items-start justify-between mb-4">
                <DialogTitle className="text-2xl">{selectedEvent?.title}</DialogTitle>
                <Badge variant="secondary">{selectedEvent?.type}</Badge>
              </div>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarIcon className="w-5 h-5" />
                <span>{selectedEvent && format(selectedEvent.date, "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <span>{selectedEvent?.time}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>{selectedEvent?.location}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default EventsCalendar;
