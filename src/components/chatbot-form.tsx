'use client';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { explainMedicalTerm } from '@/ai/flows/medical-terminology-chatbot';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Bot, User, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  term: z.string().min(2, {
    message: 'Term must be at least 2 characters.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

type Message = {
  id: number;
  type: 'user' | 'ai';
  text: string;
  isLoading?: boolean;
};

export function ChatbotForm() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      type: 'ai',
      text: "Hello! I'm your AI Health Helper. Ask me about any medical term, and I'll explain it in simple language.",
    }
  ]);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      term: '',
    },
  });
  
  const isLoading = messages[messages.length - 1]?.isLoading === true;

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
          setTimeout(() => {
            viewport.scrollTop = viewport.scrollHeight;
          }, 100);
        }
      }
    };
    scrollToBottom();
  }, [messages]);


  async function onSubmit(values: FormValues) {
    const userMessage: Message = { id: Date.now(), type: 'user', text: values.term };
    const loadingMessage: Message = { id: Date.now() + 1, type: 'ai', text: '', isLoading: true };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    form.reset();

    try {
      const result = await explainMedicalTerm({ term: values.term });
      const aiMessage: Message = { id: Date.now() + 1, type: 'ai', text: result.explanation };
      setMessages((prev) => prev.map(m => m.id === loadingMessage.id ? aiMessage : m));

    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Could not get an explanation. Please try again.',
      });
      console.error(e);
      setMessages((prev) => prev.filter(m => m.id !== loadingMessage.id));
    }
  }

  return (
    <div className="flex flex-col h-[65vh] w-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6 pr-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-end gap-2',
                message.type === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.type === 'ai' && (
                <Avatar className="h-8 w-8 self-start">
                   <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10">
                     <Bot className="h-5 w-5 text-primary" />
                   </div>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-md rounded-lg p-3 text-sm animate-in fade-in-20',
                  message.type === 'user'
                    ? 'rounded-br-none bg-primary text-primary-foreground'
                    : 'rounded-bl-none bg-secondary'
                )}
              >
                {message.isLoading ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                )}
              </div>
               {message.type === 'user' && (
                <Avatar className="h-8 w-8">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input autoComplete="off" placeholder="e.g., Atrial Fibrillation..." {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
