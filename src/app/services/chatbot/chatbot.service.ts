import { Injectable } from '@angular/core'
import { OpenAI } from 'openai'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    // Initialize OpenAI with your API key
    this.openai = new OpenAI({ apiKey: environment.apiKey });
  }

  sendChatMessage(message: string) {
    const request = {
      model: 'gpt-3.5-turbo', // Use the appropriate model name
      messages: [
        { role: 'user', content: message },
      ],
    };

   //return this.openai.completions.create();
  }
}
