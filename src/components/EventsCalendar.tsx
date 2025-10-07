import { Calendar, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    id: 1,
    title: "Community Food Drive",
    date: "March 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "City Central Square",
    type: "Fundraising",
  },
  {
    id: 2,
    title: "Youth Education Workshop",
    date: "March 22, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Community Center",
    type: "Education",
  },
  {
    id: 3,
    title: "Health & Wellness Fair",
    date: "April 5, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "Municipal Park",
    type: "Health",
  },
  {
    id: 4,
    title: "Annual Charity Gala",
    date: "April 18, 2025",
    time: "6:00 PM - 10:00 PM",
    location: "Grand Hotel Ballroom",
    type: "Fundraising",
  },
  {
    id: 5,
    title: "Skills Training Program",
    date: "May 3, 2025",
    time: "1:00 PM - 6:00 PM",
    location: "Training Center",
    type: "Education",
  },
  {
    id: 6,
    title: "Environmental Cleanup Day",
    date: "May 20, 2025",
    time: "8:00 AM - 2:00 PM",
    location: "Riverside Park",
    type: "Community",
  },
];

const EventsCalendar = () => {
  return (
    <section id="events" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us in making a difference. Check out our upcoming events and find ways to get involved.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <Badge variant="secondary">{event.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsCalendar;
