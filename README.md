# n8n Integration for MAIA Router

This is an n8n community node package for integrating with [Maia Router](https://maiarouter.ai), an AI model routing service.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Features

This package provides **two powerful nodes** for working with MAIA Router:

### 1. **MAIA Router Chat Completion**
A standard n8n node for direct chat completion API calls. Use this for simple, one-off chat completions with full control over all parameters.

### 2. **MAIA Router Chat Model**
A LangChain-compatible AI language model node that integrates with n8n's AI ecosystem. Use this for advanced AI workflows, agent chains, and when you need LangChain compatibility.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** > **Community Nodes**
3. Select **Install**
4. Enter `@maia-id/n8n-nodes-maia-router` in **Enter npm package name**
5. Agree to the risks and install

### Manual Installation

To install manually for local development:

```bash
# Clone or download this repository
cd n8n-nodes-maia-router

# Install dependencies
npm install

# Build the node
npm run build

# Link to n8n (run from n8n installation directory)
npm link n8n-nodes-maia-router
```

## Configuration

### Credentials

You need to configure your Maia Router API credentials in n8n:

1. Create a new credential of type **Maia Router API**
2. Enter your API key from [Maia Router](https://maiarouter.ai)

The node connects to `https://api.maiarouter.ai/v1` by default.

## Node Details

### MAIA Router Chat Completion Node

A traditional n8n node for direct API interaction with MAIA Router.

**Operations:**
- **Create Completion**: Generate AI responses using Maia Router's model routing capabilities

**Parameters:**

- **Model** (required): The model to use (e.g., `maia/gemini-2.5-flash`)
- **Messages** (required): Array of message objects with role and content
  - **Role**: system, user, or assistant
  - **Content**: The message text

**Additional Fields:**

- **Temperature**: Controls randomness (0-2, default: 1)
- **Max Tokens**: Maximum tokens to generate
- **Top P**: Nucleus sampling parameter (0-1)
- **Stream**: Enable streaming responses
- **Stop Sequences**: Sequences to stop generation (comma-separated)
- **Presence Penalty**: Penalty for new tokens (-2 to 2)
- **Frequency Penalty**: Penalty based on frequency (-2 to 2)

**Best for:**
- Direct API calls to MAIA Router
- Simple chat completion workflows
- Custom parameter control
- Straightforward request-response patterns

---

### MAIA Router Chat Model Node

A LangChain-compatible language model node that works seamlessly with n8n's AI features.

**Key Features:**
- Full LangChain integration
- Compatible with n8n AI Agent nodes
- Works with AI Chain nodes
- Supports memory and context management
- Can be used in complex AI workflows

**Parameters:**
- **Model** (required): The MAIA Router model to use
- **Temperature**: Controls response randomness
- **Max Tokens**: Maximum response length
- All standard LangChain chat model parameters

**Best for:**
- Building AI agents in n8n
- Complex AI chains and workflows
- Integration with other LangChain tools
- Advanced conversational AI applications
- Multi-step reasoning tasks

## Example Usage

### Example 1: Basic Chat Completion (Chat Completion Node)

Use the **MAIA Router Chat Completion** node for simple API calls:

1. Add a **MAIA Router** node to your workflow
2. Select **Chat** resource and **Create Completion** operation
3. Set the model: `maia/gemini-2.5-flash`
4. Add a message:
   - Role: `user`
   - Content: `Hello MAIA!`
5. Execute the node

### Example 2: Multi-turn Conversation (Chat Completion Node)

Add multiple messages to simulate a conversation:

1. Message 1:
   - Role: `system`
   - Content: `You are a helpful assistant.`
2. Message 2:
   - Role: `user`
   - Content: `What is the capital of France?`

### Example 3: AI Agent Workflow (Chat Model Node)

Use the **MAIA Router Chat Model** node with n8n's AI Agent:

1. Add an **AI Agent** node to your workflow
2. In the AI Agent configuration, select **MAIA Router Chat Model** as the language model
3. Configure the model:
   - Model: `maia/claude-3.5-sonnet`
   - Temperature: `0.7`
4. Add tools and memory as needed
5. The AI Agent can now use MAIA Router for intelligent, multi-step reasoning

### Example 4: AI Chain with Memory (Chat Model Node)

Build a conversational AI with memory:

1. Add a **Basic LLM Chain** node
2. Select **MAIA Router Chat Model** as the language model
3. Add a **Window Buffer Memory** node for conversation history
4. Connect your trigger and input nodes
5. The chain will maintain context across multiple interactions

## When to Use Which Node?

| Use Case | Recommended Node |
|----------|-----------------|
| Simple API calls | **Chat Completion Node** |
| One-off completions | **Chat Completion Node** |
| Full parameter control | **Chat Completion Node** |
| AI Agents | **Chat Model Node** |
| LangChain workflows | **Chat Model Node** |
| Multi-step reasoning | **Chat Model Node** |
| Memory & context management | **Chat Model Node** |
| Integration with AI tools | **Chat Model Node** |

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Maia Router Documentation](https://maiarouter.ai)

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Watch mode for development
npm run dev

# Lint and format
npm run lint
npm run format
```

## Version History

- **0.1.0**: Initial release with two nodes:
  - MAIA Router Chat Completion node for direct API calls
  - MAIA Router Chat Model node for LangChain integration

## License

[MIT](LICENSE.md)

## Support

For issues and feature requests, please visit the [GitHub repository](https://github.com/yourusername/n8n-nodes-maia-router/issues).


## Release

Release is handled using the [`bump.sh`](./bump.sh) script.

This script automatically bumps the package version in `package.json`.  
You can run it from the project root as follows:

```sh
./bump.sh [major|minor|patch]
```

This will:
- Update the `version` field in `package.json`
- Create a git tag and push to remote (via `npm run tag`)

**Note:**  
- You must have git permissions to push tags for this to work.
- Ensure your working directory is clean before running, as the tag commit will stage and push changes.

See [`bump.sh`](./bump.sh) for implementation details.