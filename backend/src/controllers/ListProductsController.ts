import { Request, Response } from "express";
import { ListProductsService } from "../services/ListProductsService";

interface IListProductsController {
    categories?: string[];
}

class ListProductsController {
    async handle(request: Request, response: Response){
        const listProductsService = new ListProductsService();
        const { categories }: IListProductsController = request.query;

        const allProducts = await listProductsService.execute({ categories });
        return response.json(allProducts)
    }
}

export { ListProductsController }