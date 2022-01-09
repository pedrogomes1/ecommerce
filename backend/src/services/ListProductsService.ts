import { getCustomRepository, In } from "typeorm";
import { ProductRepository } from "../repository/ProductRepository";

interface IListProductsService {
    categories: string[];
}

class ListProductsService {
    async execute({ categories }: IListProductsService) {
        const productsRepository = getCustomRepository(ProductRepository);

        const allProducts = await productsRepository.find({
            where: {
                category_id: In(categories || []),
            }
        });
        return allProducts
    }
}

export { ListProductsService }
