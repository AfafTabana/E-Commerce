const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

fetch('../jsonformatter.json')
  .then(res => res.json())
  .then(data => {
    const product = data.products.find(p => p.id == productId);
    if (product) {
      displayProductDetails(product);
    }
  });

function displayProductDetails(p) {
  const container = document.getElementsByClassName("product-page")[0];
  container.innerHTML = `
    <img src="${p.images[0]}" alt="${p.title}">
    <div class="product-info">
      <h1>${p.title}</h1>
      <p>${p.description}</p>
      <p class="price">$${p.price}</p>
      <p><strong>Category:</strong> ${p.category}</p>
      <p><strong>Rating:</strong> ${p.rating}</p>
      <p><strong>Brand:</strong> ${p.brand}</p>
      <p><strong>Stock:</strong> ${p.stock}</p>
      <div class="quantity-container">
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" min="1" value="1">
      </div>

      <button class="add-to-cart-btn">Add To Cart</button>
    </div>
  `;


  const addToCartButton = container.querySelector('.add-to-cart-btn');
  const quantityInput = container.querySelector("#quantity");
  

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }
  
  addToCartButton.addEventListener("click", function (e) {
    e.preventDefault();
  

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    const exists = cart.some(item => item.id === p.id);
    if (exists) {
      showToast("This item is already in your cart.");
      return; 
    }
  
 
    const quantityValue = quantityInput.value;
    cart.push({
      id:       p.id,
      title:    p.title,
      unitPrice: p.price,
      quantity: quantityValue
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  
 
    window.location.href = "Cart.html";
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const userIcon = document.getElementById("user-icon");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser && userIcon) {
    userIcon.textContent = currentUser.name;
  }
});