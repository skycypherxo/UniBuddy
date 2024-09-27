

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Buy from './Buy';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/products/get');
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products', error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <h2>Products for Sale</h2>
//       {products.length === 0 ? (
//         <p>No products available</p>
//       ) : (
//         products.map((product) => (
//           <div key={product._id}>
//             <h3>{product.title}</h3>
//             <p>{product.description}</p>
//             <p>Price: ${product.resellingPrice}</p>
//             <Buy product={product} />
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ProductList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Buy from './Buy';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products/get');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  function handleContact(id) {
    const product = products.find((p) => p._id === id);
    alert(`Contacting seller ${product.seller.name} for ${product.title}`);
  }

  // Filter products based on selected category
  const filteredProducts = filter === 'all' ? products : products.filter((p) => p.category === filter);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-100 to-purple-100 shadow-lg rounded-2xl">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Products for Sale</h2>

      <div className="mb-8 flex justify-center">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center col-span-full">No products available</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product._id} className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-2">Category: {product.category}</p>
              <p className="text-gray-600 mb-2">Price: ₹{product.originalPrice}</p>
              <p className="text-gray-600 mb-2">Reselling Price: ₹{product.resellingPrice}</p>
              <p className="text-gray-600 mb-4">{product.description}</p>

             
              <div className="flex justify-between mt-4 space-x-2">
                <button
                  onClick={() => handleContact(product._id)}
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-green-600 transition duration-300"
                >
                  Contact Seller
                </button>

                <Buy product={product} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;

