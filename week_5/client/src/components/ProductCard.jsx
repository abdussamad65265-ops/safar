import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> Rs. {product.price}</p>
      <Link to={`/product/${product._id}`} className="btn">
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;
