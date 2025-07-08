
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Scale, PlusCircle, LineChart as LineChartIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type WeightEntry = {
  id: number;
  date: string;
  weight: number;
};

const chartConfig = {
  weight: {
    label: "Weight (kg)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;


export default function WeightPage() {
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const [weight, setWeight] = useState("");

  const addWeightEntry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (weight && !isNaN(Number(weight)) && Number(weight) > 0) {
      setEntries([
        {
          id: Date.now(),
          date: new Date().toISOString(),
          weight: Number(weight),
        },
        ...entries,
      ]);
      setWeight("");
    }
  };

  const chartData = entries
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      weight: entry.weight,
    }))
    .reverse();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Scale className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-3xl font-bold">Weight Tracker</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Log Your Weight</CardTitle>
          <CardDescription>Enter your current weight. Tracking weight is important for managing heart health.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addWeightEntry} className="flex items-end gap-4">
            <div className="grid gap-2 flex-grow">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input 
                id="weight" 
                name="weight" 
                type="number" 
                placeholder="e.g., 85.5" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
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
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Weight History</CardTitle>
          <CardDescription>Visualize your progress over time and see a log of all your entries.</CardDescription>
        </CardHeader>
        <CardContent>
          {entries.length > 0 ? (
            <div className="space-y-8">
               <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <LineChart accessibilityLayer data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Line dataKey="weight" type="natural" stroke="var(--color-weight)" strokeWidth={2} dot={true} />
                </LineChart>
              </ChartContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date &amp; Time</TableHead>
                    <TableHead className="text-right">Weight (kg)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{new Date(entry.date).toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium">{entry.weight.toFixed(1)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-10">
              <LineChartIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">No entries yet. Add your first weight reading above.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

