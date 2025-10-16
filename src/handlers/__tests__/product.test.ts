import request from "supertest";
import server from "../../server";

describe('POST /api/products', () => {

    it('should display validation errors', async () => {
        const response = await request(server)
            .post('/api/products')
            .send();
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');

        expect(response.status).not.toBe(200);
        expect(response.status).not.toBe(404);
    });

    it('should create new product', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({
                name: "Product - testing",
                price: 50
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(200);
    });

    it('should validate that price is greater than 0', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({
                name: "Product - testing",
                price: 0
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');

        expect(response.status).not.toBe(200);
        expect(response.status).not.toBe(404);
    });

});

describe('GET /api/products', () => {

    it('should check if /api/products exists', async () => {

        const response = await request(server).get('/api/products');

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('errors');

    });

    it('GET a JSON response with products', async () => {

        const response = await request(server).get('/api/products');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('errors');

    });
});

describe('GET /api/products/:id', () => {

    it('Should return a 404 response for a non-existent product', async () => {
        const productId = 2000;
        const response = await request(server).get(`/api/products/${productId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado!')
    });

    it('should check a valid ID in the URL', async () => {
        const response = await request(server).get(`/api/products/not-valid-url`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('ID no válido');
    });
});

describe('PUT /api/products/:id', () => {
    it('should display validation error message when upgrading a product', async () => {
        const response = await request(server).put('/api/products/1').send();

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(5);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    it('should validate that the price is greater than 0', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: "Monitor curvo",
            availability: true,
            price: 0
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('El precio del producto no puede ser 0');
    });

    it('should validate if ID exists in URL', async () => {
        const response = await request(server).put('/api/products/not-valid-url').send({
            name: "Monitor curvo",
            availability: true,
            price: 300
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('El id es obligatorio');
    });

    it('should validate if Product not exists', async () => {
        const response = await request(server).put('/api/products/3000').send({
            name: "Monitor curvo",
            availability: true,
            price: 300
        });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado!')
    });
});

describe('DELETE /api/products/:id', () => {

    it('Should return a 404 response for a non-existent product', async () => {
        const productId = 2000;
        const response = await request(server).delete(`/api/products/${productId}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Producto no encontrado!");
        expect(response.status).not.toBe(200);
    });

    it('Should delete a product', async () => {
        const productId = 1;
        const response = await request(server).delete(`/api/products/${productId}`);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("Producto Eliminado!");
        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(400);
    });
});

describe('PATCH /api/products/:id', () => {
    it('should return 404 response for a non-existing product', async () => {
        const productId = 2000;
        const response = await request(server).patch(`/api/products/${productId}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Producto no encontrado!');
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });
});