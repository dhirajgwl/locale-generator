/* eslint-disable @typescript-eslint/no-require-imports */
import { getGenerativeModel, removeJSON } from "./getGenAIModal";

const getAllLangLocale = async (): Promise<string> => {
  const prompt = `
    Please provide a JSON object in the following schema format for all supported locale languages, sorted by region and with whitespace removed:
    {
      "localeCode": "string",
      "language": "string",
      "region": "string"
    }
  
    Example:
    {
      "localeCode": "en-US",
      "language": "English",
      "region": "United States"
    }
  `;

  const modal = await getGenerativeModel();
  const response = await modal.generateContent(prompt);

  const jsonResponse = await response.response.text(); // Ensure the response is awaited correctly
  return removeJSON(jsonResponse); // Cast the returned value to the expected type
};

export default getAllLangLocale;
