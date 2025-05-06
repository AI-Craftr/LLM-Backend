import { Injectable } from "@nestjs/common";
import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { SYSTEM_MESSAGE } from "../constants/system_message.constants";

@Injectable()
export class AgentsService {
    private llm: ChatTogetherAI;

    constructor() {
        this.llm = new ChatTogetherAI({
            apiKey: process.env.TOGETHER_AI_API_KEY,
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            temperature: 0,
            streaming: true
        })
    };

    public async *streamChat(input: string): AsyncGenerator<string> {
        const prompt = ChatPromptTemplate.fromMessages([
            ['system', SYSTEM_MESSAGE],
            ['human', input]
        ]);

        const chain = prompt.pipe(this.llm);

        let fullResponse = "";
        const stream = await chain.stream({ input });

        for await (const chunk of stream) {
            const content = chunk.content as string;
            fullResponse += content;
            yield content;
        }
    }
}