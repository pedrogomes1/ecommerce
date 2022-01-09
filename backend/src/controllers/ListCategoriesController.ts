import { Request, Response } from "express";
import { ListCategoriesService } from "../services/ListCategoriesService";

class ListCategoriesController {
    async handle(request: Request, response: Response){
        const listCategoriesService = new ListCategoriesService();

        const allCategories = await listCategoriesService.execute();
        return response.json(allCategories)
    }
}

export { ListCategoriesController }