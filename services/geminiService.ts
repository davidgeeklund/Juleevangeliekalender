import { GoogleGenAI, Type } from "@google/genai";
import { DayContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchDayContent = async (day: number): Promise<DayContent> => {
  const prompt = `
    Du lager innhold til en kristen julekalender for barn (dag ${day} av 24).
    Temaet er: Evangeliet om at Jesus kom til jorden, ble født, og døde slik at vi kunne få evig liv.
    
    Oppgave:
    1. Velg et bibelvers som passer til progresjonen i adventstiden (tidlig desember: forventning/profetier, midtveis: reisen/hyrdene, julaften: fødselen, mot slutten: frelsen/korset/evig liv).
    2. Skriv en kort, barnevennlig oppmuntring (maks 50 ord) som forklarer verset og knytter det til at Jesus er vår Frelser og Venn.
    3. Språket skal være varmt, enkelt og på norsk.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verseReference: { type: Type.STRING, description: "Bibelreferansen, f.eks. 'Johannes 3:16'" },
            verseText: { type: Type.STRING, description: "Selve bibelverset" },
            encouragement: { type: Type.STRING, description: "Den korte oppmuntringen til barnet" },
          },
          required: ["verseReference", "verseText", "encouragement"],
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No text returned from Gemini");
    }

    const data = JSON.parse(jsonText);
    
    return {
      day,
      verseReference: data.verseReference,
      verseText: data.verseText,
      encouragement: data.encouragement,
    };
  } catch (error) {
    console.error("Feil ved henting av kalenderluke:", error);
    // Fallback content in case API fails
    return {
      day,
      verseReference: "Johannes 3:16",
      verseText: "For så høyt har Gud elsket verden at han ga sin Sønn, den enbårne, for at hver den som tror på ham, ikke skal gå fortapt, men ha evig liv.",
      encouragement: "Husk at Gud er veldig glad i deg! Han sendte Jesus for å være din beste venn for alltid. (Kunne ikke hente dagens luke, prøv igjen senere).",
    };
  }
};