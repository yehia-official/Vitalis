"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Siren, PlusCircle, Phone, User, Trash2 } from "lucide-react";

type Contact = {
  id: number;
  name: string;
  relationship: string;
  phone: string;
};

const initialContacts: Contact[] = [
    { id: 1, name: "Dr. Aisha Ahmed", relationship: "Cardiologist", phone: "123-456-7890" },
    { id: 2, name: "Fatima Khan", relationship: "Spouse", phone: "098-765-4321" },
];

export default function EmergencyPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [open, setOpen] = useState(false);

  const addContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const relationship = formData.get("relationship") as string;
    const phone = formData.get("phone") as string;

    if (name && phone && relationship) {
      setContacts([...contacts, { id: Date.now(), name, relationship, phone }]);
      setOpen(false);
      form.reset();
    }
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  }


  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Siren className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-3xl font-bold">Emergency Contacts</h1>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-headline">Add New Contact</DialogTitle>
              <DialogDescription>
                Enter the name, relationship, and phone number for an emergency contact.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={addContact} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Contact Name</Label>
                <Input id="name" name="name" placeholder="e.g., Dr. Ali" required />
              </div>
               <div className="grid gap-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Input id="relationship" name="relationship" placeholder="e.g., Cardiologist, Spouse" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" placeholder="e.g., 123-456-7890" required />
              </div>
              <Button type="submit">Save Contact</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <p className="text-muted-foreground">In an emergency, click the call button to dial your contact immediately.</p>

      <div className="grid gap-6 md:grid-cols-2">
        {contacts.map((contact) => (
          <Card key={contact.id}>
            <CardHeader>
               <CardTitle className="font-headline flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <User className="h-5 w-5 text-muted-foreground" />
                    <span>{contact.name}</span>
                  </div>
                   <Button variant="ghost" size="icon" onClick={() => deleteContact(contact.id)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </CardTitle>
                <CardDescription>{contact.relationship}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" size="lg">
                <a href={`tel:${contact.phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call {contact.phone}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
         {contacts.length === 0 && (
            <Card className="flex flex-col items-center justify-center py-20 md:col-span-2">
                <CardContent className="text-center">
                    <Siren className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium font-headline">No Contacts Added</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Click "Add Contact" to save an emergency number.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
