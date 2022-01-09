import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController {
    async handle(request: Request, response: Response) {
        const { email, message } = request.body;

        const createMessageService = new CreateMessageService();

        const newMessage = await createMessageService.execute({ email, message });

        if (newMessage instanceof Error) {
            return response.status(400).json(newMessage.message);
        }

        return response.json(newMessage);
    }
}

export { CreateMessageController }