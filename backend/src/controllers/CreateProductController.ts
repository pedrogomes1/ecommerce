import { Request, Response } from "express";
import { CreateProductService } from "../services/CreateProductService";

class CreateProductController {
    async handle(request: Request, response: Response) {
        const { name, price, category_id } = request.body;

        const createProductService = new CreateProductService();

        const newProduct = await createProductService.execute({ name, price, category_id });

        if (newProduct instanceof Error) {
            return response.status(400).json(newProduct.message);
        }

        return response.json(newProduct);
    }
}

export { CreateProductController }