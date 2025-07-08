import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from 'next/link';
import { Pill, Stethoscope, Siren, Bot, ArrowRight, Gauge, Scale, CalendarPlus, FileText, Wind, BookOpen } from "lucide-react";

const featureCards = [
  {
    title: "Vitals",
    description: "Track heart rate and blood pressure.",
    icon: Gauge,
    href: "/heart-rate",
    cta: "Log Vitals"
  },
  {
    title: "Symptoms",
    description: "Log symptoms and get AI-powered analysis to share with your doctor.",
    icon: Stethoscope,
    href: "/symptoms",
    cta: "Log Symptoms"
  },
  {
    title: "Medications",
    description: "Manage your medication schedule.",
    icon: Pill,
    href: "/medications",
    cta: "Manage Meds"
  },
  {
    title: "Weight",
    description: "Monitor your weight changes.",
    icon: Scale,
    href: "/weight",
    cta: "Add Entry"
  },
  {
    title: "Appointments",
    description: "Keep track of upcoming appointments.",
    icon: CalendarPlus,
    href: "/appointments",
    cta: "View Schedule"
  },
  {
    title: "Learn",
    description: "Articles to understand your health.",
    icon: BookOpen,
    href: "/learn",
    cta: "Read Articles"
  },
  {
    title: "Reports",
    description: "Generate reports for your doctor.",
    icon: FileText,
    href: "/reports",
    cta: "Generate Report"
  },
  {
    title: "Mindfulness",
    description: "Access stress-reduction exercises.",
    icon: Wind,
    href: "/mindfulness",
    cta: "Start Session"
  },
  {
    title: "AI Helper",
    description: "Understand complex medical terms.",
    icon: Bot,
    href: "/chatbot",
    cta: "Ask AI"
  },
  {
    title: "Emergency",
    description: "Quick access to emergency contacts.",
    icon: Siren,
    href: "/emergency",
    cta: "View Contacts"
  },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Welcome back, User!</h1>
        <p className="text-muted-foreground">Your personal health companion. Here's a summary for today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featureCards.map((feature) => (
          <Link href={feature.href} key={feature.title} className="group flex">
            <Card className="flex w-full flex-col transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/80 group-hover:bg-secondary/50 group-hover:shadow-lg">
              <CardHeader className="flex flex-row items-start justify-between pb-4">
                <CardTitle className="font-headline text-lg group-hover:underline">{feature.title}</CardTitle>
                 <div className="bg-primary/10 text-primary p-2 rounded-lg">
                  <feature.icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <div className="flex items-center text-sm text-primary font-semibold">
                  <span>{feature.cta}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
