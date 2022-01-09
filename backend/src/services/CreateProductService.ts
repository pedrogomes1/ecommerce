import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../repository/ProductRepository";
import { CategoryRepository } from "../repository/CategoryRepository";

interface ICreateProduct {
  category_id: string;
  name: string;
  image_link: string;
  price: number;
}

class CreateProductService {
  async execute({ category_id, name, image_link, price }: ICreateProduct) {
    const productRepository = getCustomRepository(ProductRepository);
    const categoryRepository = getCustomRepository(CategoryRepository);

    const categoryExists = await categoryRepository.findOne(category_id)
    
    if (!categoryExists) {
      throw new Error("Categories does not exists")
    }

    const newProduct = productRepository.create({ name, image_link, price, category_id })

    await productRepository.save(newProduct);

    return newProduct;
  }
}

export { CreateProductService }