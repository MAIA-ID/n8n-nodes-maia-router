# n8n Integration for MAIA Router

[n8n](https://n8n.io/) community nodes for [MAIA Router](https://maiarouter.ai) - an AI model routing service.

## Installation

**n8n Cloud:**

Only contain chat action (direct api call)

```
@maia-id/n8n-nodes-maia-router-chat-action
```

**Self-hosted:**
```bash
npm install @maia-id/n8n-nodes-maia-router
```

## Configuration

1. Create **Maia Router API** credential in n8n
2. Add your API key from [maiarouter.ai](https://maiarouter.ai)

## Features

### Chat Action Node (Cloud Compatible)

Direct API operations:
- Chat completions
- Text-to-speech
- Audio transcription
- Video generation (Sora, Veo)

**Parameters:**
- Model (e.g., `maia/gemini-2.5-flash`)
- Messages (role + content)
- Temperature, max tokens, top-p
- Stream, stop sequences, penalties

### Chat Model Node (Self-hosted Only)

LangChain integration for:
- AI Agents with tool calling
- Multi-step reasoning
- Memory and context management
- Complex AI workflows

## Usage Examples

### Basic Chat

1. Add **MAIA Router** node
2. Select **Chat** → **Message a model**
3. Set model: `maia/gemini-2.5-flash`
4. Add message with role `user` and your content

### AI Agent (Self-hosted)

1. Add **AI Agent** node
2. Select **MAIA Router Chat Model** as language model
3. Configure tools and memory
4. Model handles multi-step reasoning automatically

### Video Generation

1. Add **MAIA Router** node
2. Select **Video** → **Generate Video**
3. Choose model: `Sora 2` or `Veo 3.0`
4. Enter your prompt
5. Video downloads as binary data

## Development

```bash
npm install      # Install dependencies
npm run build    # Build packages
npm run dev      # Watch mode
```

## Versioning

Use `bump.sh` to release:

```bash
./bump.sh [major|minor|patch]
```

This updates version, creates git tag, and pushes to remote.

## License

[MIT](LICENSE.md)

## Links

- [MAIA Router Docs](https://maiarouter.ai)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)
- [Issues](https://github.com/maia-id/n8n-nodes-maia-router/issues)
