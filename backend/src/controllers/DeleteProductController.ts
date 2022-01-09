import { Request, Response } from "express";
import { DeleteProductService } from "../services/DeleteProductService";

class DeleteProductController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const deleteProductService = new DeleteProductService();
        const product = await deleteProductService.execute({ id });

        if (product instanceof Error) {
            return response.status(400).json(product.message);
        }

        return response.status(204).end();
    }
}

export { DeleteProductController }