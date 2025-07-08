'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Speaker, Loader2 } from 'lucide-react';
import { generateSpeech } from '@/ai/flows/text-to-speech';
import { useToast } from '@/hooks/use-toast';

export function AudioPlayer({ textToRead }: { textToRead: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateSpeech = async () => {
    setIsLoading(true);
    setAudioSrc(null);
    try {
      const result = await generateSpeech({ text: textToRead });
      if (result.media) {
        setAudioSrc(result.media);
      } else {
        throw new Error('Audio generation failed.');
      }
    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate audio. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (audioSrc) {
    return (
      <div className="w-full">
        <audio controls autoPlay src={audioSrc} className="w-full">
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }

  return (
    <Button onClick={handleGenerateSpeech} disabled={isLoading} variant="outline" size="sm">
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Speaker className="mr-2 h-4 w-4" />
      )}
      Listen to Article
    </Button>
  );
}
