import { GoogleGenAI, Type } from "@google/genai";
import { TravelParams, TravelPlan } from "../types";

const SYSTEM_INSTRUCTION = `
You are the "Core Logistics Engine" for a high-end Travel Planning App. 
Your role is to act as a headless API. 

### CRITICAL CONSTRAINTS:
1. RESPONSE FORMAT: Return ONLY a valid JSON object. Do not include any conversational filler, markdown code blocks (like \`\`\`json), or follow-up text.
2. WEB GROUNDING: Use Google Search to find real, existing Points of Interest (POIs), restaurants, and hotels. Verify their status for 2026.
3. LOGISTICS: Group activities geographically to minimize travel time. Include specific public transit lines or walking times.
4. RAINY DAY LOGIC: For every outdoor activity, you MUST provide a high-quality indoor alternative in the same neighborhood.

### JSON SCHEMA:
{
  "metadata": { "destination": "string", "currency": "string", "timezone": "string" },
  "accommodations": [
    { "name": "string", "category": "Budget|Boutique|Luxury", "rating": "string", "reason_to_stay": "string" }
  ],
  "itinerary": [
    {
      "day": number,
      "theme": "string",
      "activities": [
        {
          "time": "HH:MM",
          "activity": "string",
          "location": "string",
          "description": "string",
          "transport": "string",
          "rainy_day_backup": "string",
          "photo_tip": "Ideal time/angle for the best photo"
        }
      ],
      "local_secret": "A non-touristy spot nearby",
      "cultural_etiquette": "Specific social tip for this day's locations"
    }
  ]
}
`;

export const generateItinerary = async (params: TravelParams): Promise<TravelPlan> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const userPrompt = `
Build a travel plan with the following parameters:
- Destination: ${params.destination}
- Start Date: ${params.startDate}
- End Date: ${params.endDate}
- Travel Group: ${params.group}
- Interests: ${params.interests.join(", ")}
- Vibe: ${params.vibe}
- Pace: ${params.pace}

Task: Scan for real-time 2026 events and deliver the JSON object now.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // Low temperature for stability as requested
        responseMimeType: 'application/json',
        tools: [{ googleSearch: {} }], // Enable web grounding
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    // Attempt to clean JSON if model includes markdown code blocks despite instructions
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(jsonString) as TravelPlan;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
