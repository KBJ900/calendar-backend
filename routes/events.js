//  Route:
//  /api/events
const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/fields-validate");
const { isDate } = require("../helpers/isDate");
const router = Router();

// Todas tienen que pasar por la validación del JWT
router.use(validateJWT);

// Obtener eventos
router.get("/", getEvents);

// Crear un nuevo evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatorio").custom(isDate),
    check("end", "Fecha de finalización es obligatorio").custom(isDate),
    validateFields,
  ],
  createEvent
);

// Actualizar evento
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatorio").custom(isDate),
    check("end", "Fecha de finalización es obligatorio").custom(isDate),
    validateFields,
  ],
  updateEvent
);

// Borrar evento
router.delete("/:id", deleteEvent);

module.exports = router;
