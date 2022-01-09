import { getCustomRepository, In, ILike } from "typeorm";
import { ProductRepository } from "../repository/ProductRepository";

interface IListProductsService {
    name: string;
    categories: string[];
}

class ListProductsService {
    async execute({ categories, name }: IListProductsService) {
        const productsRepository = getCustomRepository(ProductRepository);
         
        const allProducts = await productsRepository.find({
            where: {
                category_id: In(categories || []),
                name: ILike(name ? `${name}%` : "%"),
            }
        });
        return allProducts
    }
}

export { ListProductsService }
