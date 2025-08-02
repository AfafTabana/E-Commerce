document.addEventListener("DOMContentLoaded", function () {
    const images = [ 
        '../images/slider/smartphones.jpg',
        '../images/slider/laptops.jpg',
        '../images/slider/fragrances.jpg',
        '../images/slider/skincare.jpg',
        '../images/slider/groceries.jpg',
        '../images/slider/home-decoration.jpg'
    ];

    const img = document.getElementsByClassName("slider-images")[0];

    const radios = [
        document.getElementById("radio1"),
        document.getElementById("radio2"),
        document.getElementById("radio3"),
        document.getElementById("radio4"),
        document.getElementById("radio5"),
        document.getElementById("radio6")
    ];

    let index = 0;

    function showImage(i) {
        radios[i].checked = true;
        img.src = images[i];
    }

   
    radios.forEach((radio, i) => {
        radio.addEventListener('change', function () {
            if (radio.checked) {
                index = i; 
                showImage(i);
            }
        });
    });


    setInterval(() => {
        index = (index + 1) % images.length;
        showImage(index);
    }, 3000); 
});

const categoryFilter = document.getElementById("categoryFilter");
const placeholder = document.querySelector("#products");


let allProducts = [];


function displayProducts(products) {
  let out = "";
  for (let p of products) {
    out += `
     <a href="singleproduct.html?id=${p.id}" class="product-link">
      <div class="product">
        <img src="${p.images[0]}" alt="${p.title}">
        <div class="product-content">
          <h2>${p.title}</h2>
          <p class="price">$${p.price}</p>
          <p class="category">${p.category}</p>
          <p class="rating"> Rating:${p.rating}</p>
          <a href="Cart.html?id=${p.id}" class="product-link price">🛒</a>
        </div>
        </div>
          
     
      
    `;
  }
  placeholder.innerHTML = out;
}


fetch("../jsonformatter.json")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    displayProducts(allProducts);
  })
  .catch(err => console.error("Error loading products:", err));


categoryFilter.addEventListener("change", (e) => {
  const sel = e.target.value;
  if (sel === "all") {
    displayProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === sel);
    displayProducts(filtered);
  }
});

  var price =document.getElementsByClassName("price")[0] ;
  var filter = document.getElementsByClassName("filter-btn")[0] ;
  var rate = document.getElementsByClassName("Rating")[0];
  
  
  filter.addEventListener("click", function (e) {
    e.preventDefault(); 
  
    const selectedPrice = price.value;
    const selectedRate = rate.value;
  

    let filtered = [...allProducts];
  
    if (selectedPrice === "all") {
        displayProducts(allProducts);
      }
    else if (selectedPrice === "Greater Than 1000") {
      filtered = filtered.filter(p => p.price > 1000);
    } else if (selectedPrice === "800-1000") {
      filtered = filtered.filter(p => p.price > 800 && p.price <= 1000);
    } else if (selectedPrice === "600-800") {
      filtered = filtered.filter(p => p.price > 600 && p.price <= 800);
    } else if (selectedPrice === "400-600") {
      filtered = filtered.filter(p => p.price > 400 && p.price <= 600);
    } else if (selectedPrice === "200-400") {
      filtered = filtered.filter(p => p.price > 200 && p.price <= 400);
    } else if (selectedPrice === "Less Than 200") {
      filtered = filtered.filter(p => p.price <= 200);
    }
  
    if (selectedRate === "all") {
        displayProducts(allProducts);
      }
    else if (selectedRate === "5") {
      filtered = filtered.filter(p => p.rating == 5);
    } else if (selectedRate === "4-5") {
      filtered = filtered.filter(p => p.rating > 4 && p.rating < 5);
    } else if (selectedRate === "3-4") {
      filtered = filtered.filter(p => p.rating > 3 && p.rating <= 4);
    } else if (selectedRate === "2-3") {
      filtered = filtered.filter(p => p.rating > 2 && p.rating <= 3);
    } else if (selectedRate === "1-2") {
      filtered = filtered.filter(p => p.rating > 1 && p.rating <= 2);
    } else if (selectedRate === "Less Than 1") {
      filtered = filtered.filter(p => p.rating <= 1);
    }
  
    displayProducts(filtered);
  });

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const userIcon = document.getElementById("user-icon");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
    if (currentUser && userIcon) {
      userIcon.textContent = currentUser.name;
    }
  });
