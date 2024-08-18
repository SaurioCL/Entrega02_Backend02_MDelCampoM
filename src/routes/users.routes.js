import { Router } from 'express';
import { userModel } from '../daos/mongodb/models/userModel.js';
// import { createHash } from '../utils/hash.js';
// import { authorize } from '../middlewares/authMiddleware.js';
// import * as controller from '../controllers/usersControllers.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});

router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener el usuario", details: error.message });
    }
  });
  
// router.post("/", authorize, async (req, res) => {
//     const { first_name, last_name, email, age, password } = req.body;

//     if (!first_name ||!last_name ||!email ||!age ||!password) {
//         return res.status(400).json({ error: "Faltan datos obligatorios" });
//     }

//     try {
//         const hashPassword = await createHash(password);

//         const user = await userModel.create({
//             first_name,
//             last_name,
//             email,
//             age,
//             password: hashPassword,
//         })

//         res.status(201).json(user);
//     }catch (error) {
//         res.status(500).json({ error: "Error al crear el usuario", details: error.message });
//     }
// });
    

// router.get('/all', controller.getAll);

// router.get('/:id', controller.getById);

// router.post('/', controller.create);

// router.put('/:id', controller.update);

// router.delete('/:id', controller.remove);

export default router;
