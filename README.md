# n8n Integration for MAIA Router

This is an n8n community node for integrating with [Maia Router](https://router.maia.id), an AI model routing service.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** > **Community Nodes**
3. Select **Install**
4. Enter `n8n-nodes-maia-router` in **Enter npm package name**
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
2. Enter your API key from [Maia Router](https://router.maia.id)

The node connects to `https://router.maia.id/api/v1` by default.

## Operations

### Chat

#### Create Completion

Generate AI responses using Maia Router's model routing capabilities.

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

## Example Usage

### Basic Chat Completion

1. Add a **Maia Router** node to your workflow
2. Select **Chat** resource and **Create Completion** operation
3. Set the model: `maia/gemini-2.5-flash`
4. Add a message:
   - Role: `user`
   - Content: `Hello MAIA!`
5. Execute the node

### Multi-turn Conversation

Add multiple messages to simulate a conversation:

1. Message 1:
   - Role: `system`
   - Content: `You are a helpful assistant.`
2. Message 2:
   - Role: `user`
   - Content: `What is the capital of France?`

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Maia Router Documentation](https://router.maia.id)

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

- **0.1.0**: Initial release with chat completions support

## License

[MIT](LICENSE.md)

## Support

For issues and feature requests, please visit the [GitHub repository](https://github.com/yourusername/n8n-nodes-maia-router/issues).
