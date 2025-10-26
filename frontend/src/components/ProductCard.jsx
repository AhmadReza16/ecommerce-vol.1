import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product.id, 1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-HOSSDDG", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="card overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={
            product.image_url ? product.image_url : "/placeholder-product.svg"
          }
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
            <Link
              to={`/product/${product.slug}`}
              className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Eye className="h-4 w-4 text-gray-600" />
            </Link>
            <button
              onClick={handleAddToCart}
              className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {product.category_name}
          </span>
        </div>

        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary-600">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-gray-500">
            Available: {product.stock}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
