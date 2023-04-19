import express from "express";

import {
  getAllProperties,
  createProperty,
  deleteProperty,
  updateProperty,
  getPropertyDetails,
} from "../controllers/property.controller.js";

const router = express.Router();

router.route("/").get(getAllProperties);
router.route("/").post(createProperty);
router.route("/:id").get(getPropertyDetails);
router.route("/:id").delete(deleteProperty);
router.route("/:id").patch(updateProperty);

export default router;
