import { EntityRepository, Repository } from "typeorm";
import { Products } from "../entities/Products";

@EntityRepository(Products)
class ProductRepository extends Repository<Products> {}

export { ProductRepository }