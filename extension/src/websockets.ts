import * as WebSocket from "ws";
import { handleCommand } from "./commanding/command-handler";
import { chatWithOpenAI } from "./ai/api";
import { Commands } from "./commanding/commands";
import { handleFileUpload } from "./files/utils";
import { store } from "./state/store";
import {
  addWebSocketConnection,
  removeWebSocketConnection,
} from "./state/actions";

export function handleWebSocketConnection(ws: WebSocket) {
  console.log("New WebSocket connection");
  addWebSocketConnection(ws);

  ws.on("message", async (message: WebSocket.Data) => {
    console.log("Received message:", message);

    if (message instanceof Buffer) {
      const messageData = message.toString();
      console.log("message data", messageData);

      if (isSupportedCommand(messageData)) {
        await handleCommand(messageData as never, ws);
      } else {
        await handleFileUpload(message, ws);
      }
    } else if (Array.isArray(message)) {
      const combinedBuffer = Buffer.concat(message);
      await handleFileUpload(combinedBuffer, ws);
    } else if (typeof message === "string") {
      try {
        const response = await chatWithOpenAI(
          message,
          store.getState().apiKey || ""
        );
        store.getState().webview.panel?.webview.postMessage({
          type: "chatResponse",
          response,
        });
      } catch (error: any) {
        store.getState().webview.panel?.webview.postMessage({
          type: "error",
          message: "Error chatting with AI",
        });
      }
    } else {
      console.warn("Unhandled message type:", typeof message);
    }
  });

  ws.on("close", () => {
    removeWebSocketConnection(ws);
  });
}

const isSupportedCommand = (command: string): boolean => {
  return (
    Object.keys(Commands)
      .map((e) => e.toLowerCase())
      .includes(command.toLowerCase()) ||
    ["type ", "keytap ", "go to line", "open file", "search", "replace"].some(
      (prefix) => (command as string).toLowerCase().startsWith(prefix)
    )
  );
};
