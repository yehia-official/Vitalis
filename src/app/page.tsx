"use client"

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  HeartPulse,
  Pill,
  Stethoscope,
  Activity,
  Bot,
  ShieldCheck,
  ArrowRight,
  Star,
  FileText,
  CalendarPlus,
  Wind,
  CheckCircle,
  BookOpen
} from 'lucide-react';

const LandingHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    // This code runs only on the client
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    }
  }, []);

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
    }
    setIsLoggedIn(false);
    window.location.href = '/'; // Navigate and refresh
  };
  
  return (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-16 items-center">
      <div className="mr-auto flex">
        <Link href="/" className="flex items-center space-x-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="font-bold font-headline text-2xl">Vitalis</span>
        </Link>
      </div>
      <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
        <Link href={isLoggedIn ? "/dashboard" : "#features"} className="text-foreground/60 transition-colors hover:text-foreground/80">Features</Link>
        <Link href="#pricing" className="text-foreground/60 transition-colors hover:text-foreground/80">Pricing</Link>
        <Link href="#testimonials" className="text-foreground/60 transition-colors hover:text-foreground/80">Testimonials</Link>
        <Link href="#faq" className="text-foreground/60 transition-colors hover:text-foreground/80">FAQ</Link>
      </nav>
      <div className="ml-auto flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link href="/signup">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  </header>
  );
};


const LandingFooter = () => (
    <footer className="border-t bg-secondary">
        <div className="container grid items-start gap-8 py-12 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-8 text-primary" />
              <span className="font-bold font-headline text-2xl">Vitalis</span>
            </Link>
            <p className="text-muted-foreground text-sm">Your personal health companion.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm md:col-span-3 md:grid-cols-4">
            <div>
              <h4 className="font-semibold mb-2">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
                <li><Link href="#pricing" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
                <li><Link href="/signup" className="text-muted-foreground hover:text-primary">Sign Up</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="font-semibold mb-2">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Careers</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="font-semibold mb-2">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Blog</Link></li>
                <li><Link href="#faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Help Center</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="font-semibold mb-2">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t">
          <div className="container flex items-center justify-between py-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Vitalis Inc. All rights reserved.</p>
             <div className="flex items-center gap-4">
               {/* Social Icons would go here */}
            </div>
          </div>
        </div>
    </footer>
);

const features = [
  {
    icon: HeartPulse,
    title: "Vitals Tracking",
    description: "Monitor heart rate, blood pressure, and other vitals with insightful charts.",
  },
  {
    icon: Pill,
    title: "Medication Reminders",
    description: "Never miss a dose with intelligent reminders and a complete medication log.",
  },
  {
    icon: Stethoscope,
    title: "Symptom Logging",
    description: "Easily track symptoms with detailed notes to share with your healthcare provider.",
  },
  {
    icon: CalendarPlus,
    title: "Appointment Scheduler",
    description: "Manage all your doctor's appointments and get timely reminders.",
  },
  {
    icon: BookOpen,
    title: "Health Education",
    description: "Access easy-to-understand articles to learn more about your condition.",
  },
  {
    icon: Wind,
    title: "Mindfulness Exercises",
    description: "Access guided exercises to manage stress, a key factor in heart health.",
  },
  {
    icon: Bot,
    title: "AI Health Assistant",
    description: "Get answers to your health questions and understand complex medical terms.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Data",
    description: "Your health data is private, encrypted, and always under your control.",
  },
];

const testimonials = [
    {
        name: "Sarah L.",
        title: "Busy Professional",
        quote: "Vitalis has made managing my health so much easier. I can finally keep track of everything in one place, and the AI assistant is incredibly helpful.",
        avatar: "https://placehold.co/100x100.png",
        aiHint: "woman portrait"
    },
    {
        name: "Dr. Mark R.",
        title: "Family Physician",
        quote: "I recommend Vitalis to my patients. It empowers them to take an active role in their health and provides valuable data for our appointments.",
         avatar: "https://placehold.co/100x100.png",
        aiHint: "doctor portrait male"
    },
    {
        name: "David Chen",
        title: "Fitness Enthusiast",
        quote: "The activity tracking and vitals monitoring are top-notch. It's the perfect companion for anyone serious about their health and fitness goals.",
        avatar: "https://placehold.co/100x100.png",
        aiHint: "man portrait"
    }
]

