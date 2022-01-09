import { getCustomRepository } from "typeorm";
import { CategoryRepository } from "../repository/CategoryRepository";

interface IDeleteCategory {
  id: string;
}

class DeleteCategoryService {
  async execute({ id }: IDeleteCategory) {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const category = await categoryRepository.findOne(id)

    if (!category) {
      return new Error("Category does not exists")
    }

    await categoryRepository.delete(id);

    return category;
  }
}

export { DeleteCategoryService }