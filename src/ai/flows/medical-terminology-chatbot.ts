// src/ai/flows/medical-terminology-chatbot.ts
'use server';

/**
 * @fileOverview A medical terminology chatbot that explains medical terms in simple language.
 *
 * - explainMedicalTerm - A function that explains a medical term in simple language.
 * - ExplainMedicalTermInput - The input type for the explainMedicalTerm function.
 * - ExplainMedicalTermOutput - The return type for the explainMedicalTerm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainMedicalTermInputSchema = z.object({
  term: z.string().describe('The medical term to explain.'),
});
export type ExplainMedicalTermInput = z.infer<typeof ExplainMedicalTermInputSchema>;

const ExplainMedicalTermOutputSchema = z.object({
  explanation: z.string().describe('A simple explanation of the medical term.'),
});
export type ExplainMedicalTermOutput = z.infer<typeof ExplainMedicalTermOutputSchema>;

export async function explainMedicalTerm(input: ExplainMedicalTermInput): Promise<ExplainMedicalTermOutput> {
  return explainMedicalTermFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainMedicalTermPrompt',
  input: {schema: ExplainMedicalTermInputSchema},
  output: {schema: ExplainMedicalTermOutputSchema},
  prompt: `You are a helpful chatbot that explains medical terms in simple language.

  Explain the following medical term in simple language:

  {{term}}`,
});

const explainMedicalTermFlow = ai.defineFlow(
  {
    name: 'explainMedicalTermFlow',
    inputSchema: ExplainMedicalTermInputSchema,
    outputSchema: ExplainMedicalTermOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
