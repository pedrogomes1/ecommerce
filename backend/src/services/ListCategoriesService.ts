import { getCustomRepository } from "typeorm";
import { CategoryRepository } from "../repository/CategoryRepository";

class ListCategoriesService {
    async execute() {
        const categoriesRepository = getCustomRepository(CategoryRepository);

        const allCategories = await categoriesRepository.find();

        return allCategories
    }
}

export { ListCategoriesService }
