import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../repository/ProductRepository";

interface IUpdateProduct {
  id: string;
  name: string;
  price: number;
  category_id: string;
  image_link: string;
}

class UpdateProductService {
  async execute({ id, name, price, category_id, image_link }: IUpdateProduct) {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id)

    if (!product) {
      return new Error("Product does not exists")
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.category_id = category_id || product.category_id;
    product.image_link = image_link || product.image_link;

    await productRepository.save(product);

    return product;
  }
}

export { UpdateProductService }