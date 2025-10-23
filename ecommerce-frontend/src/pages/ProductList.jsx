import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    axiosInstance
      .get("/api/products/")
      .then((res) => {
        if (mounted) setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading)
    return <div className="p-6 text-center">Loading products...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div>No products found.</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
