import { Router } from 'express';
import { productModel } from '../daos/mongodb/models/productModel.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { productDto } from '../dtos/products.dto.js';
import { authorizations } from '../middlewares/authorizationMiddleware.js';

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los productos",
      details: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener el producto", details: error.message });
  }
});

router.post(
  "/",
  authorizations(["admin"]),
  validate(productDto),
  async (req, res) => {
    try {
      const { name, description, price, image } = req.body;

      const product = await productModel.create({
        name,
        description,
        price,
        image,
      });

      res.status(201).json(product);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al crear el producto", details: error.message });
    }
  }
);

// router.put("/:id", controller.update);
// router.delete("/:id", controller.remove);

export default router;
