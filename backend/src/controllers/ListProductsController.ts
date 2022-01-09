import { Request, Response } from "express";
import { ListProductsService } from "../services/ListProductsService";

interface IListProductsController {
    name?: string;
    categories?: string[];
}

class ListProductsController {
    async handle(request: Request, response: Response){
        const listProductsService = new ListProductsService();
        const { categories, name }: IListProductsController = request.query;

        const allProducts = await listProductsService.execute({ categories, name });
        return response.json(allProducts)
    }
}

export { ListProductsController }