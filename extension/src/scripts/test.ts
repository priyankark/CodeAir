/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { KeyBindings } from "./keybindings";
//@ts-ignore
import * as ApiPairs from "./apiPairs.json";
import * as fs from "fs";

// Check what all values exist in KeyBindings but not in ApiPairs
const valuesInKaybindings = KeyBindings.map((keybinding) => keybinding.command);
const valuesInApiPairs = Object.values(ApiPairs);

const missingValues = valuesInKaybindings.filter((value) => !valuesInApiPairs.includes(value));
console.log(missingValues);

// Output:
fs.writeFileSync("missingValues.json", JSON.stringify(missingValues, null, 2));