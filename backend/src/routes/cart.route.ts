import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cart.controller";
import { authenticate } from "../middleware/auth";

const router = express.Router();

// get cart -->
router.get("/",authenticate, getCart)

//add item to cart -->
router.post("/",authenticate, addToCart);

// update my cart -->
router.put("/:itemId",authenticate, updateCartItem)

// delete from cart -->
router.delete("/:itemId",authenticate, removeCartItem);

export default router;
