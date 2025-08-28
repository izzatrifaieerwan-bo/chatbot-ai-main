import { ChatSettings, OpenAIResponse } from '../types';

export class OpenAIService {
  private static readonly BASE_URL = 'https://api.openai.com/v1/chat/completions';

  static async sendMessage(
    messages: Array<{ role: string; content: string }>,
    settings: ChatSettings
  ): Promise<string> {
    if (!settings.apiKey) {
      throw new Error('API key is required');
    }

    const response = await fetch(this.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.apiKey}`,
      },
      body: JSON.stringify({
        model: settings.model,
        messages: [
          ...(settings.systemPrompt ? [{ role: 'system', content: settings.systemPrompt }] : []),
          ...messages,
        ],
        temperature: settings.temperature,
        top_p: settings.topP,
        max_tokens: settings.maxTokens,
        presence_penalty: settings.presencePenalty,
        frequency_penalty: settings.frequencyPenalty,
        ...(settings.topK > 0 && { top_k: settings.topK }),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get response from OpenAI');
    }

    const data: OpenAIResponse = await response.json();
    return data.choices[0]?.message?.content || 'No response generated';
  }
}