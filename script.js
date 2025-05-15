const products = [
  // Electronics
  { id: 1, name: "Samsung Galaxy S23 Ultra", category: "Electronics", price: 104999, image: "images/elec1.avif" },
  { id: 2, name: "Apple MacBook Air M2", category: "Electronics", price: 114900, image: "images/elec2.jpg" },
  { id: 3, name: "Dell UltraSharp 27 4K Monitor", category: "Electronics", price: 64999, image: "images/elec3.webp" },
  { id: 4, name: "Apple iPad Air (5th Gen)", category: "Electronics", price: 59900, image: "images/elec4.jpg" },

    // Accessories (Luxury)
  { id: 5, name: "Louis Vuitton Men's Wallet", category: "Accessories", price: 42000, image: "images/access1.jpg" },
  { id: 6, name: "Ray-Ban Aviator Classic Sunglasses", category: "Accessories", price: 11390, image: "images/access2.avif" },
  { id: 7, name: "Gucci Leather Belt with Double G Buckle", category: "Accessories", price: 55000, image: "images/access3.webp" },
  { id: 8, name: "Montblanc Meisterstück Gold-Coated Fountain Pen", category: "Accessories", price: 69000, image: "images/access4.webp" },

  // Clothing
  { id: 9, name: "Levi's 511 Slim Fit Jeans", category: "Clothing", price: 3299, image: "images/cloth1.webp" },
  { id: 10, name: "Puma Men's Jacket", category: "Clothing", price: 4599, image: "images/cloth2.jpg" },
  { id: 11, name: "H&M Cotton T-Shirt", category: "Clothing", price: 799, image: "images/cloth3.webp" },

  // Books
  { id: 12, name: "Atomic Habits by James Clear", category: "Books", price: 449, image: "images/book1.webp" },
  { id: 13, name: "Deep Work by Cal Newport", category: "Books", price: 399, image: "images/book2.webp" },
  { id: 14, name: "Rich Dad Poor Dad by R. Kiyosaki", category: "Books", price: 299, image: "images/book3.jpg" },

  // Home
  { id: 15, name: "Philips Hue Smart Lamp", category: "Home Decor", price: 6999, image: "images/home1.png" },
  { id: 16, name: "Wakefit Sofa Cushion Set", category: "Home Decor", price: 1499, image: "images/home2.jpg" },
  { id: 17, name: "Ajanta Wall Clock", category: "Home Decor", price: 899, image: "images/home3.jpg" },
  { id: 18, name: "Bombay Dyeing Bedsheet Set", category: "Home Decor", price: 1999, image: "images/home4.jpg" }
];



let cart = JSON.parse(localStorage.getItem("cart")) || [];
let activeCategory = "All";

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");
const searchInput = document.getElementById("search");

function renderProducts(filter = "", category = "All") {
  productList.innerHTML = "";
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase()) &&
    (category === "All" || p.category === category)
  );
  filtered.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      ${item.name} x${item.qty} - ₹${item.price * item.qty}
      <button onclick="removeItem(${index})">x</button>
    `;
    cartItems.appendChild(div);
  });
  totalPrice.textContent = total;
  cartCount.textContent = cart.reduce((a, b) => a + b.qty, 0);
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function toggleCart() {
  const cart = document.getElementById("cart");
  const overlay = document.getElementById("cart-overlay");
  cart.classList.toggle("open");
  overlay.classList.toggle("show");
}


function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Thank you for your purchase!");
    cart = [];
    saveCart();
    toggleCart();
  }
}

function filterCategory(category) {
  activeCategory = category;
  renderProducts(searchInput.value, category);
}

searchInput.addEventListener("input", () => {
  renderProducts(searchInput.value, activeCategory);
});

renderProducts();
updateCart();
