import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../repository/ProductRepository";

interface IDeleteProduct {
  id: string;
}

class DeleteProductService {
  async execute({ id }: IDeleteProduct) {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id)

    if (!product) {
      return new Error("Product does not exists")
    }

    await productRepository.delete(id);

    return product;
  }
}

export { DeleteProductService }