import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axios";
import { CartContext } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/api/products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Loading product...</div>;
  }

  if (!product) {
    return <h2 className="text-center mt-10">Product not found!</h2>;
  }

  return (
    <div className="container mx-auto p-6 flex gap-10">
      {/* Product Image */}
      <div className="w-96 h-96 bg-gray-100 flex items-center justify-center overflow-hidden rounded-lg shadow-md">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>

      {/* Product Information */}
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl text-gray-700 mt-4">
          Price: ${product.price}
        </p>
        <p className="text-gray-600 mt-4">{product.description}</p>
        <p className="text-sm text-gray-500 mt-2">Stock: {product.stock}</p>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 duration-200"
        >
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;