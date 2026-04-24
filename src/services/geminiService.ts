import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeLiteracyResults(score: number, details: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "Anda adalah pakar literasi Bahasa Indonesia. Analisis hasil tes siswa SMA dan berikan saran perbaikan yang konkret dan memotivasi.",
      },
      contents: `Siswa mendapatkan skor ${score}/100. Detail jawaban: ${details}. Berikan analisis singkat tentang kekuatan dan kelemahan mereka, serta langkah praktis untuk meningkatkan kemampuan literasi mereka. Gunakan nada bicara yang mendukung dan profesional.`,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Maaf, analisis AI saat ini tidak tersedia. Silakan tinjau skor Anda secara manual.";
  }
}
