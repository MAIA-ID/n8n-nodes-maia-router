import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeOperationError,
	IRequestOptions,
} from 'n8n-workflow';

export class MaiaRouter implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Maia Router',
		name: 'maiaRouter',
		icon: 'file:maiaRouter.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Maia Router API for AI model routing',
		defaults: {
			name: 'Maia Router',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'maiaRouterApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://router.maia.id/api/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Chat',
						value: 'chat',
					},
				],
				default: 'chat',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['chat'],
					},
				},
				options: [
					{
						name: 'Create Completion',
						value: 'createCompletion',
						action: 'Create a chat completion',
						description: 'Generate a response using AI models',
						routing: {
							request: {
								method: 'POST',
								url: '/chat/completions',
							},
						},
					},
				],
				default: 'createCompletion',
			},
			{
				displayName: 'Model',
				name: 'model',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['createCompletion'],
					},
				},
				default: 'maia/gemini-2.5-flash',
				required: true,
				description: 'ID of the model to use (e.g., maia/gemini-2.5-flash)',
			},
			{
				displayName: 'Messages',
				name: 'messages',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['createCompletion'],
					},
				},
				default: {},
				placeholder: 'Add Message',
				options: [
					{
						name: 'messageValues',
						displayName: 'Message',
						values: [
							{
								displayName: 'Role',
								name: 'role',
								type: 'options',
								options: [
									{
										name: 'System',
										value: 'system',
									},
									{
										name: 'User',
										value: 'user',
									},
									{
										name: 'Assistant',
										value: 'assistant',
									},
								],
								default: 'user',
								description: 'The role of the message sender',
							},
							{
								displayName: 'Content',
								name: 'content',
								type: 'string',
								typeOptions: {
									rows: 4,
								},
								default: '',
								description: 'The content of the message',
							},
						],
					},
				],
				description: 'Messages to send to the model',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['createCompletion'],
					},
				},
				options: [
					{
						displayName: 'Temperature',
						name: 'temperature',
						type: 'number',
						typeOptions: {
							minValue: 0,
							maxValue: 2,
							numberPrecision: 2,
						},
						default: 1,
						description: 'Controls randomness. Lower is more deterministic, higher is more random.',
					},
					{
						displayName: 'Max Tokens',
						name: 'max_tokens',
						type: 'number',
						default: 1000,
						description: 'Maximum number of tokens to generate',
					},
					{
						displayName: 'Top P',
						name: 'top_p',
						type: 'number',
						typeOptions: {
							minValue: 0,
							maxValue: 1,
							numberPrecision: 2,
						},
						default: 1,
						description: 'Nucleus sampling parameter',
					},
					{
						displayName: 'Stream',
						name: 'stream',
						type: 'boolean',
						default: false,
						description: 'Whether to stream back partial progress',
					},
					{
						displayName: 'Stop Sequences',
						name: 'stop',
						type: 'string',
						default: '',
						description: 'Up to 4 sequences where the API will stop generating (comma-separated)',
					},
					{
						displayName: 'Presence Penalty',
						name: 'presence_penalty',
						type: 'number',
						typeOptions: {
							minValue: -2,
							maxValue: 2,
							numberPrecision: 2,
						},
						default: 0,
						description: 'Penalty for new tokens based on whether they appear in the text so far',
					},
					{
						displayName: 'Frequency Penalty',
						name: 'frequency_penalty',
						type: 'number',
						typeOptions: {
							minValue: -2,
							maxValue: 2,
							numberPrecision: 2,
						},
						default: 0,
						description: 'Penalty for new tokens based on their existing frequency in the text',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'chat') {
					if (operation === 'createCompletion') {
						const model = this.getNodeParameter('model', i) as string;
						const messagesData = this.getNodeParameter('messages', i) as IDataObject;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						// Format messages
						const messages: IDataObject[] = [];
						if (messagesData.messageValues) {
							const messageValues = messagesData.messageValues as IDataObject[];
							for (const message of messageValues) {
								messages.push({
									role: message.role,
									content: message.content,
								});
							}
						}

						if (messages.length === 0) {
							throw new NodeOperationError(
								this.getNode(),
								'At least one message is required',
								{ itemIndex: i },
							);
						}

						// Build request body
						const body: IDataObject = {
							model,
							messages,
						};

						// Add additional fields
						if (additionalFields.temperature !== undefined) {
							body.temperature = additionalFields.temperature;
						}
						if (additionalFields.max_tokens !== undefined) {
							body.max_tokens = additionalFields.max_tokens;
						}
						if (additionalFields.top_p !== undefined) {
							body.top_p = additionalFields.top_p;
						}
						if (additionalFields.stream !== undefined) {
							body.stream = additionalFields.stream;
						}
						if (additionalFields.stop) {
							body.stop = (additionalFields.stop as string).split(',').map((s) => s.trim());
						}
						if (additionalFields.presence_penalty !== undefined) {
							body.presence_penalty = additionalFields.presence_penalty;
						}
						if (additionalFields.frequency_penalty !== undefined) {
							body.frequency_penalty = additionalFields.frequency_penalty;
						}

						// Make API request
						const credentials = await this.getCredentials('maiaRouterApi');
						const options = {
							method: 'POST',
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(body),
							uri: 'https://router.maia.id/api/v1/chat/completions',
							json: true,
						};

						const response = await this.helpers.request(options as IRequestOptions);

						returnData.push({
							json: response,
							pairedItem: { item: i },
						});
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: (error as Error)?.message || 'Internal server error',
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
