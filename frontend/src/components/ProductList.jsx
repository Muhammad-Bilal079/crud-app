import React from 'react';
import axios from 'axios';

const ProductList = ({ products, fetchProducts, setEditProduct }) => {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded shadow">
          {product.image && <img src={product.image} alt={product.name} className="h-32 object-cover mb-2" />}
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p>💰 {product.price}</p>
          <p>📄 {product.description}</p>
          <p>📁 {product.category}</p>
          <div className="mt-2 space-x-2">
            <button onClick={() => setEditProduct(product)} className="bg-yellow-400 px-3 py-1">Edit</button>
            <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-3 py-1">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
