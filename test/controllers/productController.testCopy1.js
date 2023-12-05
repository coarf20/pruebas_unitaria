const chai = require('chai');
const sinon = require('sinon');
const rewire = require('rewire');
// Importa chai-datetime si lo necesitas
const expect = chai.expect;

const productController = rewire('../../src/controllers/productController');


describe('Product Controller', () => {
  // Simular la actualización sin afectar la base de datos
  beforeEach(() => {
    const updateProductStub = sinon.stub();
    updateProductStub.returns(Promise.resolve({
      id: 1,
      nombre: 'Product 1 Updated',
      descripcion: 'descripcion updated',
      precio: 10,
      cantidad: 5,
      message: 'Product updated successfully',
    }));

    // Reemplazar la función de actualización en el controlador con el stub
    productController.__set__('updateProduct', updateProductStub);
  });

  it('should update an existing product', async () => {
    const productoActualizado = {
      nombre: 'Product 1 Updated',
      descripcion: 'descripcion updated',
      precio: 10,
      cantidad: 5,
    };

    const req = {
      params: { id: 1 },
      body: productoActualizado,
    };
    const res = {
      status: (statusCode) => ({
        json: (data) => {
          // Verificar el código de estado y la respuesta JSON
          expect(statusCode).to.equal(200);
          // Verificar que la respuesta coincide con los datos simulados
          // Verificar que la respuesta coincide con los datos simulados
          const expectedResponse = {
            id: 1,
            nombre: 'Product 1 Updated',
            descripcion: 'descripcion updated',
            precio: 10,
            cantidad: 5,
            message: 'Product updated successfully',
          };
          expect(data).to.deep.equal(expectedResponse);
          // Verificar que el mensaje en la respuesta coincida con el esperado
          expect(data.message).to.equal(expectedResponse.message);
        },
      }),
    };

    // Llamar a la función del controlador (que ahora está simulada)
    await productController.updateProduct(req, res);
  });
});
