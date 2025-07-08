
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pill, PlusCircle, Trash2, Clock, Sunrise, Sun, Moon } from "lucide-react";

type Medication = {
  id: number;
  name: string;
  dosage: string;
  time: string; // 24-hour format e.g., "08:00" or "20:00"
};

const initialMedications: Medication[] = [
  { id: 1, name: "Aspirin", dosage: "81mg", time: "08:00" },
  { id: 2, name: "Lisinopril", dosage: "10mg", time: "08:00" },
  { id: 3, name: "Metformin", dosage: "500mg", time: "20:00" },
  { id: 4, name: "Atorvastatin", dosage: "20mg", time: "21:00" },
  { id: 5, name: "Metoprolol", dosage: "25mg", time: "13:00" },
];

export default function MedicationsPage() {
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [open, setOpen] = useState(false);

  const addMedication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const dosage = formData.get("dosage") as string;
    const time = formData.get("time") as string;

    if (name && dosage && time) {
      setMedications([
        ...medications,
        { id: Date.now(), name, dosage, time },
      ]);
      setOpen(false);
      form.reset();
    }
  };

  const deleteMedication = (id: number) => {
    setMedications(medications.filter((med) => med.id !== id));
  };
  
  const formatTime = (timeString: string) => {
    const [hour, minute] = timeString.split(':');
    const date = new Date();
    date.setHours(Number(hour), Number(minute));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const groupMedications = (meds: Medication[]) => {
    const groups: { morning: Medication[], afternoon: Medication[], evening: Medication[] } = {
        morning: [],
        afternoon: [],
        evening: [],
    };

    meds.forEach(med => {
        const hour = parseInt(med.time.split(':')[0], 10);
        if (hour >= 4 && hour < 12) { // 4am to 11:59am
            groups.morning.push(med);
        } else if (hour >= 12 && hour < 17) { // 12pm to 4:59pm
            groups.afternoon.push(med);
        } else { // 5pm to 3:59am
            groups.evening.push(med);
        }
    });

    // Sort medications within each group by time
    Object.values(groups).forEach(group => {
        group.sort((a, b) => a.time.localeCompare(b.time));
    });

    return groups;
  };

  const groupedMeds = groupMedications(medications);

  const medicationGroups = [
    { title: "Morning", icon: Sunrise, meds: groupedMeds.morning },
    { title: "Afternoon", icon: Sun, meds: groupedMeds.afternoon },
    { title: "Evening", icon: Moon, meds: groupedMeds.evening },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Pill className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-3xl font-bold">Medication Tracker</h1>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Medication
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-headline">Add New Medication</DialogTitle>
              <DialogDescription>
                Enter the details of your new medication below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={addMedication} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Medication Name</Label>
                <Input id="name" name="name" placeholder="e.g., Aspirin" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input id="dosage" name="dosage" placeholder="e.g., 100mg" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" name="time" type="time" required />
              </div>
              <Button type="submit">Save Medication</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {medications.length > 0 ? (
        <div className="space-y-8">
          {medicationGroups.map((group) => {
            const Icon = group.icon;
            if (group.meds.length === 0) return null;
            
            return (
              <Card key={group.title}>
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-3 text-xl">
                    <Icon className="h-6 w-6 text-primary" />
                    {group.title} Medications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {group.meds.map((med) => (
                      <div key={med.id} className="flex items-center justify-between rounded-lg border bg-secondary/30 p-4">
                        <div className="space-y-1">
                          <p className="font-semibold">{med.name}</p>
                          <p className="text-sm text-muted-foreground">{med.dosage}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{formatTime(med.time)}</span>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => deleteMedication(med.id)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center py-20">
          <CardContent className="text-center">
            <Pill className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium font-headline">No Medications Added</h3>
            <p className="mt-1 text-sm text-muted-foreground">Click "Add Medication" to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
