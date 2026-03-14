import React from "react";

function ProductList({ products }) {

  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div>

      <div className="products-grid">

        {products.map((product) => (

          <div key={product.id} className="product-card">

            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />

            <div className="product-name">
              {product.name}
            </div>

            <div className="product-price">
              ${product.price}
            </div>

            <div className="product-category">
              {product.category}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ProductList;