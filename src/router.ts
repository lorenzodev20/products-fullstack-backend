import { Router } from 'express';
import { createProducts, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/products';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middleware';

// Routing
const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The product name
 *                  example: Monitor curvo
 *              price:
 *                  type: number
 *                  description: The product price
 *                  example: 300
 *              availability:
 *                  type: boolean
 *                  description: The product availability
 *                  example: true
 *                  
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *      summary: get a list of products
 *      description: This a description of products list
 *      tags:
 *          - Products
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          require: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Invalid request
*/
router.get('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new Product
 *      tags:
 *         - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor curvo"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Resource created
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Invalid request
 */
router.post('/',
    body('name')
        .isString()
        .notEmpty()
        .withMessage('El nombre del producto no puede estar vació'),
    body('price')
        .isNumeric()
        .notEmpty()
        .withMessage('El precio del producto no puede estar vació y debe ser numérico')
        .custom(value => value > 0)
        .withMessage('El precio del producto no puede ser 0'),
    handleInputErrors,
    createProducts
);
/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor curvo"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *          404:
 *              description: Product not found
 * 
 */
router.put('/:id',
    param('id')
        .isInt()
        .withMessage("El id es obligatorio")
        .notEmpty()
        .withMessage("El id es obligatorio"),
    body('name')
        .isString()
        .notEmpty()
        .withMessage('El nombre del producto no puede estar vació'),
    body('price')
        .isNumeric()
        .notEmpty()
        .withMessage('El precio del producto no puede estar vació y debe ser numérico')
        .custom(value => value > 0)
        .withMessage('El precio del producto no puede ser 0'),
    handleInputErrors,
    updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *          404:
 *              description: Product not found
 */
router.patch('/:id',
    param('id')
        .isInt()
        .withMessage("El id es obligatorio")
        .notEmpty()
        .withMessage("El id es obligatorio"),
    handleInputErrors,
    updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
*      responses:
 *          200:
 *              description: Producto eliminado!
 *          404:
 *              description: Producto no encontrado!
 */
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