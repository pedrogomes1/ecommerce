import { Request, Response } from "express";
import { DeleteCategoryService } from "../services/DeleteCategoryService";

class DeleteCategoryController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const deleteCategoryService = new DeleteCategoryService();
        const category = await deleteCategoryService.execute({ id });

        if (category instanceof Error) {
            return response.status(400).json(category.message);
        }

        return response.status(204).end();
    }
}

export { DeleteCategoryController }