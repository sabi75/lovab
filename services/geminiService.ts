
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectFile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateAppCode = async (
  prompt: string, 
  onStatusUpdate: (status: string) => void
): Promise<ProjectFile[]> => {
  try {
    onStatusUpdate("Analyzing requirements...");
    
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Build a complete React application based on this description: "${prompt}".
      
      Return the application structure as a JSON array of objects, where each object has a 'path' and 'content'.
      Use the following tech stack:
      - React 18 (TypeScript)
      - Tailwind CSS
      - Lucide React for icons
      - Supabase for backend (Auth and DB)
      
      Include:
      - App.tsx (with routing)
      - Main UI components
      - Supabase client configuration
      - Database schema (SQL)
      - Types.ts
      
      Requirements:
      1. Production-ready code.
      2. Modern, clean UI.
      3. Complete implementations, no TODOs.
      4. Responsive design.
      
      Format your response ONLY as a valid JSON array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              path: { type: Type.STRING, description: "The full file path including extension" },
              content: { type: Type.STRING, description: "The full file content string" }
            },
            required: ["path", "content"]
          }
        },
        thinkingConfig: { thinkingBudget: 16000 }
      }
    });

    const result = JSON.parse(response.text || "[]");
    return result as ProjectFile[];
  } catch (error) {
    console.error("Failed to generate code:", error);
    throw error;
  }
};
