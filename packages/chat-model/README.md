# MAIA Router - n8n Integration (Self Hosted)

[![npm version](https://badge.fury.io/js/%40maia-id%2Fn8n-nodes-maia-router-chat-model.svg)](https://www.npmjs.com/package/@maia-id/n8n-nodes-maia-router-chat-model)

## Features

### MAIA Router Node

Direct API operations with full control:
- **Chat Completion** - Generate AI responses
- **Text to Speech** - Convert text to audio
- **Transcribe** - Convert audio to text
- **Text to Video** - Generate video from text

### MAIA Router Chat Model

Full LangChain integration for advanced AI workflows:
- ✅ **AI Agent Support** - Works with n8n's AI Agent nodes
- ✅ **Tool Calling** - Supports function calling and tools
- ✅ **LangChain Chains** - Compatible with all LangChain features
- ✅ **Memory Support** - Context and conversation history
- ✅ **Multi-step Reasoning** - Complex AI workflows

## Installation

### Community Node (Recommended)

To install this node as a community node in n8n, follow these steps:

1. Open your n8n instance
2. Go to "Settings" > "Community Nodes"
3. Select "Install"
4. Enter `@maia-id/n8n-nodes-maia-router` in the "Enter npm package name" field
5. Agree to the risks of using community nodes (if prompted)
6. Click "Install"
7. After installation, the node will be available in the "OpenRouter" category in the node palette.

### Manual Installation (Advanced)
If you prefer manual installation or are using a custom n8n setup:

1. Open your n8n installation directory
2. Navigate to the nodes subdirectory
3. Run the following command:

```
npm install n8n-nodes-openrouter
```
4. Restart your n8n instance