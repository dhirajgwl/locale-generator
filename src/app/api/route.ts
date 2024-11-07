

import { NextRequest } from "next/server";
import textGen from "../../ai/createLocalizationFiles";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const gen = textGen(body.inputJSON, body.selectedLocales);

  const stream = new ReadableStream({
    async pull(controller) {
      for await (const value of gen) {
        // Push each value to the stream
        controller.enqueue(JSON.stringify({ status: 200, fileName: value }));
      }
      controller.close(); // Close the stream when done
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}


