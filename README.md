# CodeAir: AirDrop, but for VS Code

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Features](#features)
5. [Using CodeAir](#using-codeair)
6. [Command Reference](#command-reference)
7. [Troubleshooting](#troubleshooting)

## Introduction

Welcome to CodeAir, your intelligent coding companion for Visual Studio Code! CodeAir bridges the gap between your devices and your development environment, offering seamless file transfer, AI-powered coding assistance, and intuitive control over your VS Code instance.

## Installation

1. Open Visual Studio Code
2. Go to the Extensions view (Ctrl+Shift+X or Cmd+Shift+X)
3. Search for "CodeAir"
4. Click "Install"
5. Reload VS Code when prompted

## Getting Started

1. Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P)
2. Type "CodeAir: Start CodeAir Server" and select it
3. CodeAir will display an IP address and port
4. Use any WebSocket client on your other devices to connect to this address

## Features

- **Seamless File Transfer**: Send files from your phone or tablet directly to VS Code
- **AI-Powered Chat**: Get coding help, explanations, and suggestions
- **Image Analysis**: Upload images for text extraction or analysis
- **Smart Commands**: Control VS Code using natural language
- **Screen Capture**: Take and analyze screenshots of your development environment

## Using CodeAir

### Opening the CodeAir Interface

1. Open the Command Palette
2. Type "CodeAir: Open CodeAir Webview" and select it

### Transferring Files

1. Connect to the CodeAir server from your device
2. Send any file through the WebSocket connection
3. The file will appear in your VS Code workspace under the "CodeAir" folder

### Using AI Chat

1. In the CodeAir interface, find the "Chat with AI" section
2. Type your question or request
3. Click "Send" or press Enter
4. View the AI's response in the interface

### Using Smart Commands

Type commands in the chat input to control VS Code. For example:
- `type Hello, World!`: Types the text in your editor
- `go to line 42`: Moves the cursor to line 42
- `search TODO`: Searches for "TODO" in the current file

### Capturing Screenshots

1. Type "get screenshot" in the chat input
2. CodeAir will capture and display your current screen
3. You can then ask the AI to analyze the screenshot

## Command Reference

- `CodeAir: Start CodeAir Server`: Starts the CodeAir server
- `CodeAir: Stop CodeAir Server`: Stops the CodeAir server
- `CodeAir: Open CodeAir Webview`: Opens the CodeAir interface

Chat-based commands:
- `type [text]`: Types the specified text
- `keytap [key]`: Simulates pressing a key (e.g., enter, tab, escape)
- `go to line [number]`: Moves to a specific line
- `open file [filename]`: Opens a file
- `search [text]`: Searches in the current file
- `replace [old] with [new]`: Replaces text
- `get screenshot`: Captures a screenshot

## Troubleshooting

- **Can't start the server**: Make sure no other application is using the same port
- **Can't connect from other devices**: Ensure all devices are on the same network
- **AI features not working**: Check if you've entered a valid OpenAI API key in settings
- **File transfer issues**: Verify your WebSocket client is correctly configured

For more assistance, please check our GitHub repository or reach out to our support team.

Happy coding with CodeAir!
