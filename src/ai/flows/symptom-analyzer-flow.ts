'use server';

/**
 * @fileOverview An AI flow that analyzes a user's symptom log.
 *
 * - analyzeSymptomLog - Analyzes symptoms and notes to provide a summary and questions for a doctor.
 * - SymptomAnalysisInput - The input type for the analyzeSymptomLog function.
 * - SymptomAnalysisOutput - The return type for the analyzeSymptomLog function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomAnalysisInputSchema = z.object({
  symptoms: z.array(z.string()).describe("A list of symptoms the user has selected."),
  notes: z.string().describe("Free-text notes from the user about their symptoms."),
});
export type SymptomAnalysisInput = z.infer<typeof SymptomAnalysisInputSchema>;

const SymptomAnalysisOutputSchema = z.object({
  summary: z.string().describe("A brief, neutral summary of the logged symptoms and notes."),
  potentialTriggers: z.array(z.string()).describe("A list of potential lifestyle or environmental triggers explicitly mentioned in the user's notes."),
  questionsForDoctor: z.array(z.string()).describe("A list of suggested, neutrally-phrased questions the user could ask their doctor."),
});
export type SymptomAnalysisOutput = z.infer<typeof SymptomAnalysisOutputSchema>;

export async function analyzeSymptomLog(input: SymptomAnalysisInput): Promise<SymptomAnalysisOutput> {
  return symptomAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomAnalyzerPrompt',
  input: {schema: SymptomAnalysisInputSchema},
  output: {schema: SymptomAnalysisOutputSchema},
  prompt: `You are a helpful and cautious health assistant AI. Your role is to analyze a user's symptom log to help them prepare for a doctor's visit.

You MUST NOT provide any form of medical advice, diagnosis, or interpretation of the severity of the symptoms. Your response must be neutral and objective.

Based on the following symptoms and notes, you will:
1.  Generate a brief, one or two-sentence summary of the user's log.
2.  Identify potential triggers ONLY if they are explicitly mentioned in the user's notes (e.g., 'after eating spicy food', 'during a stressful meeting', 'after my morning walk'). Do not infer or guess triggers. If none are mentioned, return an empty array.
3.  Suggest a few neutral questions the user could ask their doctor. These questions should be aimed at facilitating a conversation, not at seeking a diagnosis from you. Frame them like "I noticed [symptom] when [context], could we talk about that?"

Symptom List:
{{#each symptoms}}
- {{this}}
{{/each}}

User's Notes:
"{{{notes}}}"

Your entire response must be in the structured JSON format defined by the output schema.
`,
});

const symptomAnalyzerFlow = ai.defineFlow(
  {
    name: 'symptomAnalyzerFlow',
    inputSchema: SymptomAnalysisInputSchema,
    outputSchema: SymptomAnalysisOutputSchema,
  },
  async input => {
    // Return empty analysis if no input is provided
    if (input.symptoms.length === 0 && !input.notes) {
        return {
            summary: "No symptoms or notes were provided for this log.",
            potentialTriggers: [],
            questionsForDoctor: [],
        };
    }
    
    const {output} = await prompt(input);
    return output!;
  }
);
