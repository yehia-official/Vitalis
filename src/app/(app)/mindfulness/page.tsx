import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind } from "lucide-react";
import Image from 'next/image';
import { AudioPlayer } from "@/components/audio-player";

const mindfulnessContent = [
    {
        title: "5-Minute Breathing Meditation",
        content: "Find a quiet space and sit comfortably. Close your eyes and focus on your breath. Inhale slowly through your nose for 4 seconds, hold for 4 seconds, and exhale through your mouth for 6 seconds. Repeat for 5 minutes to calm your nervous system.",
        image: "https://placehold.co/600x400.png",
        aiHint: "calm meditation"
    },
    {
        title: "Body Scan for Stress Relief",
        content: "Lie down comfortably. Starting from your toes, bring gentle awareness to each part of your body, noticing any sensations without judgment. Slowly scan up to your head. This practice helps release physical tension often associated with stress.",
        image: "https://placehold.co/600x400.png",
        aiHint: "person relaxing"
    },
    {
        title: "Mindful Walking",
        content: "Find a short path where you can walk back and forth. Walk slowly, paying full attention to the sensation of your feet on the ground. Notice the movement in your legs and body. If your mind wanders, gently bring it back to the sensation of walking.",
        image: "https://placehold.co/600x400.png",
        aiHint: "walking nature"
    },
    {
        title: "Guided Visualization for Calm",
        content: "Close your eyes and imagine a peaceful place, like a quiet beach or a forest. Use all your senses: what do you see, hear, smell? Spending a few minutes in this mental sanctuary can significantly lower blood pressure and heart rate.",
        image: "https://placehold.co/600x400.png",
        aiHint: "peaceful beach"
    }
]

export default function MindfulnessPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in-50">
      <div className="flex items-center gap-4">
        <Wind className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-3xl font-bold">Mindfulness & Stress Reduction</h1>
      </div>
      <p className="text-muted-foreground">
        Simple exercises to help you manage stress and improve your heart health.
      </p>

      <div className="w-full space-y-8">
        {mindfulnessContent.map((item, index) => (
          <Card key={index} className="group overflow-hidden transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6 pt-0">
               <div className="relative h-56 w-full overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={item.aiHint}
                  className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <AudioPlayer textToRead={item.content} />
              <p className="text-base text-muted-foreground leading-relaxed">{item.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
