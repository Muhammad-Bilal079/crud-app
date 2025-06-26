import React, { useState, useEffect } from 'react';
import axios from 'axios';

const categories = ['Electronics', 'Clothing', 'Food'];

const ProductForm = ({ fetchProducts, editProduct, setEditProduct }) => {
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '', category: '' });

  useEffect(() => {
    if (editProduct) {
      setForm(editProduct);
    }
  }, [editProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editProduct) {
      await axios.put(`http://localhost:5000/api/products/${editProduct._id}`, form);
      setEditProduct(null);
    } else {
      await axios.post('http://localhost:5000/api/products', form);
    }
    setForm({ name: '', price: '', description: '', image: '', category: '' });
    fetchProducts();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border p-2 w-full" required />
      <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="border p-2 w-full" required />
      <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border p-2 w-full" required />
      <input type="text" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="border p-2 w-full" />
      {form.image && <img src={form.image} alt="preview" className="h-24" />}
      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border p-2 w-full" required>
        <option value="">Select Category</option>
        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">{editProduct ? 'Update' : 'Add'} Product</button>
    </form>
  );
};

export default ProductForm;