const faqs = [
    {
        question: "Is my health data secure with Vitalis?",
        answer: "Yes, absolutely. We use industry-standard encryption and security practices to ensure your data is always safe, private, and under your control. You decide who you share it with."
    },
    {
        question: "Can I share my data with my doctor?",
        answer: "Yes. Vitalis makes it easy to generate reports and share your health data with your doctor or family members, helping everyone stay informed and on the same page."
    },
    {
        question: "Does Vitalis integrate with my fitness tracker?",
        answer: "We support integrations with many popular fitness trackers and health devices. You can connect your device in the settings to automatically sync your activity and vitals."
    },
    {
        question: "Is there a free version?",
        answer: "Yes, Vitalis offers a free plan with all the essential features to get you started. You can upgrade to a Pro plan for advanced features, unlimited history, and more integrations."
    }
]


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
          <div className="text-center lg:text-left space-y-6">
            <main className="text-5xl md:text-6xl font-bold font-headline">
              <h1>
                Take Control of
                <div>
                  <span className="text-primary">
                    Your Health
                  </span>
                </div>
              </h1>
            </main>

            <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
              Vitalis is your personal health companion, helping you track medications, monitor vitals, and achieve your wellness goals with AI-powered insights.
            </p>

            <div className="space-x-4">
              <Button size="lg" asChild>
                 <Link href={isLoggedIn ? "/dashboard" : "/signup"}>{isLoggedIn ? "Go to Dashboard" : "Get Started Free"}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                 <Link href={isLoggedIn ? "/dashboard" : "#features"}>Learn More</Link>
              </Button>
            </div>
          </div>

          <div className="relative group hidden lg:block">
             <div className="absolute -inset-2 bg-primary/10 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
            <Image
              src="https://placehold.co/1200x1000.png"
              data-ai-hint="health app phone"
              className="relative w-full rounded-lg"
              alt="App screenshot"
              width={1200}
              height={1000}
            />
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 md:py-24 bg-secondary">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-primary font-semibold">FEATURES</p>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Everything You Need to Take Control</h2>
              <p className="mt-4 text-muted-foreground">
                Vitalis is packed with powerful, easy-to-use features to help you manage your health effectively.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="p-2 bg-card/50">
                  <CardHeader>
                     <div className="h-12 w-12 text-primary bg-primary/10 flex items-center justify-center rounded-lg mb-4">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-24">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-primary font-semibold">PRICING</p>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Simple, Transparent Pricing</h2>
              <p className="mt-4 text-muted-foreground">
                Start for free, and upgrade when you need more power.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline">Free</CardTitle>
                  <CardDescription>For individuals starting their health journey.</CardDescription>
                  <p className="text-4xl font-bold font-headline pt-4">$0<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  <p className="font-semibold">Includes:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="text-primary h-5 w-5"/> Core Feature Access</li>
                    <li className="flex items-center gap-2"><CheckCircle className="text-primary h-5 w-5"/> Basic Health Reports</li>
                    <li className="flex items-center gap-2"><CheckCircle className="text-primary h-5 w-5"/> Community Support</li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button className="w-full" asChild>
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              </Card>
              <Card className="flex flex-col border-primary shadow-lg">
                 <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="font-headline">Pro</CardTitle>
                    <div className="px-3 py-1 text-sm text-primary-foreground bg-primary rounded-full">Most Popular</div>
                  </div>
                  <CardDescription>For users who want advanced insights.</CardDescription>
                  <p className="text-4xl font-bold font-headline pt-4">$9<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  <p className="font-semibold">Everything in Free, plus:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="text-primary h-5 w-5"/> Unlimited History</li>
                    <li className="flex items-center gap-2"><CheckCircle className="text-primary h-5 w-5"/> Advanced AI Insights</li>
                    <li className="flex items-center gap-2"><CheckCircle className="text-primary h-5 w-5"/> Share with Doctors</li>
                    <li className="flex items-center gap-2"><CheckCircle className="text-primary h-5 w-5"/> Priority Support</li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                   <Button className="w-full" asChild>
                    <Link href="/signup">Upgrade Now</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-24 bg-secondary">
            <div className="container">
                <div className="text-center">
                    <p className="text-primary font-semibold">TESTIMONIALS</p>
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">What Our Users Are Saying</h2>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.name}>
                           <CardContent className="pt-6">
                                <div className="flex items-center space-x-4">
                                     <Avatar>
                                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                    </div>
                                </div>
                                <blockquote className="mt-4 border-l-2 pl-6 italic text-muted-foreground">
                                    "{testimonial.quote}"
                                </blockquote>
                           </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="py-20 md:py-24">
             <div className="container max-w-3xl mx-auto">
                <div className="text-center">
                    <p className="text-primary font-semibold">FAQ</p>
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Frequently Asked Questions</h2>
                </div>
                <Accordion type="single" collapsible className="w-full mt-12">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="font-headline text-lg text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 text-center bg-secondary">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Start Your Journey to Better Health Today</h2>
                <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
                   Join thousands of users who are taking proactive steps towards managing their wellness with Vitalis.
                </p>
                <div className="mt-8">
                    <Button size="lg" asChild>
                        <Link href={isLoggedIn ? "/dashboard" : "/signup"}>
                          <span>
                            {isLoggedIn ? "Go to Dashboard" : "Sign Up for Free"}
                            <ArrowRight className="ml-2" />
                          </span>
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
