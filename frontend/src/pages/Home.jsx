import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { productsAPI, categoriesAPI } from "../services/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsResponse, categoriesResponse] = await Promise.all([
          productsAPI.getAll(),
          categoriesAPI.getAll(),
        ]);
        setProducts(productsResponse.data.results || productsResponse.data);
        setCategories(
          categoriesResponse.data.results || categoriesResponse.data
        );
      } catch (err) {
        setError("Error loading data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Error loading
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gray-400 from-primary-600 to-primary-800 rounded-lg p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-4"> Welcome to our store</h1>
        <p className="text-xl opacity-90 mb-6">
          The best products with high quality and reasonable prices
        </p>
        <button className="bg-gray-800 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
          Start shopping
        </button>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <h3 className="font-semibold text-gray-900 text-center">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {" "}
          Popular Products
        </h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No products found.
            </h3>
            <p className="text-gray-600">
              There are currently no products available in the store
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
