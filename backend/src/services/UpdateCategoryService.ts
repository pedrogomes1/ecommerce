import { getCustomRepository } from "typeorm";
import { CategoryRepository } from "../repository/CategoryRepository";

interface IUpdateCategory {
  id: string;
  name: string;
}

class UpdateCategoryService {
  async execute({ id, name }: IUpdateCategory) {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const category = await categoryRepository.findOne(id)

    if (!category) {
      return new Error("Category does not exists")
    }

    category.name = name || category.name;

    await categoryRepository.save(category);

    return category;
  }
}

export { UpdateCategoryService }