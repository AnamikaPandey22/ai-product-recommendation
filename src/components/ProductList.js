import React from "react";

function ProductList({ products }) {

  // 🔹 Improved empty state
  if (!products || products.length === 0) {
    return (
      <div style={{ marginTop: "30px", color: "#666", textAlign: "center" }}>
        😕 No matching products found.
        <br />
        Try adjusting your budget or category.
      </div>
    );
  }

  return (
    <div>

      {/* 🔹 Section heading */}
      <h2 style={{ marginBottom: "15px", textAlign: "center" }}>
        🎯 Top Recommendations
      </h2>

      <div className="products-grid">

        {/* 🔹 Limit to top 3 */}
        {products.slice(0, 3).map((product) => (

          <div key={product.id || product.name} className="product-card">

            <img
              src={product.image || "/placeholder.png"}
              alt={product.name || "Product"}
              className="product-image"
            />

            <div className="product-name">
              {product?.name}
            </div>

            <div className="product-price">
              ${product.price?.toFixed(2)}
            </div>

            <div className="product-category">
              📦 {product?.category}
            </div>

            {product?.rating && (
              <div className="product-rating">
                ⭐ {product.rating}
              </div>
            )}

            {product?.reason && (
              <div className="product-reason">
                ✅ {product.reason}
              </div>
            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default ProductList;