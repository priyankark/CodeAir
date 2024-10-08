/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * This script helped generate the VS Code built-in commands dataset.
 * It uses the OpenAI API to generate natural language instructions for VS Code keybindings.
 */
import * as fs from "fs";
import OpenAI from "openai";
//@ts-ignore
import { KeyBindings } from "./keybindings";

const openai = new OpenAI({
  apiKey: "",
});

const generateApiPairs = async () => {
  let apiResponses: Record<string, string> = {};

  for (let i = 0; i < KeyBindings.length; i += 200) {
    const batch = KeyBindings.slice(i, i + 200);
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a VS Code expert who is deeply knowledgeable about various VS Code functionalities. You need to map the provided keybinding to a natural language instruction that can be used to trigger the keybinding.\n" +
            `##FORMAT: Output in the following format with each keybinding on a new line as a comma separated key value pair:
              "[short natural language instruction that best represents the keybinding. For example, 'open file']", "[vs code api call. For example, 'workbench.action.files.openFile']"`,
        },
        {
          role: "user",
          content: `Convert the following set of keybindings and associated vs code api commands into aforementioned CSV format with the key containing the natural language instruction and the value being the vs code api command that can trigger that keybinding:\n ${batch
            .map((keybinding) => `${keybinding.key}, ${keybinding.command}`)
            .join("\n")}`,
        },
      ],
      temperature: 0,
      max_tokens: 4000,
    });

    const content = response.choices?.[0]?.message.content;
    console.log(content);
    if (content) {
      const newResponses = content
        .split("\n")
        .map((pair: string) => {
          const [key, value] = pair.split('", "');
          return {
            [key.replace(/^"|"$/g, "")]: value.replace(/^"|"$/g, ""),
          };
        })
        .reduce((acc, cv) => ({ ...acc, ...cv }), {});

      apiResponses = {
        ...apiResponses,
        ...newResponses,
      };
    }
  }

  // Write the api pairs to a file
  fs.writeFileSync("apiPairs.json", JSON.stringify(apiResponses, null, 2));
};

generateApiPairs();
