document.addEventListener('DOMContentLoaded', () => {
    const cartBody = document.getElementById('cart-body');
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  

    function renderCart() {
      cartBody.innerHTML = '';
  
      if (cart.length === 0) {
        cartBody.innerHTML = `
          <tr>
            <td colspan="4">Your cart is empty.</td>
          </tr>`;
        return;
      }
  
      cart.forEach((item, index) => {
        const lineTotal = item.unitPrice * item.quantity;
        cartBody.insertAdjacentHTML('beforeend', `
          <tr data-index="${index}">
            <td>${item.title}</td>
            <td >$${item.unitPrice}</td>
            <td>
              <input 
                type="number" class="cart-quantity"data-index="${index}"value="${item.quantity}" min="1">
            </td>
            <td>$${lineTotal.toFixed(2)}</td>
            <td>
              <a href="#" class="remove-item" data-index="${index}">Remove</a>
            </td>
          </tr>
        `);
      });
      updateCartSummary();
    }
  
    
    renderCart();
  
    cartBody.addEventListener('click', e => {
      if (e.target.classList.contains('remove-item')) {
        e.preventDefault();
        const idx = +e.target.dataset.index;
        cart.splice(idx, 1);               
        localStorage.setItem('cart', JSON.stringify(cart)); 
        renderCart();                      
      }
    });
    function updateCartSummary() {
       
        const subtotal = cart.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
      
        
        const tax = subtotal * 0.05; 
      
       
        const total = subtotal + tax;
      
       
        document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('cart-tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
      }
   
    cartBody.addEventListener('change', e => {
      if (e.target.classList.contains('cart-quantity')) { 
        const idx = +e.target.dataset.index;
        const newQty = parseInt(e.target.value, 10); 
        if (newQty >= 1) {
          cart[idx].quantity = newQty;
          localStorage.setItem('cart', JSON.stringify(cart));
          renderCart();
        } else {
          e.target.value = cart[idx].quantity = 1;
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      }
    });
  });

  var Buy = document.getElementsByClassName("checkout-btn" )[0] ; 
  Buy.addEventListener("click" , function(){
    localStorage.removeItem('cart');
  })

  document.addEventListener("DOMContentLoaded", () => {
    const userIcon = document.getElementById("user-icon");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
    if (currentUser && userIcon) {
      userIcon.textContent = currentUser.name;
    }
  });
  