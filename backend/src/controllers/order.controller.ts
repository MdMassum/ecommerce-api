import { Request, Response, NextFunction } from "express";
import { Order } from "../models/order.model";
import { Cart } from "../models/cart.model";
import { IProduct, Product } from "../models/product.model";
import ErrorHandler from "../utils/errorHandler";

// Create order from cart (Customer)
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return next(new ErrorHandler("Your cart is empty", 400));
    }

    const orderItems = cart.items.map((item) => {
      const product = item.product as IProduct;
      return {
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      };
    });

    const totalAmount = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
    });

    // Reduce stock
    for (const item of cart.items) {
      const product = await Product.findById((item.product as IProduct)._id);
      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }
    }

    // Clear cart safely
    cart.items.splice(0, cart.items.length);
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};


// Get logged-in user's orders
export const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate("items.product");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error",500));
  }
};

// Get all orders (Admin only)
export const getAllOrders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("items.product");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error",500));
  }
};

// Update order status (Admin)
export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    order.status = status || order.status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    next(error);
  }
};
