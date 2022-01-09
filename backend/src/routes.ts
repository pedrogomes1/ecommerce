import { Router, Request, Response } from "express";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { ListMessageController } from "./controllers/ListMessageController";
import { ListCategoriesController } from "./controllers/ListCategoriesController";
import { CreateCategoryController } from "./controllers/CreateCategoryController";
import { UpdateCategoryController } from "./controllers/UpdateCategoryController";
import { DeleteCategoryController } from "./controllers/DeleteCategoryController";
import { ListProductsController } from "./controllers/ListProductsController";
import { CreateProductController } from "./controllers/CreateProductController";
import { UpdateProductController } from "./controllers/UpdateProductController";
import { DeleteProductController } from "./controllers/DeleteProductController";

const router = Router();

const createMessageController = new CreateMessageController();
const listMessageController = new ListMessageController();

const listCategoriesController = new ListCategoriesController();
const createCategoryController = new CreateCategoryController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

const listProductController = new ListProductsController();
const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();


router.get('/', (request: Request, response: Response) => {
    return response.json({message: 'Bem vindo a API Dio Shopping'})
})

router.get('/message', listMessageController.handle)
router.post('/message', createMessageController.handle)

router.get('/category', listCategoriesController.handle)
router.post('/category', createCategoryController.handle)
router.put('/category/:id', updateCategoryController.handle)
router.delete('/category/:id', deleteCategoryController.handle)

router.get('/product', listProductController.handle)
router.post('/product', createProductController.handle)
router.put('/product/:id', updateProductController.handle)
router.delete('/product/:id', deleteProductController.handle)

export { router }
