"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gauge, PlusCircle, LineChart, Activity } from "lucide-react";

type HeartRateEntry = {
  id: number;
  date: string;
  rate: number;
};

type BPEntry = {
  id: number;
  date: string;
  systolic: number;
  diastolic: number;
}

export default function VitalsPage() {
  const [hrEntries, setHrEntries] = useState<HeartRateEntry[]>([]);
  const [bpEntries, setBpEntries] = useState<BPEntry[]>([]);
  const [rate, setRate] = useState("");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");

  const addHeartRateEntry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (rate && !isNaN(Number(rate)) && Number(rate) > 0) {
      setHrEntries([
        {
          id: Date.now(),
          date: new Date().toLocaleString(),
          rate: Number(rate),
        },
        ...hrEntries,
      ]);
      setRate("");
    }
  };

  const addBPEntry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (systolic && diastolic && !isNaN(Number(systolic)) && !isNaN(Number(diastolic)) && Number(systolic) > 0 && Number(diastolic) > 0) {
      setBpEntries([
        {
          id: Date.now(),
          date: new Date().toLocaleString(),
          systolic: Number(systolic),
          diastolic: Number(diastolic),
        },
        ...bpEntries,
      ]);
      setSystolic("");
      setDiastolic("");
    }
  };


  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Gauge className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-3xl font-bold">Vitals Tracker</h1>
      </div>
      
      <Tabs defaultValue="heart-rate">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="heart-rate">Heart Rate</TabsTrigger>
            <TabsTrigger value="blood-pressure">Blood Pressure</TabsTrigger>
        </TabsList>
        <TabsContent value="heart-rate">
            <Card>
                <CardHeader>
                <CardTitle className="font-headline">Log Your Heart Rate</CardTitle>
                <CardDescription>Enter your heart rate (beats per minute) from your watch or device.</CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={addHeartRateEntry} className="flex items-end gap-4">
                    <div className="grid gap-2 flex-grow">
                    <Label htmlFor="heart-rate">Heart Rate (BPM)</Label>
                    <Input 
                        id="heart-rate" 
                        name="heart-rate" 
                        type="number" 
                        placeholder="e.g., 72" 
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        required 
                    />
                    </div>
                    <Button type="submit">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Save Entry
                    </Button>
                </form>
                </CardContent>
            </Card>
             <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="font-headline">Your Heart Rate History</CardTitle>
                </CardHeader>
                <CardContent>
                {hrEntries.length > 0 ? (
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead className="text-right">Heart Rate (BPM)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {hrEntries.map((entry) => (
                        <TableRow key={entry.id}>
                            <TableCell>{entry.date}</TableCell>
                            <TableCell className="text-right font-medium">{entry.rate}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-10">
                    <LineChart className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-sm text-muted-foreground">No entries yet. Add your first heart rate reading above.</p>
                    </div>
                )}
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="blood-pressure">
             <Card>
                <CardHeader>
                <CardTitle className="font-headline">Log Your Blood Pressure</CardTitle>
                <CardDescription>Enter your systolic and diastolic pressure values.</CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={addBPEntry} className="flex items-end gap-4">
                    <div className="grid gap-2 flex-grow">
                        <Label htmlFor="systolic">Systolic (top number)</Label>
                        <Input 
                            id="systolic" 
                            type="number" 
                            placeholder="e.g., 120"
                            value={systolic}
                            onChange={(e) => setSystolic(e.target.value)}
                            required
                        />
                    </div>
                     <div className="grid gap-2 flex-grow">
                        <Label htmlFor="diastolic">Diastolic (bottom number)</Label>
                        <Input 
                            id="diastolic" 
                            type="number" 
                            placeholder="e.g., 80"
                            value={diastolic}
                            onChange={(e) => setDiastolic(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Save Entry
                    </Button>
                </form>
                </CardContent>
            </Card>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="font-headline">Your Blood Pressure History</CardTitle>
                </CardHeader>
                <CardContent>
                {bpEntries.length > 0 ? (
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead className="text-right">Blood Pressure (SYS/DIA)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bpEntries.map((entry) => (
                        <TableRow key={entry.id}>
                            <TableCell>{entry.date}</TableCell>
                            <TableCell className="text-right font-medium">{entry.systolic} / {entry.diastolic}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-10">
                    <Activity className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-sm text-muted-foreground">No entries yet. Add your first blood pressure reading above.</p>
                    </div>
                )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
