import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [
                ['price', 'DESC']
            ],
            attributes: { exclude: ['createdAt', 'updatedAt', 'availability'] }
        });
        res.json({ data: products })
    } catch (error) {
        console.log(error);
        res.json({ error: error })
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt', 'availability'] }
        });

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado!' });
        }

        res.json({ data: product })
    } catch (error) {
        console.log(error);
        res.status(400).json({ error })
    }
};

export const createProducts = async (req: Request, res: Response) => {

    // Validar desde el handler
    // await check('name')
    //     .isString()
    //     .notEmpty()
    //     .withMessage('El nombre del producto no puede estar vació')
    //     .run(req);
    // await check('price')
    //     .isNumeric()
    //     .notEmpty()
    //     .withMessage('El precio del producto no puede estar vació')
    //     .run(req);
    // Opción en el handlers, se puede mover esta validacion a un middleware
    // let errors = validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(400).json({ errors: errors.array() });
    // }
    try {
        const product = await Product.create(req.body);
        res.json({ data: product })
    } catch (error) {
        console.log(error);
        res.json({ error: error })
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({
            error: "Producto no encontrado"
        });
    }

    await product.update(req.body);
    await product.save();

    res.json({ data: product })
};

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({
            error: "Producto no encontrado"
        });
    }
    const { availability } = req.body;

    product.availability = availability;
    await product.save();

    res.json({ data: product })
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({
            error: "Producto no encontrado"
        });
    }

    await product.destroy();

    res.json({ data: "Eliminado!" })
};