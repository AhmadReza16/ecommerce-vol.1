import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // backend ممکنه image_url یا image برگشت بده، هر دو رو ساپورت می‌کنیم
  const imgSrc = product.image || product.image_url || "";

  return (
    <Link to={`/product/${product.slug}`} className="block">
      <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition h-full flex flex-col">
        <div className="h-40 w-full mb-4 bg-gray-100 flex items-center justify-center overflow-hidden rounded">
          {imgSrc ? (
            // imgSrc ممکنه relative ("/media/...") باشه، مرورگر اون رو کامل می‌کنه اگر بک‌اند درست کانفیگ شده باشه
            <img
              src={imgSrc}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="text-gray-400">No image</div>
          )}
        </div>

        <h2 className="text-lg font-bold mb-1">{product.name}</h2>
        <p className="text-gray-600 mb-3">${product.price}</p>
        <div className="mt-auto">
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
