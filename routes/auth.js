/**
 * Rutas de Usuarios / Auth
 * Host + /api/auth
 */
const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/fields-validate");
const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

router.post(
  "/new",
  [
    // Middlewares Registro
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password Debe de ser al menos de 6 caracteres"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    // Middlewares Login
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password Debe de ser al menos de 6 caracteres"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  loginUser
);
router.get("/renew", validateJWT, renewToken);

module.exports = router;
