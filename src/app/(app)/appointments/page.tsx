"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarPlus, PlusCircle, Video, User, Trash2, Building } from "lucide-react";

type Appointment = {
  id: number;
  doctor: string;
  date: string;
  time: string;
  type: "in-person" | "virtual";
};

const initialAppointments: Appointment[] = [
    { id: 1, doctor: "Dr. Aisha Ahmed", date: "2024-08-15", time: "10:30 AM", type: 'in-person' },
    { id: 2, doctor: "Cardiology Check-up", date: "2024-09-02", time: "02:00 PM", type: 'virtual' },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [open, setOpen] = useState(false);

  const addAppointment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const doctor = formData.get("doctor") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const type = formData.get("type") as "in-person" | "virtual";

    if (doctor && date && time && type) {
      setAppointments([...appointments, { id: Date.now(), doctor, date, time, type }]);
      setOpen(false);
      form.reset();
    }
  };

  const deleteAppointment = (id: number) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  }


  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <CalendarPlus className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-3xl font-bold">Appointments</h1>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-headline">Add New Appointment</DialogTitle>
              <DialogDescription>
                Enter the details for your upcoming appointment.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={addAppointment} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="doctor">Doctor/Clinic Name</Label>
                <Input id="doctor" name="doctor" placeholder="e.g., Dr. Ali's Clinic" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" type="date" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" name="time" type="time" required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Appointment Type</Label>
                <RadioGroup name="type" defaultValue="in-person" className="flex gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in-person" id="in-person" />
                        <Label htmlFor="in-person" className="font-normal">In-Person</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="virtual" id="virtual" />
                        <Label htmlFor="virtual" className="font-normal">Virtual</Label>
                    </div>
                </RadioGroup>
              </div>
              <Button type="submit">Save Appointment</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <p className="text-muted-foreground">Keep track of your upcoming medical appointments.</p>

      <div className="grid gap-6 md:grid-cols-2">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardHeader>
               <CardTitle className="font-headline flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <User className="h-5 w-5 text-muted-foreground" />
                    <span>{appointment.doctor}</span>
                  </div>
                   <Button variant="ghost" size="icon" onClick={() => deleteAppointment(appointment.id)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </CardTitle>
                <CardDescription>
                    {new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {appointment.time}
                </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border bg-secondary/30 p-4">
                <div className="flex items-center gap-3 text-sm font-medium">
                  {appointment.type === 'virtual' 
                    ? <Video className="h-5 w-5 text-primary" /> 
                    : <Building className="h-5 w-5 text-primary" />}
                  <span>{appointment.type === 'virtual' ? 'Virtual Appointment' : 'In-Person Visit'}</span>
                </div>
                <Button size="sm" variant={appointment.type === 'virtual' ? 'default' : 'outline'}>
                  {appointment.type === 'virtual' ? 'Join Call' : 'View Details'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
         {appointments.length === 0 && (
            <Card className="flex flex-col items-center justify-center py-20 md:col-span-2">
                <CardContent className="text-center">
                    <CalendarPlus className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium font-headline">No Appointments</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Click "Add Appointment" to schedule your next visit.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
