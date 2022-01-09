import { Request, Response } from "express";
import { CreateCategoryService } from "../services/CreateCategoryService";

class CreateCategoryController {
    async handle(request: Request, response: Response) {
        const { name } = request.body;

        const createCategoryService = new CreateCategoryService();

        const newMessage = await createCategoryService.execute({ name });

        if (newMessage instanceof Error) {
            return response.status(400).json(newMessage.message);
        }

        return response.json(newMessage);
    }
}

export { CreateCategoryController }