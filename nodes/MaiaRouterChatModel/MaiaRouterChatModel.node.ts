import {
	IExecuteFunctions,
	INodeType,
	INodeTypeDescription,
	SupplyData,
	INodePropertyOptions,
	ISupplyDataFunctions,
} from 'n8n-workflow';
import { ChatOpenAI } from '@langchain/openai';

export class MaiaRouterChatModel implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MAIA Router Chat Model',
		name: 'maiaRouterChatModel',
		icon: 'file:maiaRouter.svg',
		group: ['transform'],
		version: 1,
		description: 'Use MAIA Router as a chat model provider',
		defaults: {
			name: 'MAIA Router Chat Model',
		},
		credentials: [
			{
				name: 'maiaRouterApi',
				required: true,
			},
		],
		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Language Models'],
			},
			resources: {
				primaryDocumentation: [
					{
						url: 'https://maiarouter.ai',
					},
				],
			},
		},
		inputs: [],
		outputs: ['ai_languageModel'],
		outputNames: ['Model'],
		properties: [
			{
				displayName: 'Model',
				name: 'model',
				type: 'string',
				description: 'The model to use (e.g., maia/gemini-2.5-flash, maia/gpt-4o, maia/claude-3.5-sonnet). See all models at https://maiarouter.ai/dashboard/models',
				default: 'maia/gemini-2.5-flash',
				placeholder: 'maia/gemini-2.5-flash',
				required: true,
			},
			{
				displayName: 'Options',
				name: 'options',
				placeholder: 'Add Option',
				description: 'Additional options to configure',
				type: 'collection',
				default: {},
				options: [
					{
						displayName: 'Temperature',
						name: 'temperature',
						default: 0.7,
						typeOptions: { minValue: 0, maxValue: 2, numberPrecision: 1 },
						description:
							'Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive.',
						type: 'number',
					},
					{
						displayName: 'Maximum Tokens',
						name: 'maxTokens',
						default: 1000,
						description: 'The maximum number of tokens to generate in the completion',
						type: 'number',
						typeOptions: {
							maxValue: 100000,
						},
					},
					{
						displayName: 'Top P',
						name: 'topP',
						default: 1,
						typeOptions: { minValue: 0, maxValue: 1, numberPrecision: 1 },
						description:
							'Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered. Recommended to use temperature or top_p but not both.',
						type: 'number',
					},
					{
						displayName: 'Frequency Penalty',
						name: 'frequencyPenalty',
						default: 0,
						typeOptions: { minValue: -2, maxValue: 2, numberPrecision: 1 },
						description:
							"Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim",
						type: 'number',
					},
					{
						displayName: 'Presence Penalty',
						name: 'presencePenalty',
						default: 0,
						typeOptions: { minValue: -2, maxValue: 2, numberPrecision: 1 },
						description:
							"Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics",
						type: 'number',
					},
				],
			},
		],
	};

	async supplyData(this: ISupplyDataFunctions, itemIndex: number): Promise<SupplyData> {
		const credentials = await this.getCredentials('maiaRouterApi');
		const modelName = this.getNodeParameter('model', itemIndex) as string;
		const options = this.getNodeParameter('options', itemIndex, {}) as {
			temperature?: number;
			maxTokens?: number;
			topP?: number;
			frequencyPenalty?: number;
			presencePenalty?: number;
		};

		const model = new ChatOpenAI({
			modelName,
			apiKey: credentials.apiKey as string,
			configuration: {
				baseURL: 'https://maiarouter.ai/api/v1',
			},
			temperature: options.temperature,
			maxTokens: options.maxTokens !== undefined ? options.maxTokens : undefined,
			topP: options.topP,
			frequencyPenalty: options.frequencyPenalty,
			presencePenalty: options.presencePenalty,
		});

		return {
			response: model,
		};
	}
}
