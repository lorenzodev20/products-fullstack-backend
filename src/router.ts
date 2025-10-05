import { Router } from 'express';
import { createProducts, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/products';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middleware';

const router = Router();
// Routing
router.get('/', getProducts);

router.get('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductById
);

router.post('/',
    body('name')
        .isString()
        .notEmpty()
        .withMessage('El nombre del producto no puede estar vació'),
    body('price')
        .isNumeric()
        .notEmpty()
        .withMessage('El precio del producto no puede estar vació'),
    handleInputErrors,
    createProducts
);

router.put('/:id',
    param('id')
        .isInt()
        .withMessage("El id es obligatorio")
        .notEmpty()
        .withMessage("El id es obligatorio"),
    handleInputErrors,
    updateProduct
);

router.put('/:id',
    param('id')
        .isInt()
        .withMessage("El id es obligatorio")
        .notEmpty()
        .withMessage("El id es obligatorio"),
    handleInputErrors,
    updateAvailability
);

router.delete('/:id',
    param('id')
        .isInt()
        .withMessage("El id es obligatorio")
        .notEmpty()
        .withMessage("El id es obligatorio"),
    handleInputErrors,
    deleteProduct
);


export default router;