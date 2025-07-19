// Parse URL parameters
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Fetch product data (in a real app, this would be an API call)
function fetchProductData(productId) {
  const products = {
    1: {
      id: 1,
      name: "Cashmere Overshirt",
      price: 795,
      description: "Crafted from the finest Mongolian cashmere...",
      images: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3..."
      ],
      variants: {
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["#e8e0d5", "#3a3a3a", "#5a3921"]
      }
    },
    // Add other products
  };
  return products[productId];
}

// Populate the product page
function renderProductPage() {
  const productId = getProductIdFromURL();
  const product = fetchProductData(productId);
  
  if (!product) {
    window.location.href = '/404.html';
    return;
  }

  // Update page elements
  document.title = `${product.name} | Éclat`;
  document.querySelector('.product-title').textContent = product.name;
  document.querySelector('.product-price').textContent = `$${product.price}`;
  document.querySelector('.product-description').textContent = product.description;
  
  // Update 3D viewer color
  if (window.productMesh) {
    window.productMesh.material.color.setStyle(product.variants.colors[0]);
  }
  
  // Update image gallery
  const gallery = document.querySelector('.product-image-container');
  gallery.innerHTML = product.images.map(img => 
    `<img src="${img}" alt="${product.name}" class="product-image">`
  ).join('');
  
  // Update size options
  const sizeOptions = document.querySelector('.size-options');
  sizeOptions.innerHTML = product.variants.sizes.map(size => 
    `<div class="size-option ${size === 'M' ? 'selected' : ''}">${size}</div>`
  ).join('');
  
  // Update color options
  const colorOptions = document.querySelector('.color-options');
  colorOptions.innerHTML = product.variants.colors.map((color, i) => 
    `<div class="color-option ${i === 0 ? 'selected' : ''}" style="background-color: ${color};" data-color="${['Cream','Charcoal','Cognac'][i]}"></div>`
  ).join('');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', renderProductPage);