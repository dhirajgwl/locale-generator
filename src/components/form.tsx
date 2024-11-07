"use client";
import React, { useState } from "react";
import Checkbox from "./checkbox";
import InputFile from "./inputFile";


type Lang = {
  localeCode: string;
  language: string;
  region: string;
};

type Props = {
  selectedLocales: string[];
  allLangLocale: string;
  //   handleSubmitHandler: (locales: string[]) => void;
};

const Form: React.FC<Props> = ({ selectedLocales, allLangLocale }) => {

  const [inputJSON, setInputJSON] = useState<string>();
  const [showProgress, setProgress] = useState(false);
  const [filenames, setFileNames] = useState<string[]>([])
  const onChangeHandler = (target: HTMLInputElement) => {
    // Handle checkbox change here
    const checked = target.checked;
    if (checked) {
      selectedLocales.push(target.value);
    } else {
      const index = selectedLocales.indexOf(target.value);
      if (index > -1) {
        selectedLocales.splice(index, 1);
      }
    }
  };
  async function fetchLocalizationFiles(inputJSON: string | undefined, selectedLocales: string[]) {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputJSON, selectedLocales }),
    });

    const reader = response?.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const res = await reader?.read();
      if (res?.done) break; // Exit when the stream is done
      // Decode and process each chunk
      const chunk = decoder.decode(res?.value, { stream: true });
      const data = JSON.parse(chunk);
      setFileNames((prevFilenames) => {
        const updatedFilenames = [...prevFilenames, data.fileName];
        console.log(data.fileName, updatedFilenames); // Log the updated filenames array
        return updatedFilenames;
      });

      // Handle the data (e.g., update the UI)
      console.log(data.fileName, filenames); // Do something with the fileName
    }
  }


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    fetchLocalizationFiles(inputJSON, selectedLocales);
    setProgress(true);
  };
 
  return (
    <>
      {!showProgress ? <form onSubmit={handleSubmit}>
        <section>
          <h1>Select Input JSON File</h1>
          <InputFile jsonData={inputJSON} setJsonData={setInputJSON} />
        </section>

        <section>
          <h1>Select Language for Localization</h1>
          <div className="flex flex-wrap">
            {JSON.parse(allLangLocale).sort((a: Lang, b: Lang) => a.region.localeCompare(b.region)).map((lang: Lang) => (
              <div key={lang.localeCode} className="w-1/4">
                <Checkbox
                  label={`${lang.region} (${lang.language})`}
                  checked={false}
                  value={lang.localeCode}
                  onChange={onChangeHandler}
                />
              </div>
            ))}
          </div>
        </section>
        <section className="mt-4">
          <button
            type="submit"
            disabled={!inputJSON}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </section>

      </form> : <>
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Lang</th>
              <th>FileName</th>
            </tr>
          </thead>
          <tbody>
            {selectedLocales.map((lang, index) => {
              return <tr key={index}>
                <td>{index}</td>
                <td>{lang}</td>
                <td>
                  {filenames.find((_lang) =>  _lang.indexOf(lang) !==-1 ) || <button type="button" className="bg-indigo-500 ..." disabled>
                    <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
                    File creating...
                  </button>}

                </td>
              </tr>
            })}
          </tbody>

        </table>
      </>}
    </>
  );
};

export default Form;
