
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Stethoscope, PlusCircle, Bot, Info, Loader2, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { analyzeSymptomLog, type SymptomAnalysisOutput } from "@/ai/flows/symptom-analyzer-flow";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


type SymptomLog = {
  id: number;
  date: string;
  symptoms: string[];
  notes: string;
  analysis?: SymptomAnalysisOutput;
  isAnalyzing?: boolean;
};

const commonSymptoms = [
  { id: "shortness-of-breath", label: "Shortness of breath" },
  { id: "chest-pain", label: "Chest pain" },
  { id: "dizziness", label: "Dizziness" },
  { id: "fatigue", label: "Fatigue" },
  { id: "swelling", label: "Swelling in legs" },
];

export default function SymptomsPage() {
  const [logs, setLogs] = useState<SymptomLog[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addSymptomLog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const notes = formData.get("notes") as string;
    
    const selectedSymptoms = commonSymptoms
      .filter(symptom => formData.get(symptom.id))
      .map(symptom => symptom.label);

    if (selectedSymptoms.length === 0 && !notes) {
      toast({
        variant: "destructive",
        title: "Empty Log",
        description: "Please select at least one symptom or add a note.",
      });
      setIsLoading(false);
      return;
    }

    const newLogId = Date.now();
    const newLogPlaceholder: SymptomLog = {
      id: newLogId,
      date: new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
      symptoms: selectedSymptoms,
      notes,
      isAnalyzing: true,
    };
    
    setLogs([newLogPlaceholder, ...logs]);
    setOpen(false);
    form.reset();

    try {
      const analysisResult = await analyzeSymptomLog({ symptoms: selectedSymptoms, notes });
      
      const finalLog: SymptomLog = {
        ...newLogPlaceholder,
        analysis: analysisResult,
        isAnalyzing: false,
      };

      setLogs(currentLogs => currentLogs.map(log => log.id === newLogId ? finalLog : log));

    } catch (error) {
       console.error("Symptom analysis failed:", error);
       toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "The AI analysis could not be completed. The log has been saved without it.",
       });
       setLogs(currentLogs => currentLogs.map(log => log.id === newLogId ? { ...newLogPlaceholder, isAnalyzing: false } : log));
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Stethoscope className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-3xl font-bold">Symptom Logger</h1>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Log Symptoms
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-headline">Log Your Symptoms</DialogTitle>
              <DialogDescription>
                Select any symptoms you're feeling and add notes. Our AI will analyze it for you.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={addSymptomLog} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Common Symptoms</Label>
                <div className="space-y-2 rounded-md border p-4">
                  {commonSymptoms.map(symptom => (
                    <div key={symptom.id} className="flex items-center space-x-2">
                      <Checkbox id={symptom.id} name={symptom.id} />
                      <Label htmlFor={symptom.id} className="font-normal">{symptom.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" name="notes" placeholder="e.g., 'The pain was sharp and lasted 5 minutes after a big meal...' or 'Felt dizzy when I stood up too fast.'" />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save & Analyze
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        <h2 className="font-headline text-2xl font-bold">Your Symptom History</h2>
        {logs.length > 0 ? (
          <div className="grid gap-6">
            {logs.map((log) => (
              <Card key={log.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center justify-between text-xl">
                    <span>Symptom Log</span>
                  </CardTitle>
                   <CardDescription>Logged on {log.date}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4 rounded-lg border bg-secondary/30 p-4">
                        <h3 className="font-semibold flex items-center gap-2"><User className="h-5 w-5 text-primary"/> Your Entry</h3>
                        {log.symptoms.length > 0 && (
                            <div>
                            <p className="font-medium mb-2 text-sm">Selected Symptoms:</p>
                            <div className="flex flex-wrap gap-2">
                                {log.symptoms.map((s, i) => <div key={i} className="text-sm bg-secondary text-secondary-foreground rounded-full px-3 py-1">{s}</div>)}
                            </div>
                            </div>
                        )}
                        {log.notes && (
                            <div>
                            <p className="font-medium mb-2 text-sm">Your Notes:</p>
                            <p className="text-muted-foreground text-sm whitespace-pre-wrap italic">"{log.notes}"</p>
                            </div>
                        )}
                    </div>
                 
                    <div className="space-y-4">
                        {log.isAnalyzing && (
                            <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <p className="font-semibold">AI is analyzing your entry</p>
                                <p className="text-sm text-muted-foreground">This may take a moment.</p>
                            </div>
                        )}
                        {log.analysis && (
                        <div className="space-y-4">
                            <h3 className="font-semibold flex items-center gap-2"><Bot className="h-5 w-5 text-primary"/> AI-Powered Analysis</h3>
                            
                            <Alert variant="default" className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800">
                                <Info className="h-4 w-4 !text-blue-600" />
                                <AlertTitle className="text-blue-800 dark:text-blue-300">For Informational Purposes Only</AlertTitle>
                                <AlertDescription className="text-blue-700 dark:text-blue-400">
                                    This is not a medical diagnosis. Always consult with your healthcare provider.
                                </AlertDescription>
                            </Alert>

                            <div className="grid md:grid-cols-2 gap-6 text-sm">
                                <div className="space-y-3">
                                    <p className="font-medium">Summary</p>
                                    <p className="text-muted-foreground">{log.analysis.summary}</p>
                                </div>

                                {log.analysis.potentialTriggers.length > 0 && (
                                <div className="space-y-3">
                                        <p className="font-medium">Potential Triggers Mentioned</p>
                                        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                                            {log.analysis.potentialTriggers.map((trigger, i) => <li key={i}>{trigger}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                             <div>
                                <p className="font-medium mb-2">Suggested Questions for Your Doctor</p>
                                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                                    {log.analysis.questionsForDoctor.map((q, i) => <li key={i}>{q}</li>)}
                                </ul>
                            </div>
                        </div>
                        )}
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
            <Card className="flex flex-col items-center justify-center py-20">
                <CardContent className="text-center">
                    <Stethoscope className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium font-headline">No Symptoms Logged</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Click "Log Symptoms" to record how you're feeling.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
