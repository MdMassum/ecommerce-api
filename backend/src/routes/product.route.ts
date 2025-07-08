import express from 'express';
import { authenticate, authorizeRoles } from '../middleware/auth';
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from '../controllers/product.controller';


const router = express.Router();

// create product --> Admin access
router.post('/new',authenticate,authorizeRoles("admin"),createProduct)

// get single Product details
router.get('/:id',getProductDetails);

// getting all products
router.get('/',getAllProducts);

// update the product  -- Admin
router.put('/:id',authenticate,authorizeRoles("admin"),updateProduct);

// delete the product -- Admin
router.delete('/:id',authenticate,authorizeRoles("admin"),deleteProduct);


export default router