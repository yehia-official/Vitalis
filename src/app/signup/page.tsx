"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Logo } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";

const conditions = [
    { id: "hypertension", label: "Hypertension (High Blood Pressure)" },
    { id: "cad", label: "Coronary Artery Disease (CAD)" },
    { id: "arrhythmia", label: "Arrhythmia" },
    { id: "heart-failure", label: "Heart Failure" },
    { id: "other", label: "Other" },
];

const symptoms = [
  { id: "chest-pain", label: "Chest pain or discomfort" },
  { id: "shortness-of-breath", label: "Shortness of breath" },
  { id: "dizziness", label: "Dizziness or lightheadedness" },
  { id: "fatigue", label: "Unusual fatigue" },
  { id: "swelling", label: "Swelling in legs, ankles, or feet" },
  { id: "palpitations", label: "Heart palpitations (fluttering or pounding)" },
];

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date of birth.",
  }),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]),
  primaryCondition: z.string().min(1, "Please select your primary condition."),
  symptoms: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one symptom.",
  }),
  medications: z.string().optional(),
});

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      dob: "",
      gender: undefined,
      primaryCondition: "",
      symptoms: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Simulate login state
    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", "true");
    }
    toast({
      title: "Account Created!",
      description: "Welcome to Vitalis. Redirecting you to your dashboard.",
    });
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 py-12">
      <div className="w-full max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="font-bold font-headline text-3xl">Vitalis</span>
          </Link>
          <p className="text-muted-foreground mt-2">
            Create your account to start your health journey.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Let's start with the basics.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                           <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
                <CardDescription>
                  Please provide some details about your condition.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="primaryCondition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Heart Condition</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {conditions.map((c) => (
                             <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                       <FormDescription>
                        Please select the primary diagnosis from your doctor.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="symptoms"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Current Symptoms</FormLabel>
                        <FormDescription>
                          Please check all symptoms you are currently experiencing.
                        </FormDescription>
                      </div>
                      {symptoms.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="symptoms"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="medications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Medications</FormLabel>
                      <FormControl>
                        <Textarea placeholder="List your current medications, including dosage if known (e.g., Aspirin 81mg, Lisinopril 10mg)." {...field} />
                      </FormControl>
                      <FormDescription>
                        This is optional but helps in providing better insights.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" size="lg">Create Account</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
