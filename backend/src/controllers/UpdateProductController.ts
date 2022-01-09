import { Request, Response } from "express";
import { UpdateProductService } from "../services/UpdateProductService";

class UpdateProductController {
    async handle(request: Request, response: Response) {
        const { name, price, category_id, image_link } = request.body;
        const { id } = request.params;

        const updateProductService = new UpdateProductService();
        const product = await updateProductService.execute({ id, name, price, category_id, image_link });

        if (product instanceof Error) {
            return response.status(400).json(product.message);
        }

        return response.json(product);
    }
}

export { UpdateProductController }