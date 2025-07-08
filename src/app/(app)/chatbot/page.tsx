import { Bot } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChatbotForm } from '@/components/chatbot-form';

export default function ChatbotPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in-50">
      <div className="flex items-center gap-4">
        <Bot className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-3xl font-bold">AI Health Helper</h1>
      </div>
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle className="font-headline">Medical Term Explainer</CardTitle>
          <CardDescription>
            Confused by a medical term? Our AI assistant will explain it in simple, easy-to-understand language.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ChatbotForm />
        </CardContent>
      </Card>
    </div>
  );
}
