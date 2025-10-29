# MAIA Router Chat Model - n8n Node

[![npm version](https://badge.fury.io/js/%40maia-id%2Fn8n-nodes-maia-router-chat-model.svg)](https://www.npmjs.com/package/@maia-id/n8n-nodes-maia-router-chat-model)

**Self-Hosted Only** ⚠️ | Not compatible with n8n Cloud

LangChain ChatModel integration for [MAIA Router](https://maiarouter.ai) with full AI Agent support.

## ⚠️ Important Note

**This package does NOT work on n8n Cloud** due to LangChain dependency restrictions.

If you're using n8n Cloud, install the action-based package instead:
```bash
@maia-id/n8n-nodes-maia-router-chat-action
```

## Features

### MAIA Router Chat Model

Full LangChain integration for advanced AI workflows:
- ✅ **AI Agent Support** - Works with n8n's AI Agent nodes
- ✅ **Tool Calling** - Supports function calling and tools
- ✅ **LangChain Chains** - Compatible with all LangChain features
- ✅ **Memory Support** - Context and conversation history
- ✅ **Multi-step Reasoning** - Complex AI workflows

## Installation

### Self-Hosted n8n ONLY

```bash
npm install @maia-id/n8n-nodes-maia-router-chat-model
```

Or via n8n UI:
1. Go to **Settings** > **Community Nodes**
2. Select **Install**
3. Enter `@maia-id/n8n-nodes-maia-router-chat-model`
4. Click Install

> **Note**: This will fail on n8n Cloud. Use `@maia-id/n8n-nodes-maia-router-chat-action` instead.

## Configuration

### Credentials

1. Create a new credential of type **Maia Router API**
2. Enter your API key from [MAIA Router](https://maiarouter.ai)

### Model Configuration

- **Model**: Choose from MAIA Router models (e.g., `maia/gemini-2.5-flash`, `openai/gpt-4o-mini`)
- **Temperature**: Control randomness (0-2)
- **Max Tokens**: Limit response length
- **Top P**, **Frequency Penalty**, **Presence Penalty**: Fine-tune generation

## Example Usage

### With AI Agent

1. Add **AI Agent** node
2. In language model, select **MAIA Router Chat Model**
3. Configure:
   - Model: `maia/claude-3.5-sonnet`
   - Temperature: `0.7`
4. Add tools and memory as needed
5. The AI Agent can now use MAIA Router for intelligent reasoning

### With LangChain Chain

1. Add **Basic LLM Chain** node
2. Select **MAIA Router Chat Model** as the language model
3. Add **Window Buffer Memory** for conversation history
4. Connect your trigger and input nodes

## When to Use Chat Model vs Chat Action

| Feature | Chat Action | Chat Model |
|---------|-------------|------------|
| n8n Cloud | ✅ Yes | ❌ No |
| Self-hosted | ✅ Yes | ✅ Yes |
| Simple chat completion | ✅ Best | ⚠️ Overkill |
| AI Agents | ❌ No | ✅ Best |
| LangChain workflows | ❌ No | ✅ Best |
| Tool calling | ❌ No | ✅ Yes |

## Troubleshooting

### Installation fails on n8n Cloud

**Solution**: This is expected. Use `@maia-id/n8n-nodes-maia-router-chat-action` instead.

### "Require of '@langchain/openai' is not allowed"

**Solution**: You're on n8n Cloud. This package only works on self-hosted n8n.

## Resources

- [MAIA Router Documentation](https://maiarouter.ai)
- [n8n AI Agent Documentation](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/)
- [GitHub Repository](https://github.com/maia-id/n8n-nodes-maia-router)

## Support

For issues and feature requests, please visit the [GitHub Issues](https://github.com/maia-id/n8n-nodes-maia-router/issues).

## License

MIT
