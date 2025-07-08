import express from "express";

import { authenticate, authorizeRoles } from "../middleware/auth";
import { createOrder, getAllOrders, getMyOrders, updateOrderStatus } from "../controllers/order.controller";

const router = express.Router();

// create a order -->
router.post("/new",authenticate, createOrder)

// get my orders -->
router.get("/me",authenticate, getMyOrders)

// get all orders (Admin) -->
router.get("/me",authenticate, authorizeRoles("admin"),getAllOrders)

// update order status (Admin) -->
router.put("/:id",authenticate, updateOrderStatus)


export default router;