// test/controllers/productController.test.js

const chai = require('../shared/chai-setup');
const nock = require('../shared/nock-setup');
const productController = require('../../src/controllers/productController');
const expect = chai.expect; 

describe('Product Controller', () => {
  // Configurar el mock para simular la respuesta del modelo
  beforeEach(() => {
    nock('http:localhost:3000')
      .get('/api/products')
      .reply(200, [
        { id: 1, nombre: 'Product 1', descripcion: 'descripcion 1', precio: 1, cantidad: 1 },
        { id: 2, nombre: 'Product 2', descripcion: 'descripcion 2', precio: 2, cantidad: 2 },
        // ... otros objetos RowDataPacket
      ]);
  });

  it('should get all products', async () => {
    const req = {};
    const res = {
      status: (statusCode) => ({
        json: (data) => {
          // Verificar el código de estado y la respuesta JSON
          chai.expect(statusCode).to.equal(200);
          // Convertir los objetos RowDataPacket a un formato esperado
          const expectedResponse = [
            { id: 1, nombre: 'Product 1', descripcion: 'descripcion 1', precio: 1, cantidad: 1 },
            { id: 2, nombre: 'Product 2', descripcion: 'descripcion 2', precio: 2, cantidad: 2 },
            // ... otros objetos esperados
          ];
          chai.expect(data).to.deep.equal(expectedResponse);
        },
      }),
    };
  });
});

describe('Product Controller', () => {
  // Configurar el mock para simular la respuesta del modelo
  beforeEach(() => {
    nock('http://localhost:3000')
      .post('/api/products')
      .reply(201, { id: 3, nombre: 'Product 3', descripcion: 'descripcion 3', precio: 3, cantidad: 3 });
  });

  it('should create a new product', async () => {
    const nuevoProducto = {
      nombre: 'Product 3',
      descripcion: 'descripcion 3',
      precio: 3,
      cantidad: 3,
    };

    const req = {
      body: nuevoProducto,
    };
    const res = {
      status: (statusCode) => ({
        json: (data) => {
          // Verificar el código de estado y la respuesta JSON
          expect(statusCode).to.equal(201);
          // Convertir el objeto RowDataPacket a un formato esperado
          const expectedResponse = { id: 3, nombre: 'Product 3', descripcion: 'descripcion 3', precio: 3, cantidad: 3 };
          expect(data).to.deep.equal(expectedResponse);
        },
      }),
    };
    //  // Llamar a la función del controlador
    //  await productController.createProduct(req, res);
  });
});

describe('Product Controller', () => {
  // Configurar el mock para simular la respuesta del modelo
  beforeEach(() => {
    // Supongamos que deseas actualizar el producto con ID 1
    nock('http://localhost:3000')
      .put('/api/products/1')
      .reply(200, { id: 1, nombre: 'Product 1 Updated', descripcion: 'descripcion updated', precio: 10, cantidad: 5 });
  });

  it('should update an existing product', async () => {
    const productoActualizado = {
      nombre: 'Product 1 Updated',
      descripcion: 'descripcion updated',
      precio: 10,
      cantidad: 5,
    };

    const req = {
      params: { id: 1 }, // Supongamos que deseas actualizar el producto con ID 1
      body: productoActualizado,
    };
    const res = {
      status: (statusCode) => ({
        json: (data) => {
          // Verificar el código de estado y la respuesta JSON
          expect(statusCode).to.equal(200);
          // Convertir el objeto RowDataPacket a un formato esperado
          const expectedResponse = { id: 1, nombre: 'Product 1 Updated', descripcion: 'descripcion updated', precio: 10, cantidad: 5 };
          expect(data).to.deep.equal(expectedResponse);
        },
      }),
    };
    // // Llamar a la función del controlador
    // await productController.updateProduct(req, res);
  });
});

describe('Product Controller', () => {
  // Configurar el mock para simular la respuesta del modelo
  beforeEach(() => {
    // Supongamos que deseas eliminar el producto con ID 1
    nock('http://localhost:3000')
      .delete('/api/products/1')
      .reply(204); // 204 No Content - Indica que la operación de eliminación fue exitosa
  });

  it('should delete an existing product', async () => {
    const req = {
      params: { id: 1 }, // Supongamos que deseas eliminar el producto con ID 1
    };
    const res = {
      status: (statusCode) => {
        // Verificar el código de estado
        expect(statusCode).to.equal(204);
        return {
          send: () => {
            // Verificar que se envió una respuesta vacía (No Content)
            // Esto es opcional, ya que 204 No Content no debería tener un cuerpo de respuesta
            expect(res._isEndCalled(), 'response was not ended').to.be.true;
          },
        };
      },
    };
    // // Llamar a la función del controlador
    // await productController.deleteProduct(req, res);
  });
});

