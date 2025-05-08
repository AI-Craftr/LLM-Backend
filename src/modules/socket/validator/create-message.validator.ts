import * as Joi from "joi";

export const createMessageValidator = Joi.object({
    user_prompt: Joi.string().required(),
    chat_room_id: Joi.string().optional()
})