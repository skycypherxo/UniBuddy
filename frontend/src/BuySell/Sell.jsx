import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Sell = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: '',
    file: null,
    description: '',
    originalPrice: '',
    resellingPrice: '',
    category: '',
  });
  
  
  function handleChange(e) {
    const { name, value, files } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('file', productData.file);
    formData.append('description', productData.description);
    formData.append('originalPrice', productData.originalPrice);
    formData.append('resellingPrice', productData.resellingPrice);
    formData.append('category', productData.category);

    try {
      console.log(productData);
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.post('http://localhost:3000/api/products/create' ,  formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials : true
      });
      console.log(response.status);
      if(response.status == 201){
      alert('Product listed successfully');
      navigate('/products');
      }

    } catch (error) {
      console.error('Error listing product', error);
    }
  }


return (
  <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-blue-100 to-purple-100 shadow-lg rounded-2xl">
    <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Sell Your Item</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={productData.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the item title"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="file">Upload Image</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={productData.category}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select a category</option>
          <option value="electronics">Electronics</option>
          <option value="FE">FE</option>
          <option value="SE">SE</option>
          <option value="TE">TE</option>
          <option value="BE">BE</option>
          <option value="EG">EG</option>
          <option value="Workshop">Workshop</option>
          <option value="Competitive Exams">Competitive Exams</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="description">Short Description</label>
        <textarea
          id="description"
          name="description"
          value={productData.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          placeholder="Enter a short description"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="originalPrice">Original Price</label>
          <input
            type="number"
            id="originalPrice"
            name="originalPrice"
            value={productData.originalPrice}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="₹"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="resellingPrice">Reselling Price</label>
          <input
            type="number"
            id="resellingPrice"
            name="resellingPrice"
            value={productData.resellingPrice}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="₹"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-600 transition duration-200 transform hover:scale-105"
      >
        Submit
      </button>
    </form>
  </div>
);
}

export default Sell;
