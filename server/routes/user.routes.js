import express from "express";

import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/users.controller.js";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/").post(createUser);
router.route("/:id").get(getUserById);

export default router;
