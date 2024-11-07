import fs from "fs/promises";
import path from "path";
import os from "os"; // For detecting the user's home directory
import { getGenerativeModel, removeJSON } from "./getGenAIModal";

async function createFolderAndSaveFile(fileName: string, content: string = "") {
  const downloadsFolder = path.join(os.homedir(), "Downloads");
  const folderPath = path.join(downloadsFolder, "locales");
  const filePath = path.join(folderPath, fileName);

  try {
    // Create folder if it doesn't exist
    await fs.mkdir(folderPath, { recursive: true });
    await fs.writeFile(filePath, content);
    console.log(`File saved: ${filePath}`);
  } catch (err) {
    console.error("Error creating folder or saving file:", err);
  }
}

const getLocalizeData = async (lang: string, selectedJson: object, complete: boolean = false) => {
  try {
    const prompt = `${complete ? `Translate Remaining Keys` : `Translate the following JSON to ${lang}: ${JSON.stringify(selectedJson)} and 
    return the result in a paginated JSON format. Each page should include a "data" field with the translated 
    items and a "pagination" field that includes "page", "perPage", "totalPages", and "totalItems". 
    Ensure there is no whitespace in the JSON response, including no line breaks.` } use this format to 
    show the result 
    {
      "translationCompleted": true,
       "data": '{"key1":"translated_value1"}'
    }      
    `;

    // Get the generative AI model (assuming this is an async function)
    const modal = await getGenerativeModel();

    // Generate content based on the prompt
    const response = await modal.generateContent(prompt);

    return removeJSON(response.response.text());
  }
  catch (error) {
    console.error("Error creating localization files:", error);
    return new Response("Failed to create localization files", { status: 500 });
  }
}

const getRemainingKeys = async (lang: string, selectedJSON: object, data: string) => {
  const res = await getLocalizeData(lang, selectedJSON);
  const response = JSON.parse(res as string);
  data += JSON.stringify(response.data);
  if (!response.translationCompleted) {
    getRemainingKeys(lang, selectedJSON, data)
  }
  return data;
}

async function* textGen(selectedJSON: object, supportedLang: string[]) {
  for (let i = 0; i < supportedLang.length; i++) {
    const lang = supportedLang[i];
    const localData = await getLocalizeData(lang, selectedJSON);
    try {
      const response = JSON.parse(localData as string);
      const data = response.data;

      if (!response.translationCompleted) {
        await getRemainingKeys(lang, selectedJSON, data);
      }
      const fileName = `localizedData.${lang}.json`;

      await createFolderAndSaveFile(fileName, data);
      yield fileName;
    }
    catch (error) {
      console.log(error);
      yield "Error in file"
    }
  }

}


export default textGen
