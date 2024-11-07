/* eslint-disable @typescript-eslint/no-require-imports */
import "dotenv/config";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY || "");

export async function getGenerativeModel(): Promise<GenerativeModel> {
  return await genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
}

export function removeJSON(response: string): string {
  return response.replace(/```json|```/g, "").trim();
}
