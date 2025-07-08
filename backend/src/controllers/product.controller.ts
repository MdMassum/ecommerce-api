import { NextFunction, Request, Response } from "express"
import { Product } from "../models/product.model";
import ApiFeatures from "../utils/apiFeatures";
import ErrorHandler from "../utils/errorHandler";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.userId;
      const { name, description, price, stock, category } = req.body;
  
      if (!name || !description || !price) {
        res.status(400).json({
          success: false,
          message: "All fields are required.",
        });
        return;
      }
  
      const product = await Product.create({ name, description, price, user, stock, category });
  
      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler("Internal Server Error",500));
    }
};

// for getting all products
export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resultPerPage = 40;
      const productCount = await Product.countDocuments();
  
      const apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
  
      const products = await apiFeatures.query;
  
      res.status(200).json({
        success: true,
        products,
        productCount,
      });
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error",500));
    }
};


// Get product details
export const getProductDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
      }
  
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error",500));
    }
  };

// for updating the product - Admin -->
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let product = await Product.findById(req.params.id);
  
      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });
        return;
      }
  
      product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
  
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error",500));
    }
  };

// Delete the product - Admin -->
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });
        return;
      }
  
      await product.deleteOne();
  
      res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
      });
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error",500));
    }
  };