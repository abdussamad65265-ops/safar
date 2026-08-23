import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };

    getProduct();
  }, [id]);

  if (!product) return <p className="loading">Loading...</p>;

  return (
    <div className="container">
      <div className="details-card">
        <img src={product.image} alt={product.name} className="details-image" />
        <div>
          <h2>{product.name}</h2>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> Rs. {product.price}</p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
