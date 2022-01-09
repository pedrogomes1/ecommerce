import { Request, Response } from "express";
import { CreateCategoryService } from "../services/CreateCategoryService";

class CreateCategoryController {
    async handle(request: Request, response: Response) {
        const { name } = request.body;

        const createCategoryService = new CreateCategoryService();

        const newMessage = await createCategoryService.execute({ name });

        return response.json(newMessage);
    }
}

export { CreateCategoryController }