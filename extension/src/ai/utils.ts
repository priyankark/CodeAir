import path = require("path");
import * as vscode from "vscode";
import * as fs from "fs";
import * as dotenv from "dotenv";

export function getApiKey(): string | undefined {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    vscode.window.showErrorMessage("No workspace folder open");
    return undefined;
  }

  const envPath = path.join(workspaceFolder.uri.fsPath, ".env");
  if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    return envConfig.OPENAI_API_KEY;
  }
  return undefined;
}

export function saveApiKey(key: string): void {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    vscode.window.showErrorMessage("No workspace folder open");
    return;
  }

  const envPath = path.join(workspaceFolder.uri.fsPath, ".env");
  let envConfig: { [key: string]: string } = {};
  if (fs.existsSync(envPath)) {
    envConfig = dotenv.parse(fs.readFileSync(envPath));
  }
  envConfig["OPENAI_API_KEY"] = key;
  const envContent =
    Object.entries(envConfig)
      .map(([k, v]) => `${k}=${v}`)
      .join("\n") + "\n";

  fs.writeFileSync(envPath, envContent);
  vscode.window.showWarningMessage(
    "API key saved in .env file. Ensure this file is ignored in version control."
  );
}
