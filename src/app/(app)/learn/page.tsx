"use client";

import {
  BookOpen,
  Activity,
  CookingPot,
  Bike,
  Wind,
  FlaskConical,
  Pill,
} from "lucide-react";
import Image from 'next/image';
import { AudioPlayer } from "@/components/audio-player";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const educationalContent = [
    {
        icon: Activity,
        title: "Understanding Blood Pressure",
        description: "Learn what the numbers mean and how to manage them effectively.",
        fullContent: "High blood pressure, or hypertension, is a common condition where the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems, such as heart disease. Blood pressure is determined both by the amount of blood your heart pumps and the amount of resistance to blood flow in your arteries. The more blood your heart pumps and the narrower your arteries, the higher your blood pressure.",
        image: "https://placehold.co/600x400.png",
        aiHint: "blood pressure monitor"
    },
    {
        icon: CookingPot,
        title: "Healthy Eating for Your Heart",
        description: "Discover the best foods for a vibrant, heart-healthy diet.",
        fullContent: "A heart-healthy diet is rich in fruits, vegetables, whole grains, lean protein, and healthy fats. It's important to limit saturated and trans fats, sodium, and added sugars. Eating this way helps control your weight, blood pressure, and cholesterol levels. The DASH diet and Mediterranean diet are excellent examples of heart-healthy eating plans.",
        image: "https://placehold.co/600x400.png",
        aiHint: "healthy food salad"
    },
    {
        icon: Bike,
        title: "The Importance of Exercise",
        description: "Find out how regular physical activity strengthens your heart.",
        fullContent: "Regular physical activity is one of the most important things you can do for your heart health. It can help lower your blood pressure, reduce 'bad' cholesterol, and keep your weight under control. Aim for at least 150 minutes of moderate-intensity aerobic exercise, like brisk walking or cycling, each week, plus muscle-strengthening activities on 2 or more days a week.",
        image: "https://placehold.co/600x400.png",
        aiHint: "person exercising"
    },
    {
        icon: Wind,
        title: "Managing Stress Effectively",
        description: "Practical techniques to reduce stress and protect your heart.",
        fullContent: "Chronic stress can contribute to high blood pressure and other heart problems. Finding healthy ways to manage stress is crucial. Techniques like meditation, deep breathing, yoga, and spending time in nature can be very effective. It's also important to get enough sleep and connect with friends and family for support.",
        image: "https://placehold.co/600x400.png",
        aiHint: "person meditating"
    },
     {
        icon: FlaskConical,
        title: "Decoding Cholesterol",
        description: "Understand the difference between 'good' and 'bad' cholesterol.",
        fullContent: "Cholesterol is a waxy substance found in your blood. Your body needs it to build healthy cells, but high levels can increase your risk of heart disease. LDL is the 'bad' cholesterol that contributes to plaque buildup in arteries, while HDL is the 'good' cholesterol that helps carry away excess LDL. A healthy diet and exercise can improve your cholesterol levels.",
        image: "https://placehold.co/600x400.png",
        aiHint: "medical test"
    },
     {
        icon: Pill,
        title: "Medication Adherence",
        description: "Why it's crucial to take your medications exactly as prescribed.",
        fullContent: "Taking your heart medications exactly as your doctor prescribed is vital for managing your condition and preventing serious events like a heart attack or stroke. If you have trouble remembering to take them or experience side effects, talk to your doctor or pharmacist. Don't stop taking a medication without consulting your healthcare provider first.",
        image: "https://placehold.co/600x400.png",
        aiHint: "pills medication"
    }
];

export default function LearnPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in-50">
      <div className="flex items-center gap-4">
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-3xl font-bold">Learn About Your Health</h1>
      </div>
      <p className="text-muted-foreground">
        Explore these topics to better understand and manage your heart condition.
      </p>

      <div className="w-full space-y-8">
        {educationalContent.map((item, index) => {
          const Icon = item.icon;
          return (
             <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                <CardHeader className="flex-row items-start gap-4 space-y-0 p-6">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg mt-1">
                        <Icon className="h-6 w-6" />
                    </div>
                    <div>
                        <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                        <CardDescription className="mt-1">{item.description}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 p-6 pt-0">
                    <div className="relative h-56 w-full overflow-hidden rounded-lg">
                        <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" data-ai-hint={item.aiHint} />
                    </div>
                    <AudioPlayer textToRead={item.fullContent} />
                    <p className="text-base text-muted-foreground leading-relaxed">{item.fullContent}</p>
                </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
