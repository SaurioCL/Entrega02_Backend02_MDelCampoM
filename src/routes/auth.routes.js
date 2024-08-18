import { Router } from "express";
import { userModel } from "../daos/mongodb/models/userModel.js";
import { welcomeEmail } from "../services/mail.service.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { authDto } from "../dtos/auth.dto.js";
import { userDto } from "../dtos/user.dto.js";
import { generateToken } from "../utils/jwt.js";
import passport from "passport";

const router =  Router();

router.post(
  "/login",
  validate(authDto),
  passport.authenticate("login", { session: false }),
  async (req, res) => {
    try {
      const payload = {
        email: req.user.email,
        role: req.user.role,
      };

      const token = generateToken(payload);

      res.cookie("token", token, {
        maxAge: 100000,
        httpOnly: true,
      });

      res.status(200).json({
        message: "Sesión iniciada",
        token,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al iniciar sesión", details: error.message });
    }
  }
);

router.post(
  "/register",
  validate(userDto),
  passport.authenticate("register", { session: false }),
  async (req, res) => {
    try {
      console.log("Usuario registrado:", req.user); // Verifica que req.user está definido

      if (!req.user || !req.user.email) {
        return res.status(500).json({ error: "No se pudo obtener el email del usuario." });
      }

      await welcomeEmail(req.user.email);

      res.status(201).json({
        message: "Usuario registrado",
        user: req.user,
      });
    } catch (error) {
      console.error("Error en la ruta de registro:", error); // Más detalles del error
      res
        .status(500)
        .json({ error: "Error al registrar", details: error.message });
    }
  }
);

router.get("/current", passport.authenticate("jwt"), async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener el usuario", details: error.message });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Sesión cerrada",
  });
});

export default router;
