import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

const App = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product CRUD</h1>
      <ProductForm fetchProducts={fetchProducts} editProduct={editProduct} setEditProduct={setEditProduct} />
      <ProductList products={products} fetchProducts={fetchProducts} setEditProduct={setEditProduct} />
    </div>
  );
};

export default App;
