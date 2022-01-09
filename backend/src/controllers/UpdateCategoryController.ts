import { Request, Response } from "express";
import { UpdateCategoryService } from "../services/UpdateCategoryService";

class UpdateCategoryController {
    async handle(request: Request, response: Response) {
        const { name } = request.body;
        const { id } = request.params;

        const updateCategoryService = new UpdateCategoryService();
        const category = await updateCategoryService.execute({ id, name });

        if (category instanceof Error) {
            return response.status(400).json(category.message);
        }

        return response.json(category);
    }
}

export { UpdateCategoryController }