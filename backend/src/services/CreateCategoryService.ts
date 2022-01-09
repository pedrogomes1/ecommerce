import { getCustomRepository } from "typeorm";
import { CategoryRepository } from "../repository/CategoryRepository";

interface ICreateCategory {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: ICreateCategory) {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const categoryAlreadyExists = await categoryRepository.findOne({
      name
    })

    if (categoryAlreadyExists) {
      throw new Error("There is already a category with this name")
    }

    if (!name) {
      throw new Error("Please, enter a name")
    }
    const newCategory = categoryRepository.create({ name })

    await categoryRepository.save(newCategory);

    return newCategory;
  }
}

export { CreateCategoryService }