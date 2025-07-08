import { Request, Response, NextFunction } from "express";
import {Cart} from "../models/cart.model";
import {Product} from "../models/product.model";
import ErrorHandler from "../utils/errorHandler";

// Add or update an item in the cart
export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return next(new ErrorHandler("Product and quantity are required", 400));
    }

    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(item => item.product.toString() === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error",500));
  }
};

// Get cart for logged-in user
export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      res.status(200).json({
        success: true,
        cart: [],
        message: "Cart is empty",
      });
      return;
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error",500));
  }
};

// Update cart item quantity
export const updateCartItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return next(new ErrorHandler("Quantity must be at least 1", 400));
    }

    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) return next(new ErrorHandler("Cart not found", 404));

    const item = cart.items.id(itemId);
    if (!item) return next(new ErrorHandler("Cart item not found", 404));

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart item updated",
      cart,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error",500));
  }
};

//  Remove item from cart
export const removeCartItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { itemId } = req.params;
    const cart = await Cart.findOne({ user: req.userId });

    if (!cart) return next(new ErrorHandler("Cart not found", 404));

    cart.items.pull(itemId); // Remove the item from cart using Mongoose's pull method
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error",500));
  }
};
