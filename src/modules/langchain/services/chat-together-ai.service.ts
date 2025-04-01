import { BadRequestException, Injectable } from "@nestjs/common";
import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

@Injectable()
export class ChatTogetherAIService {
    private model: ChatTogetherAI

    constructor() {
        this.model = new ChatTogetherAI({
            apiKey: process.env.TOGETHER_AI_API_KEY,
            model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
            temperature: 0,
            streaming: true
        })
    }

    public async *chat(prompt:string) {
        try {
            const response = await this.model.stream(
                [
                    new SystemMessage("You are an advanced AI programming assistant specializing in software development. Your primary role is to provide high-quality coding assistance, suggest best practices, debug issues, and help developers improve their code efficiency and structure."),
                    new HumanMessage(prompt)
                ]
            )

            for await (const chunk of response) {
                yield chunk
            }
        } catch (error) {
            console.log(error);
            throw new BadRequestException(error.message);
        }
    }
}